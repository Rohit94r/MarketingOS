from pydantic_settings import BaseSettings
from pydantic_settings import SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        extra="ignore",
    )

    app_name: str = "AI MarketingOS"
    database_url: str = "sqlite:///./marketing_os.db"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"

    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
