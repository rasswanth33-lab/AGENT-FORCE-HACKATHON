import os
import re
from typing import TypedDict
from dotenv import load_dotenv
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, ToolMessage
from langchain_core.tools import tool
from ddgs import DDGS
import warnings
warnings.filterwarnings("ignore")

# --- 1. System Setup ---
load_dotenv()
if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError("GOOGLE_API_KEY is not set. Please add it to your .env file.")

# --- 2. Tool Definition ---
@tool
def search_documentation(query: str) -> str:
    """Searches the internet for API documentation, Python library usage, and technical facts."""
    print(f"   [Tool Execution] 🔎 Searching web for: '{query}'")
    try:
        results = DDGS().text(query, backend="lite", max_results=2)
        if not results:
            return "No results found."
        return "\n".join(r.get("body", "") for r in results)
    except Exception as e:
        return f"Search error: {e}"

# --- 3. State & LLM Configuration ---
class AgentState(TypedDict):
    requirement: str
    plan: str
    code: str
    errors: str
    revision_count: int
    sprint_report: str  # NEW: For the Scrum Master's documentation

# Using the updated gemini-3.8-flash model
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash", temperature=0.1, max_retries=1)
llm_with_tools = llm.bind_tools([search_documentation])

def clean_code_block(raw_text: str) -> str:
    # 1. Try to extract strictly from within markdown code blocks
    pattern = re.compile(r"```(?:python)?\s*(.*?)\s*```", re.DOTALL | re.IGNORECASE)
    match = pattern.search(raw_text)
    if match:
        return match.group(1).strip()
    
    # 2. Fallback: If the AI forgot the backticks, strip out conversational English manually
    lines = raw_text.strip().split('\n')
    clean_lines = []
    for line in lines:
        # Ignore common AI conversational filler
        if line.lower().startswith(("here is", "sure", "understood", "this code", "```")):
            continue
        clean_lines.append(line)
        
    return "\n".join(clean_lines).strip()


# ==========================================
# 4. AGENT NODES
# ==========================================

# ------------------------------------------
# AGENT 1: THE PLANNING AGENT
# ------------------------------------------
def planner_node(state: AgentState):
    print("\n" + "="*60)
    print("📋 [Planning Agent] Formulating Architecture & Tech Spec...")
    print("="*60)
    
    prompt = f"""You are a Principal Software Architect.
Transform this requirement into an actionable engineering blueprint:
Requirement: {state['requirement']}

Provide:
1. System Architecture & Components
2. Data Flow & Schemas
3. Implementation Plan for the Coding Agent

Keep it concise and actionable."""

    response = llm.invoke([HumanMessage(content=prompt)])
    
    # Extract the text
    plan = response.content
    if isinstance(plan, list) and len(plan) > 0:
        if isinstance(plan[0], dict) and 'text' in plan[0]:
            plan = plan[0]['text']
    plan = str(plan)
    
    print(plan)
    return {"plan": plan}


# ------------------------------------------
# AGENT 2: THE CODING AGENT
# ------------------------------------------
# ------------------------------------------
# AGENT 2: THE CODING AGENT
# ------------------------------------------
def coder_node(state: AgentState):
    rev = state.get("revision_count", 0)
    print("\n" + "="*60)
    print(f"💻 [Coding Agent] Generating Implementation (Iteration {rev + 1})...")
    print("="*60)
    
    messages = [
        SystemMessage(content="You are a Senior Python Engineer. Write complete, runnable standalone code. You can use the search_documentation tool if you need to look up API endpoints or library syntax before writing the code."),
        HumanMessage(content=f"Requirement: {state['requirement']}\nArchitecture:\n{state.get('plan', '')}")
    ]
    
    if state.get("errors") and state.get("errors") != "None":
        messages.append(HumanMessage(content=f"CRITICAL FIX REQUIRED. QA flagged these errors:\n{state['errors']}"))

    response = llm_with_tools.invoke(messages)
    if response.tool_calls:
        messages.append(response)
        for t in response.tool_calls:
            tool_res = search_documentation.invoke(t["args"])
            messages.append(ToolMessage(content=str(tool_res), tool_call_id=t["id"]))
        print("   [Agent Decision] 🧠 Synthesizing search results into code...")
        
        # CRITICAL FIX: Force the LLM to output the code instead of just talking about the search results
        messages.append(HumanMessage(content="You have the search results. Now, you MUST output the complete, valid Python code fulfilling the requirements. Output ONLY the code inside ```python blocks. Do not add any conversational filler."))
        
        response = llm_with_tools.invoke(messages)

    # Extract the actual string text from the LangChain response object
    raw_code = response.content
    if isinstance(raw_code, list) and len(raw_code) > 0:
        if isinstance(raw_code[0], dict) and 'text' in raw_code[0]:
            raw_code = raw_code[0]['text']
    raw_code = str(raw_code)
    
    # DEBUG: Print exactly what the AI returned before we clean it
    print(f"   [Debug Raw LLM Output]:\n{raw_code[:300]}...\n")
    
    cleaned_code = clean_code_block(raw_code)
    
    print(f"   -> Generated {len(cleaned_code.splitlines())} lines of code.")
    return {"code": cleaned_code, "revision_count": rev + 1}
# ------------------------------------------
# AGENT 3: THE TESTING AGENT
# ------------------------------------------
# ------------------------------------------
# AGENT 3: THE TESTING AGENT
# ------------------------------------------
def tester_node(state: AgentState):
    print("\n" + "="*60)
    print("🧪 [Quality & Testing Agent] Running Automated Audit...")
    print("="*60)
    
    code = state.get("code", "")
    
    # DEBUG: Print the first few lines of what is actually being tested
    preview = "\n".join(code.splitlines()[:10])
    print(f"   [Debug Preview] Auditing Code:\n{preview}...\n")
    
    try:
        compile(code, "<string>", "exec")
        syntax_check = "Syntax Check: PASSED (0 compile errors)."
        print(f"   -> {syntax_check}")
    except SyntaxError as e:
        syntax_check = f"Syntax error on line {e.lineno}: {e.msg}"
        print(f"   ❌ {syntax_check}")
        return {"errors": syntax_check}

    prompt = f"""You are a Lead QA Engineer. Review this code against the requirement.
Requirement: {state['requirement']}

--- START CODE TO EVALUATE ---
{code}
--- END CODE TO EVALUATE ---

If it perfectly fulfills the requirement, handles edge cases, and is production-ready, reply EXACTLY with: PASSED
Otherwise, list the specific logical defects."""

    response = llm.invoke([HumanMessage(content=prompt)])
    
    # Extract the text safely
    feedback = response.content
    if isinstance(feedback, list) and len(feedback) > 0:
        if isinstance(feedback[0], dict) and 'text' in feedback[0]:
            feedback = feedback[0]['text']
    feedback = str(feedback).strip()
    
    if "PASSED" in feedback.upper()[:15]:
        print("   ✅ QA Status: PASSED. Code meets all specifications.")
        return {"errors": "None"}
    else:
        print("   ❌ QA Status: DEFECTS FOUND. Routing back to Coder.")
        print(f"   Feedback: {feedback}")
        return {"errors": feedback}


# ------------------------------------------
# AGENT 4: THE SCRUM MASTER AGENT (NEW)
# Role: Oversees Sprint progress and drafts final docs
# ------------------------------------------
def scrum_master_node(state: AgentState):
    print("\n" + "="*60)
    print("👔 [Scrum Master Agent] Reviewing Sprint Status...")
    print("="*60)

    # Blocker Management
    if state.get("errors") != "None":
        print(f"   ⚠️ Scrum Master notes blocker: QA rejected code (Attempt {state.get('revision_count')}/3).")
        if state.get("revision_count", 0) >= 3:
            print("   🛑 Scrum Master: Max timeboxed iterations reached. Forcing release with known issues.")
        else:
            print("   🔄 Scrum Master: Re-assigning task to Coding Agent to fix defects.")
        return {"sprint_report": "Sprint incomplete due to QA blockers."}

    # Success Management: Generate Documentation
    print("   ✅ Scrum Master: Sprint successful! Generating Sprint Report and README...")
    
    prompt = f"""You are an Agile Scrum Master. The engineering team just completed this requirement:
    {state['requirement']}
    
    Write a brief, professional README.md for the project. 
    Include:
    1. A short description of the tool.
    2. How to run it.
    3. A "Sprint Summary" section celebrating the team's autonomous work (mentioning it took {state.get('revision_count')} iterations to pass QA)."""

    response = llm.invoke([HumanMessage(content=prompt)])
    report = str(response.content).strip()
    print("   📜 README and Sprint Report Generated.")
    
    return {"sprint_report": report}


# ------------------------------------------
# AGENT 5: THE DEPLOYMENT AGENT
# ------------------------------------------
def deployment_node(state: AgentState):
    print("\n" + "="*60)
    print("🚀 [Deployment Agent] Packaging & Finalizing Artifacts...")
    print("="*60)
    
    # Deploy Code
    output_filename = "deployed_app.py"
    with open(output_filename, "w", encoding="utf-8") as f:
        f.write(state["code"])
    print(f"   ✅ Application deployed to: ./{output_filename}")
    
    # Deploy Documentation
    if state.get("sprint_report") and "Sprint incomplete" not in state.get("sprint_report"):
        with open("README.md", "w", encoding="utf-8") as f:
            f.write(state["sprint_report"])
        print("   ✅ Sprint Documentation deployed to: ./README.md")
        
    print(f"   🔄 Total Team Iterations: {state.get('revision_count', 1)}")
    return state


# --- 5. Routing & Compilation ---
def route_from_scrum_master(state: AgentState):
    # Scrum Master decides where the state goes next
    if state.get("errors") != "None" and state.get("revision_count", 0) < 3:
        return "coder"
    return "deployment"

workflow = StateGraph(AgentState)
workflow.add_node("planner", planner_node)
workflow.add_node("coder", coder_node)
workflow.add_node("tester", tester_node)
workflow.add_node("scrum_master", scrum_master_node)
workflow.add_node("deployment", deployment_node)

# Execution Flow
workflow.set_entry_point("planner")
workflow.add_edge("planner", "coder")
workflow.add_edge("coder", "tester")
workflow.add_edge("tester", "scrum_master") # Tester passes logs to Scrum Master
workflow.add_conditional_edges("scrum_master", route_from_scrum_master, {"coder": "coder", "deployment": "deployment"})
workflow.add_edge("deployment", END)

swarm_app = workflow.compile()

# --- Execution ---
# --- Execution ---
if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 AI ENGINEERING SWARM TERMINAL")
    print("="*60)
    
    print("Welcome! What would you like the AI team to build today?")
    print("(Tip: Be specific about the language, APIs, and features you want)")
    
    user_requirement = input("\n👉 Enter your software requirement:\n> ")
    
    if not user_requirement.strip():
        print("No requirement provided. Shutting down the swarm.")
    else:
        print("\n🚀 INITIALIZING SPRINT...")
        swarm_app.invoke({
            "requirement": user_requirement, 
            "plan": "", 
            "code": "", 
            "errors": "", 
            "revision_count": 0, 
            "sprint_report": ""
        })