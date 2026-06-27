from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    POSTGRES_USER: str = "soc_user"
    POSTGRES_PASSWORD: str = "soc_password"
    POSTGRES_DB: str = "soc_db"
    DATABASE_URL: str = "postgresql+asyncpg://soc_user:soc_password@postgres:5432/soc_db"

    class Config:
        env_file = ".env"


settings = Settings()
