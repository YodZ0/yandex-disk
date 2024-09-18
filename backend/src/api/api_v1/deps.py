from fastapi import Request, HTTPException

from backend.src.core.config import settings
from backend.src.services import YandexClient


async def get_yandex_client(request: Request) -> YandexClient:
    token = request.cookies.get("oauth_token")
    if not token:
        raise HTTPException(status_code=401, detail="Token not found in cookies")

    return YandexClient(base_url=settings.yandex_client.base_url, oauth_token=token)
