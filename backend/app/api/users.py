from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session


from app.core.database import get_db
from app.models.user import UserCreate, UserRead

user_router = APIRouter(
    prefix="/users",
    tags=["users"],
)



@user_router.get("/{user_name}")
def get_user(user_name: str):
    
    return {"user_name": user_name}

@user_router.post("/create_user",)
def create_user(user: UserCreate):
    # Here you would typically create the user in the database
    # For now, we'll just return the user data
    return user