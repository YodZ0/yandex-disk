from src.core.config import settings
from src.services import YandexClient


async def get_yandex_client(token: str) -> YandexClient:
    return YandexClient(
        base_url=settings.yandex_client.base_url,
        oauth_token=token,
    )
