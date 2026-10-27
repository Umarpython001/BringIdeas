from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.main_router import router
from app.core.settings import settings

app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)