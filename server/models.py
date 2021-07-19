from sqlalchemy import Column, Integer, String, Boolean, DateTime

from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, index=True)
    date = Column(DateTime, index=True)
    is_completed = Column(Boolean, index=True)