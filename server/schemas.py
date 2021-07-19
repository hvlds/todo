from typing import List, Optional
from datetime import datetime

from pydantic import BaseModel

class TaskBase(BaseModel):
    description: str
    date: datetime
    is_completed: bool


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True
