# V2 Deploy Workflow

## Live URL
https://retirement-income-planner.netlify.app

## Netlify Admin
https://app.netlify.com/projects/retirement-income-planner

## How it works
- The GitHub repo `zartyblartfast/RetirementIncomePlannerV2` is linked to Netlify
- Every push to `main` triggers an automatic build and deploy
- Build: `npm run build` → publishes `dist/` folder
- Deploys typically complete in ~30 seconds

## Day-to-day workflow

```bash
# 1. Make your changes

# 2. Run tests
npx vitest run

# 3. Commit and push — Netlify deploys automatically
git add -A
git commit -m "description of changes"
git push
```

## Key details
- **PWA**: App is installable from the browser (works offline after first load)
- **Data**: All user data stays in the browser's localStorage — nothing is stored on Netlify
- **SPA routing**: Handled by `netlify.toml` (redirects all paths to index.html)
- **Monitor builds**: Check deploy logs at the Netlify admin link above
