# NEXUS | Ali Mobile Zone

React conversion of the NEXUS mobile commerce landing page. Built with Vite, Tailwind CSS, COBE, and Iconify.

## Local development

```bash
cd ali-mobile-zone
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Output is in `dist/`. Any static host can serve that folder.

## Deploy

### Vercel

1. Push this folder to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Root directory: `ali-mobile-zone` (if the repo is the parent `hackathon` folder).
4. Build command: `npm run build`
5. Output: `dist`

Or from this directory:

```bash
npx vercel
```

### Netlify

1. Import the repo in [Netlify](https://app.netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`

Or:

```bash
npx netlify deploy --prod --dir=dist
```

`vercel.json` and `netlify.toml` are included so client-side routes keep working.
