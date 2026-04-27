from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.post import Post

router = APIRouter(prefix="/scheduler", tags=["Scheduler"])


@router.get("")
def get_scheduler(db: Session = Depends(get_db)):
    scheduled_posts = (
        db.query(Post)
        .filter(Post.is_scheduled.is_(True))
        .order_by(Post.scheduled_day)
        .all()
    )

    return {
        "month": "April 2026",
        "days": list(range(1, 36)),
        "scheduled_days": [post.scheduled_day for post in scheduled_posts if post.scheduled_day],
        "scheduled_count": len(scheduled_posts),
        "posts": [
            {
                "id": post.id,
                "time": post.scheduled_time,
                "title": post.title,
                "platform": post.platform,
            }
            for post in scheduled_posts
        ],
    }
