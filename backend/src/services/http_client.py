from abc import ABC, abstractmethod
from datetime import datetime
from typing import Any

from aiohttp import ClientSession


class HTTPClient(ABC):
    def __init__(self, base_url: str, oauth_token: str):
        self._session = ClientSession(
            base_url=base_url,
            headers={
                "Authorization": f"OAuth {oauth_token}",
            },
        )

    async def close(self):
        await self._session.close()

    @abstractmethod
    async def __aenter__(self): ...

    @abstractmethod
    async def __aexit__(self, exc_type, exc, tb): ...


class YandexClient(HTTPClient):
    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.close()

    @staticmethod
    def fetch_data(data: list) -> list:
        result = []

        for item in data:
            title = item.get("name")
            typ = item.get("type")
            modified_at = datetime.fromisoformat(item.get("modified")).strftime(
                "%d-%m-%Y"
            )
            public_url = item.get("public_url")
            media_type = item.get("media_type", None)
            download_link = item.get("file", None)

            item_info = {
                "title": title,
                "typ": typ,
                "modified_at": modified_at,
                "public_url": public_url,
                "media_type": media_type,
                "download_link": download_link,
            }

            result.append(item_info)
        return result

    async def get_public_resources(self, public_key: str) -> dict[str, Any]:
        async with self._session.get(
            url="/v1/disk/public/resources",
            params={
                "public_key": public_key,
                "fields": "name, public_url, modified, _embedded",
                "sort": "type",
            },
        ) as response:
            data = await response.json()
            title = data.get("name")
            public_url = data.get("public_url")
            modified_at = datetime.fromisoformat(data.get("modified", "")).strftime(
                "%d-%m-%Y"
            )
            embedded = data.get("_embedded")

            if embedded:
                raw_items = embedded.get("items")
                items = self.fetch_data(raw_items)
            else:
                items = None

            result = {
                "title": title,
                "public_url": public_url,
                "modified_at": modified_at,
                "items": items,
            }
            return result
