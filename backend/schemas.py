from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

class ApplicationCreate(BaseModel):
    company: str
    role: str
    status: str = "applied"
    notes: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: int
    company: str
    role: str
    status: str
    notes: Optional[str]
    date_applied: datetime
    user_id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str