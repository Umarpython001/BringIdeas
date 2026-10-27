import re
from typing import Literal

from ..enums import Occupation

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
    model_validator,
)


# -----------------------------------------------
# 1. CREATE USER / SIGNUP
# POST /users
# -----------------------------------------------

class UserCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id : int = Field(description="The unique identifier of the user.")

    first_name: str = Field(min_length=2, max_length=100, description="The user's first name.")
    
    last_name: str = Field(min_length=2, max_length=100, description="The user's last name.")

    username: str = Field(min_length=3, max_length=100, description="The user's username.")

    email: EmailStr = Field(max_length=255, description="The user's email address.")
    
    password: str = Field(min_length=8, max_length=100, description="The user's password.")

    confirm_password: str = Field(min_length=8, max_length=100, description="Confirm the user's password.")

    age: int = Field(ge=3, le=120, description="The user's age.")

    university: str = Field(min_length=5, max_length=255, description="The user's university.")

    occupation: Occupation = Field(description="The user's occupation.",)

    occupation_other: str = Field(min_length=5, max_length=255, description="Details about the user's occupation, if applicable.")


    @model_validator(mode="after")
    def verify_passwords_match(self) -> "UserCreate":
        if self.password != self.confirm_password:
            raise ValueError("passwords do not match")
        return self



# -----------------------------------------------
# 2. NORMAL USER RESPONSE
# -----------------------------------------------

class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(description="The unique identifier of the user.")
    first_name: str = Field(description="The user's first name.")
    last_name: str = Field(description="The user's last name.")
    username: str = Field(description="The user's username.")
    email: str = Field(description="The user's email address.")
    age: int = Field(description="The user's age.")
    university: str | None = Field(description="The user's university, if applicable.")
    occupation: Occupation = Field(description="The user's occupation.")
    occupation_other: str | None = Field(description="Details about the user's occupation, if applicable.")


# -----------------------------------------------
# 3. UPDATE USER
# PATCH /users/{user_id}
# -----------------------------------------------

class UserUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    first_name: str | None = Field(
        default=None,
        min_length=2,
        description="The user's first name."
    )
    last_name: str | None = Field(
        default=None,
        min_length=2,
        description="The user's last name."
    )
    username: str | None = Field(
        default=None,
        min_length=2,
        description="The user's username."
    )
    email: str | None = Field(
        default=None,
        pattern=r"^\S+@\S+\.\S+$",
        description="The user's email address."
    )
    age: int | None = Field(
        default=None,
        description="The user's age."
    )
    university: str | None = Field(default=None, description="The user's university, if applicable.")
    occupation: Occupation | None = Field(default=None, description="The user's occupation.")
    occupation_other: str | None = Field(default=None, description="Details about the user's occupation, if applicable.")

    @model_validator(mode="after")
    def validate_update(self):
        supplied_fields = self.model_fields_set

        if not supplied_fields:
            raise ValueError(
                "At least one field must be provided."
            )

        nullable_fields = {"university", "occupation_other"}

        for field in supplied_fields:
            value = getattr(self, field)

            if value is None and field not in nullable_fields:
                raise ValueError(
                    f"{field} cannot be null."
                )

        return self


# -----------------------------------------------
# 4. GET ALL USERS
# GET /users
# -----------------------------------------------

class UserListResponse(BaseModel):
    items: list[UserRead]
    total: int = Field(ge=0)
    limit: int = Field(ge=1, le=100)
    offset: int = Field(ge=0)


# -----------------------------------------------
# 5. DELETE USER RESPONSE
# DELETE /users/{user_id}
# -----------------------------------------------

class UserDeleteResponse(BaseModel):
    message: str
    deleted_user_id: int = Field(ge=1)
