from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

# --- import sqlalchemy query functions ---
from sqlalchemy import (
    select,
    exists,
)


from app.db.session import get_db


# --- import user db table schema ---
from app.db.schemas.user import UserTable

# --- import user pydantic models ---
from app.models.user import (
    UserCreate, 
    UserRead, 
    UserUpdate, 
    UserDeleteResponse, 
    UserListResponse
)

user_router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@user_router.get("/all-users")
def all_users(db: Session = Depends(get_db)):

    # I want to get all users. just their ids and usernames

    stmt = select(UserTable.id, UserTable.username)

    all_users = db.execute(stmt).all()

    return all_users

    print("\n\n\n\n\n\n")
    print(type(users))
    # return {"users": users}
    print("\n\n\n\n\n\n")

    return "all users have been returned"

@user_router.get("/{user_name}")
def get_user(user_name: str, db: Session = Depends(get_db)):
    
    return {"user_name": user_name}

# --- Create a new user route ---
# @user_router.post("/create_user",)
# def create_user(user: UserCreate, db: Session = Depends(get_db)):

#     new_user = UserTable(
#         first_name=user.first_name,
#         last_name=user.last_name,
#         username=user.username,
#         email=user.email,
#         age=user.age,
#         university=user.university,
#         occupation=user.occupation,
#         occupation_other=user.occupation_other
#     )

#     try:
#         db.add(new_user)
#         db.commit()
#         db.refresh(new_user)

#         return {
#             "message": "User created successfully",
#             "userID": new_user.id,
#             "createdAt": new_user.created_at
#         }

#     except Exception as e:
#         db.rollback()
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail=f"Error creating user: {str(e)}"
#         )
#         return {"error message": e}