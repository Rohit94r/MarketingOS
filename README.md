# MarketingOS

AI-powered marketing workspace for planning campaigns, generating content, reviewing analytics, scheduling work, and turning insights into practical actions.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
```

## Local Development

Install dependencies and start the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Areas

- Landing page: product overview and conversion entry point
- Dashboard: operational marketing command center
- Content: AI-assisted marketing copy workspace
- Scheduler: planned campaign activity
- Analytics: visibility and channel performance charts
- Actions: recommended next steps for the team

## Folder Structure

- `app`: Next.js routing only. Keep route files, layouts, metadata, redirects, and global CSS here.
- `components/dashboard`: Dashboard screen components used by `/dashboard` routes.
- `components/landing`: Landing page screen components used by `/`.
- `components/layout`: Shared page shells and navigation layouts.
- `components/ui`: Reusable primitive UI such as buttons and cards.
- `components/animations`: Shared motion helpers.
- `components/charts`: Shared chart components.
- `lib`: Shared utilities and data helpers.

Route files in `app` should stay thin. If a page needs real UI, move that UI into the matching feature folder under `components` and import it from the route.
