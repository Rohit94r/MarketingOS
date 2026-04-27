from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class ActionTask(Base):
    __tablename__ = "action_tasks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    lift: Mapped[str] = mapped_column(String, nullable=False)
    action_button_label: Mapped[str] = mapped_column(String, nullable=False)
