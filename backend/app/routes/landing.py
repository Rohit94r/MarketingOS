from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.routes.actions import get_actions
from app.routes.analytics import get_analytics
from app.routes.dashboard import get_dashboard

router = APIRouter(prefix="/landing", tags=["Landing"])


@router.get("")
def get_landing(db: Session = Depends(get_db)):
    dashboard = get_dashboard(db)
    analytics = get_analytics(db)
    actions = get_actions(db)

    return {
        "hero": {
            "eyebrow": "Calm AI operations for modern marketing teams",
            "title": "AI That Runs Your Marketing",
            "description": "Plan campaigns, generate content, track competitors, and move from insight to action in one clear workspace.",
        },
        "logos": ["NOVA", "KITE", "ORBIT", "ATLAS", "MONO", "FLUX", "PRISM", "VANTA"],
        "features": [
            {
                "title": "AI Visibility Score",
                "text": "Know where your brand is gaining or losing attention across search, social, and competitor conversations.",
                "stat": dashboard["average_score"],
                "label": "visibility score",
            },
            {
                "title": "Content Generator",
                "text": "Create posts, launch emails, briefs, and response angles from one clear marketing context.",
                "stat": dashboard["total_posts"],
                "label": "assets drafted",
            },
            {
                "title": "Competitor Tracking",
                "text": "Track market moves without opening twenty tabs. Pricing, launches, content shifts, and ad patterns stay visible.",
                "stat": dashboard["signals_tracked"],
                "label": "signals tracked",
            },
            {
                "title": "Auto Actions",
                "text": "Turn every insight into a practical task your team can fix, generate, schedule, or approve.",
                "stat": dashboard["pending_actions"],
                "label": "actions ready",
            },
        ],
        "dashboard": dashboard,
        "analytics": analytics,
        "actions": actions,
    }
