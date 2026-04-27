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

## Supabase

Supabase is configured for the Next.js frontend with:

- `utils/supabase/client.ts`: Browser/client component Supabase client.
- `utils/supabase/server.ts`: Server component Supabase client.
- `utils/supabase/middleware.ts`: Session refresh helper.
- `middleware.ts`: Runs the Supabase session refresh helper for app routes.

Environment variables live in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

## Local Development

Install dependencies and start the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Start the FastAPI backend in another terminal:

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

The frontend reads API data from:

```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

For deployment, set `NEXT_PUBLIC_API_BASE_URL` to your deployed FastAPI URL and set the backend `CORS_ORIGINS` value to your deployed frontend URL.

## Supabase Database Setup

The Supabase public URL and publishable key are for frontend/browser access. They cannot create database tables.

To create the production tables in Supabase, use one of these:

1. Open Supabase SQL Editor and run:

```txt
supabase/migrations/20260425000000_ai_marketingos_schema.sql
```

2. Or set the backend `DATABASE_URL` in `backend/.env` to your Supabase Postgres connection string and run:

```bash
cd backend
source .venv/bin/activate
python scripts/create_tables.py
```

Use the Supabase Dashboard path:

```txt
Project Settings -> Database -> Connection string
```

For FastAPI deployment, set:

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.nsjearnxclmagixaovto.supabase.co:5432/postgres
CORS_ORIGINS=https://your-frontend-domain.com
```

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
