from fastapi import ( 
    APIRouter, 
)

from .routes.users import user_router
from .routes.health_check import health_router

router = APIRouter()


router.include_router(user_router)
router.include_router(health_router)