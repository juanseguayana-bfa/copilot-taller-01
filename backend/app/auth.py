from datetime import datetime, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext

from app.config import ALGORITHM, SECRET_KEY, ACCESS_TOKEN_EXPIRE_SECONDS, USERS_DB

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str) -> bool:
    hashed = USERS_DB.get(username)
    if not hashed:
        return False
    return verify_password(password, hashed)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc).timestamp() + ACCESS_TOKEN_EXPIRE_SECONDS
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
