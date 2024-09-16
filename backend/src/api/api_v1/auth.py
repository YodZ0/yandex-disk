from aiohttp import ClientSession

from fastapi import APIRouter
from pydantic import BaseModel

from src.core.config import settings

router = APIRouter(prefix=settings.api.v1.auth, tags=["Auth"])


class OAuthToken(BaseModel):
    token: str


@router.post("/validate")
async def validate_token(token: OAuthToken):
    async with ClientSession() as session:
        async with session.get(
            url="https://cloud-api.yandex.net/v1/disk",
            headers={
                "Authorization": f"OAuth {token.token}",
            },
            params={"fields": "user"},
        ) as response:
            res = await response.json()
            return res
