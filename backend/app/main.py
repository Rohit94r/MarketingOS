from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import Base, SessionLocal, engine
from app.db.seed import seed_database
from app.routes import actions, analytics, auth, content, dashboard, landing, scheduler

Base.metadata.create_all(bind=engine)
with SessionLocal() as db:
    seed_database(db)

app = FastAPI(
    title="AI MarketingOS API",
    description="Backend API for AI MarketingOS SaaS product.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(analytics.router)
app.include_router(content.router)
app.include_router(actions.router)
app.include_router(scheduler.router)
app.include_router(landing.router)


@app.get("/", tags=["Root"])
def root():
    return {"message": "Backend running"}
