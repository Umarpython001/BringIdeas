from fastapi import APIRouter


from .routes.users import user_router

router = APIRouter()


router.include_router(user_router)