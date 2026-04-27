from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.action import ActionTask
from app.models.post import Post
from app.routes.analytics import channel_data, get_analytics_score, growth_data

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("")
def get_dashboard(db: Session = Depends(get_db)):
    total_posts = db.query(Post).count()
    scheduled_posts = db.query(Post).filter(Post.is_scheduled.is_(True)).count()
    pending_actions = db.query(ActionTask).filter(ActionTask.status == "pending").count()
    score = get_analytics_score(db)

    return {
        "total_posts": total_posts,
        "scheduled_posts": scheduled_posts,
        "growth": 18,
        "campaign_lift": 34,
        "signals_tracked": 412,
        "pending_actions": pending_actions,
        "average_score": score["average_score"],
        "growth_data": growth_data,
        "channel_data": channel_data,
    }
