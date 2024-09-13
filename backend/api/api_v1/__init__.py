from fastapi import APIRouter

from core.config import settings

from auth import router as auth_router

# Main API V1 router
router = APIRouter(
    prefix=settings.api.v1.prefix,
)

# Add api_v1 routers here
router.include_router(router=auth_router)
