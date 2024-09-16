from aiohttp import ClientSession


class HTTPClient:
    def __init__(self, base_url: str, oauth_token: str):
        self._session = ClientSession(
            base_url=base_url,
            headers={
                "Authorization": f"OAuth {oauth_token}",
            },
        )


class YandexClient(HTTPClient):
    async def get_all_public_resources(self):
        async with self._session.get(url="/v1/disk/resources/public") as response:
            result = await response.json()
            return result["items"]

    async def get_public_resources(self, public_key: str):
        async with self._session.get(
            url="/v1/disk/public/resources",
            parms={"public_key": public_key},
        ) as response:
            result = await response.json()
            return result["_embedded"]
