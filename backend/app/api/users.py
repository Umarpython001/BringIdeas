from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session


from app.core.database import get_db
from app.models.user import UserCreate, UserRead

user_router = APIRouter(
    prefix="/users",
    tags=["users"],
)


def _verify_user_information(user: UserCreate) -> UserCreate:
    """
    Verify that the user information is valid.
    Raises an HTTPException if any validation fails.
    """
    if len(user.first_name.strip()) < 2:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="First name must be at least 2 characters long."
        )
    if len(user.last_name.strip()) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Last name must be at least 2 characters long."
        )
    

    

    if not (3 <= user.age <= 120):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Age must be between 3 and 120."
        )
    if user.university and len(user.university.strip()) < 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="University name must be at least 5 characters long."
        )
    if user.occupation == "Other" and (not user.occupation_other or len(user.occupation_other.strip()) < 5):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="If occupation is 'Other', occupation_other must be provided and at least 5 characters long."
        )
    
    return user

@user_router.get("/{user_name}")
def get_user(user_name: str):
    
    return {"user_name": user_name}

@user_router.post("/create_user",)
def create_user(user: UserCreate):



    # Here you would typically create the user in the database
    # For now, we'll just return the user data
    return user