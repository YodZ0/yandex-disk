from src.core.http_client import YandexClient
from src.core.config import settings


async def get_yandex_client(token: str) -> YandexClient:
    return YandexClient(
        base_url=settings.yandex_client.base_url,
        oauth_token=token,
    )
