from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.action import ActionTask

router = APIRouter(prefix="/actions", tags=["Actions"])


@router.get("")
def get_actions(db: Session = Depends(get_db)):
    tasks = db.query(ActionTask).order_by(ActionTask.id).all()
    return [
        {
            "id": task.id,
            "title": task.title,
            "status": task.status,
            "lift": task.lift,
            "action_button_label": task.action_button_label,
        }
        for task in tasks
    ]
