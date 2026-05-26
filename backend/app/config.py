import os
from datetime import timedelta

SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production-use-a-long-random-string")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS: int = 300

USERS_DB: dict[str, str] = {
    "admin": "$2b$12$UFPPc.3Moi6FxN2Lbf1LneSNPWw8MdXZgwHPpnK/g9LP6xHt7Wa7O",
}
