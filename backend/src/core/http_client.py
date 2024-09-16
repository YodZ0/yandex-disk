from aiohttp import ClientSession


class HTTPClient:
    def __init__(self, base_url: str, oauth_token: str):
        self._session = ClientSession(
            base_url=base_url,
            headers={
                "Authorization": f"OAuth {oauth_token}",
            },
        )
