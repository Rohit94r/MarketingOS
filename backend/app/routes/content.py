from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.post import Post
from app.services.ai_service import generate_content_ideas

router = APIRouter(prefix="/content", tags=["Content"])


class ContentGenerateRequest(BaseModel):
    business: str


@router.post("/generate")
def generate_content(request: ContentGenerateRequest, db: Session = Depends(get_db)):
    if not request.business.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Business is required",
        )

    result = generate_content_ideas(request.business)
    first_idea = result["ideas"][0]
    post = Post(
        title=f"{request.business.strip().title()} campaign idea",
        content=first_idea,
        is_scheduled=False,
        platform="Draft",
    )
    db.add(post)
    db.commit()
    db.refresh(post)

    return {
        **result,
        "saved_post": {
            "id": post.id,
            "title": post.title,
            "content": post.content,
        },
    }


@router.get("/posts")
def get_content_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).order_by(Post.id.desc()).all()
    return [
        {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "is_scheduled": post.is_scheduled,
            "platform": post.platform,
        }
        for post in posts
    ]
