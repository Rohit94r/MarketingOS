from pydantic import BaseModel


class PostCreate(BaseModel):
    title: str
    content: str
    is_scheduled: bool = False


class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    is_scheduled: bool

    model_config = {
        "from_attributes": True
    }
