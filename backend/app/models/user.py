from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: Optional[int] = None
    email: EmailStr
    name: Optional[str] = None
    created_at: Optional[datetime] = None
    last_login: Optional[datetime] = None

class UserLogin(BaseModel):
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    email: str
    name: Optional[str] = None
    created_at: datetime
    last_login: datetime

class UserProgress(BaseModel):
    user_id: int
    vocab_known: list = []
    vocab_unknown: list = []
    idioms_known: list = []
    idioms_unknown: list = []
    updated_at: Optional[datetime] = None
