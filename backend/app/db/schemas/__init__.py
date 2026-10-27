"""
This models folder contains the data models and schema definitions used in the database.
It defines the structure and relationships of the data entities, allowing for efficient storage, retrieval, and
"""

# app/db/schemas/__init__.py


from .user import UserTable

# from app.models.user import UserProfile
# from app.models.idea import Idea
# from app.models.post import Post

__all__ = [
    "UserTable",
]