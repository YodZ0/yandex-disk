from fastapi import APIRouter

from src.core.config import settings

from .auth import router as auth_router
from .disk import router as disk_router
from .test import router as test_router

# Main API V1 router
router = APIRouter(
    prefix=settings.api.v1.prefix,
)

# Add api_v1 routers here
router.include_router(router=auth_router)
router.include_router(router=disk_router)
router.include_router(router=test_router)
