from typing import TYPE_CHECKING, Annotated

from fastapi import APIRouter, Depends, HTTPException

from src.core.config import settings
from .deps import get_yandex_client

if TYPE_CHECKING:
    from src.services import YandexClient


router = APIRouter(prefix=settings.api.v1.disk, tags=["Disk"])


@router.get("/public-resources")
async def get_public_resources(
    public_key: str,
    yandex_client: Annotated[
        "YandexClient",
        Depends(get_yandex_client),
    ],
):
    async with yandex_client as client:
        try:
            resources = await client.get_public_resources(public_key=public_key)
            return {"public_resources": resources}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
