# AI MarketingOS Backend

FastAPI backend for the AI MarketingOS SaaS product.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/docs` to test the API in Swagger UI.

## Deployment Environment

Set these environment variables on your backend host:

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.nsjearnxclmagixaovto.supabase.co:5432/postgres
CORS_ORIGINS=https://your-frontend-domain.com,http://localhost:3000
```

Create the Supabase tables with either the SQL migration:

```txt
../supabase/migrations/20260425000000_ai_marketingos_schema.sql
```

or the Python setup script:

```bash
python scripts/create_tables.py
```

The publishable Supabase key cannot create tables. Use the Supabase Postgres connection string from `Project Settings -> Database`.

## Folder Structure

- `app/main.py`: Creates the FastAPI app and includes all routes.
- `app/routes`: API endpoints grouped by product area.
- `app/models`: SQLAlchemy database models.
- `app/schemas`: Pydantic request and response validation.
- `app/services`: Reusable business logic.
- `app/db`: Database connection and session setup.
- `app/core`: App configuration.

## Endpoints

- `GET /`: Backend health message.
- `POST /auth/signup`: Create a user with email and password.
- `POST /auth/login`: Basic login check with email and password.
- `GET /dashboard`: Dashboard metrics.
- `GET /landing`: Landing page, analytics, dashboard, and action data.
- `GET /analytics`: Full analytics data for charts and metric cards.
- `GET /analytics/score`: Average score and platform scores.
- `POST /content/generate`: Mock AI content ideas, captions, and hashtags.
- `GET /content/posts`: Saved content drafts.
- `GET /actions`: Recommended task list.
- `GET /scheduler`: Scheduled content calendar.
