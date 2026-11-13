import os

from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, declarative_base

from .settings import settings


engine = create_engine(
    settings.SUPABASE_DIRECT_CONNECTION_STRING,
    echo=True,
    pool_pre_ping=True,
    pool_size=20,
    max_overflow=15,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=True,
)


Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()