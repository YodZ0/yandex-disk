from fastapi import APIRouter

from core.config import settings
from services import AuthService

router = APIRouter(
    prefix=settings.api.v1.auth,
    tags=['Auth'],
)
