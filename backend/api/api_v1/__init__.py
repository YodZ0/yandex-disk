from fastapi import APIRouter

from core.config import settings

# Main API V1 router
router = APIRouter(
    prefix=settings.api.v1.prefix,
)

# Add api_v1 routers here
