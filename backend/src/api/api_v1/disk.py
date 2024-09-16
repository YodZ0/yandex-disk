from typing import TYPE_CHECKING, Annotated

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from src.core.config import settings
from .deps import get_yandex_client

if TYPE_CHECKING:
    from src.services import YandexClient


router = APIRouter(prefix=settings.api.v1.disk, tags=["Disk"])


class PublicKey(BaseModel):
    public_key: str


@router.post("/public-resources")
async def get_public_resources(
    public_key: PublicKey,
    yandex_client: Annotated[
        "YandexClient",
        Depends(get_yandex_client),
    ],
):
    public_key = public_key.public_key
    async with yandex_client as client:
        if len(public_key) == 0:
            return HTTPException(status_code=400, detail="Public-key is empty")
        else:
            try:
                data = await client.get_public_resources(public_key=public_key)
                return {"public_resources": data}
            except Exception as e:
                return HTTPException(status_code=500, detail=str(e))
