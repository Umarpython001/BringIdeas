from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.users import user_router

backend = FastAPI()
backend.include_router(user_router)

backend.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)



print(user_router.routes)