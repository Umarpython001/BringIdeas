from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.users import user_router

app = FastAPI()
app.include_router(user_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)


