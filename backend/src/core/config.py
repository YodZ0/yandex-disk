from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class RunConfig(BaseModel):
    host: str = "127.0.0.1"
    port: int = 8000


class ApiV1Prefix(BaseModel):
    prefix: str = "/v1"
    auth: str = "/auth"
    disk: str = "/disk"


class ApiPrefix(BaseModel):
    prefix: str = "/api"
    v1: ApiV1Prefix = ApiV1Prefix()


class YandexClient(BaseModel):
    base_url: str = "https://cloud-api.yandex.net"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__",
        env_file=(".env.template", ".env"),
    )
    run: RunConfig = RunConfig()
    api: ApiPrefix = ApiPrefix()
    yandex_client: YandexClient = YandexClient()


settings = Settings()
