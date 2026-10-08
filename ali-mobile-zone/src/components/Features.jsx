import { Icon } from '@iconify/react'

const features = [
  {
    icon: 'solar:shield-check-linear',
    tone: 'bg-blue-500/10 text-blue-400',
    title: 'AI Grading',
    body: 'Computer vision analysis ensures every scratch is documented. What you see is exactly what you get.',
  },
  {
    icon: 'solar:wallet-money-linear',
    tone: 'bg-purple-500/10 text-purple-400',
    title: 'Instant Liquidity',
    body: 'Sell your device directly to our network. Get paid instantly upon verification at our hubs.',
  },
  {
    icon: 'solar:box-linear',
    tone: 'bg-emerald-500/10 text-emerald-400',
    title: 'Smart Logistics',
    body: 'Pre-paid shipping labels and custom packaging sent to your door. Fully insured transit.',
  },
]

export default function Features() {
  return (
    <section id="business" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-medium tracking-tight text-white mb-4">
            Infrastructure for devices
          </h2>
          <p className="text-white/60 text-sm max-w-xl">
            We handle the complexities of grading, logistics, and payments so you
            can focus on trading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-panel p-8 rounded-2xl group hover:bg-white/5 transition-colors duration-300"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.tone}`}
              >
                <Icon icon={feature.icon} width="24" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
