from aiohttp import ClientSession

from fastapi import APIRouter, Response
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


@router.post("/set")
async def set_cookie(
    token: OAuthToken,
    response: Response,
):
    try:
        response.set_cookie(
            key="oauth_token",
            value=token.token,
            samesite="none",
            secure=True,
        )
        return {"status": "200", "message": "success"}
    except Exception as e:
        print(e)
        return {"status": "500", "message": "error"}
