from abc import ABC, abstractmethod
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
    async def get_public_resources(self, public_key: str):
        async with self._session.get(
            url="/v1/disk/public/resources",
            params={"public_key": public_key},
        ) as response:
            result = await response.json()
            return result["_embedded"]

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.close()
