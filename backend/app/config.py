import os
from datetime import timedelta

SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production-use-a-long-random-string")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS: int = 300

USERS_DB: dict[str, str] = {
    "admin": "$2b$12$ihSyCfRfQpliXW/cq9jH0.SkDxBJbICnvjWIA.wnBo9cktUtuy7YO",
}
