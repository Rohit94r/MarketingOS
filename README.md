# MarketingOS

MarketingOS is an AI-powered marketing workspace for planning campaigns, drafting content, reviewing analytics, scheduling work, and turning insights into practical next actions. The product is designed as a focused operating system for small marketing teams that need one place to move from idea to execution.

## About The Project

Marketing work often gets split across documents, dashboards, calendars, and disconnected AI tools. MarketingOS brings those jobs into a single workspace so a team can understand what is happening, decide what matters, and keep campaigns moving.

The app includes a public landing page and an authenticated dashboard experience. The dashboard organizes the core marketing loop: review performance, create content, schedule activity, and act on recommended next steps.

## Core Capabilities

- Campaign overview: see high-level marketing status, recent movement, and priority work.
- Content workflow: draft and organize AI-assisted marketing copy.
- Scheduler workflow: plan campaign activity across upcoming dates.
- Analytics workflow: review channel performance using chart-driven views.
- Actions workflow: convert marketing signals into clear recommended tasks.
- Supabase session handling: support browser and server Supabase clients with middleware refresh.
- FastAPI backend: expose API-backed data for the frontend dashboard experience.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- Supabase
- FastAPI

## Project Areas

- Landing page: product overview and conversion entry point.
- Dashboard: operational marketing command center.
- Content: AI-assisted marketing copy workspace.
- Scheduler: planned campaign activity.
- Analytics: visibility and channel performance charts.
- Actions: recommended next steps for the team.

## Folder Structure

- `app`: Next.js routing, layouts, metadata, middleware entry points, and global CSS.
- `components/dashboard`: Dashboard screen components used by `/dashboard` routes.
- `components/landing`: Landing page screen components used by `/`.
- `components/layout`: Shared page shells and navigation layouts.
- `components/ui`: Reusable primitive UI such as buttons and cards.
- `components/animations`: Shared motion helpers.
- `components/charts`: Shared chart components.
- `lib`: Shared utilities and API helpers.
- `utils/supabase`: Supabase client, server, and middleware helpers.
- `backend`: FastAPI service, database setup scripts, and backend dependencies.
- `docs`: Product, UX, architecture, quality, and release planning notes.

Route files in `app` should stay thin. If a page needs real UI, move that UI into the matching feature folder under `components` and import it from the route.

## Local Development

Install frontend dependencies and start the Next.js app:

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

## Environment Variables

Frontend variables live in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

Backend variables live in `backend/.env`:

```bash
DATABASE_URL=...
CORS_ORIGINS=http://localhost:3000
```

## Supabase

Supabase is configured for the Next.js frontend with:

- `utils/supabase/client.ts`: Browser/client component Supabase client.
- `utils/supabase/server.ts`: Server component Supabase client.
- `utils/supabase/middleware.ts`: Session refresh helper.
- `middleware.ts`: Runs the Supabase session refresh helper for app routes.

The Supabase public URL and publishable key are for frontend/browser access. They cannot create database tables.

## Supabase Database Setup

To create the production tables in Supabase, use one of these options:

1. Open the Supabase SQL Editor and run:

```txt
supabase/migrations/20260425000000_ai_marketingos_schema.sql
```

2. Or set the backend `DATABASE_URL` in `backend/.env` to your Supabase Postgres connection string and run:

```bash
cd backend
source .venv/bin/activate
python scripts/create_tables.py
```

Use this Supabase Dashboard path to find the database connection string:

```txt
Project Settings -> Database -> Connection string
```

For FastAPI deployment, set:

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.nsjearnxclmagixaovto.supabase.co:5432/postgres
CORS_ORIGINS=https://your-frontend-domain.com
```

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
```

## Quality Checks

Run these before opening a pull request or deploying:

```bash
npm run lint
npm run typecheck
npm run build
```

## Product Direction

MarketingOS is built around a practical marketing rhythm:

- Understand performance from the analytics view.
- Decide priorities from dashboard and action recommendations.
- Create campaign copy in the content workspace.
- Schedule work so ideas become visible marketing activity.
- Keep the interface focused enough for repeated daily use.
