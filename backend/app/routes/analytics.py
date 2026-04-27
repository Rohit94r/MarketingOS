from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.platform_score import PlatformScore
from app.services.analytics_service import calculate_average_score

router = APIRouter(prefix="/analytics", tags=["Analytics"])

growth_data = [
    {"month": "Jan", "visibility": 64, "reach": 38, "conversion": 22},
    {"month": "Feb", "visibility": 68, "reach": 44, "conversion": 26},
    {"month": "Mar", "visibility": 71, "reach": 49, "conversion": 31},
    {"month": "Apr", "visibility": 78, "reach": 58, "conversion": 36},
    {"month": "May", "visibility": 82, "reach": 62, "conversion": 43},
    {"month": "Jun", "visibility": 87, "reach": 69, "conversion": 47},
    {"month": "Jul", "visibility": 91, "reach": 76, "conversion": 54},
]

channel_data = [
    {"name": "Search", "value": 78},
    {"name": "Social", "value": 64},
    {"name": "Email", "value": 57},
    {"name": "Video", "value": 71},
    {"name": "PR", "value": 46},
]

summary_metrics = [
    {"label": "Pipeline influence", "value": 42, "suffix": "%"},
    {"label": "Organic mentions", "value": 286, "suffix": ""},
    {"label": "Conversion lift", "value": 19, "suffix": "%"},
]


@router.get("/score")
def get_analytics_score(db: Session = Depends(get_db)):
    platforms = db.query(PlatformScore).order_by(PlatformScore.id).all()
    platform_scores = [
        {"platform": platform.platform, "score": platform.score}
        for platform in platforms
    ]
    average_score = calculate_average_score(platform_scores)

    return {
        "average_score": average_score,
        "platforms": platform_scores,
    }


@router.get("")
def get_analytics(db: Session = Depends(get_db)):
    score = get_analytics_score(db)
    return {
        **score,
        "growth_data": growth_data,
        "channel_data": channel_data,
        "summary_metrics": summary_metrics,
    }
