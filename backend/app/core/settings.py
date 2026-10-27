from functools import lru_cache
from typing import Annotated, Literal
from pathlib import Path
from pydantic import (
    AnyHttpUrl, 
    BeforeValidator, 
    Field, 
    PostgresDsn, 
    SecretStr, 
    computed_field
)
from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE_PATH = BACKEND_DIR / ".env"



def parse_cors_origins(v: str | list[str]) -> list[str]:
    """
    Transforms a comma-separated string from the .env file 
    into a clean list of allowed domains for FastAPI CORS middleware.
    """
    if isinstance(v, str):
        return [item.strip() for item in v.split(",") if item.strip()]
    return v


class Settings(BaseSettings):
    """
    App-wide Configuration Engine. Parses environment variables out of
    the root .env file, mapping data structures directly into strict types.
    """

    model_config = SettingsConfigDict(
        # This tells Pydantic exactly where the file is on the machine, 
        # no matter where you run the terminal command from.
        env_file=ENV_FILE_PATH,
        case_sensitive=False,
    )

    
    # --- APPLICATION METADATA ---
    PROJECT_NAME: str = "BringIdeas"
    APP_ENV: Literal["development", "production"] = "development"
    DEBUG: bool = False
    API_V1_STR: str = "/api"


    # --- Development Database
    DEVELOPMENT_DATABASE_URL: SecretStr

    # --- SUPABASE CREDENTIALS ---
    SUPABASE_PROJECT_URL: str
    SUPABASE_PUBLISHABLE_KEY: str
    SUPABASE_DIRECT_CONNECTION_STRING: SecretStr


    # --- DATABASE URL
    @property
    def database_url(self) -> SecretStr:
        if self.APP_ENV == "development":
            return self.DEVELOPMENT_DATABASE_URL

        return self.SUPABASE_DIRECT_CONNECTION_STRING

    # --- CORS ORIGIN LIST --- 

    ALLOWED_CORS_ORIGINS: Annotated[
        list[AnyHttpUrl] | list[str], 
        BeforeValidator(parse_cors_origins)
    ]

    # --- PYDANTIC SETTINGS CONTROLS ---
    model_config = SettingsConfigDict(
        # Looks for '.env' file in the execution directory root
        env_file=".env",
        # If an env var exists but is blank, it skips it to prioritize default definitions
        env_ignore_empty=True,
        # Silently drops any extra properties in the .env that aren't declared above
        extra="ignore",
        # Environment variables must perfectly match variable case (e.g. SECRET_KEY)
        case_sensitive=True,
    )


@lru_cache
def get_settings() -> Settings:
    """
    Cached dependency injector. Using lru_cache prevents FastAPI from 
    re-reading files from disk on every incoming HTTP endpoint invocation.
    """
    return Settings()



settings = get_settings()