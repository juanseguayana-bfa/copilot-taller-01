from fastapi import FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from jose import JWTError
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from app.auth import authenticate_user, create_access_token, decode_token

app = FastAPI(title="JWT Auth API", version="1.0.0")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int


class RefreshRequest(BaseModel):
    token: str


@app.post("/token", response_model=Token, summary="Obtain a JWT access token")
def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
    if not authenticate_user(form_data.username, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": form_data.username})
    return Token(access_token=access_token, token_type="bearer", expires_in=300)


@app.post("/token/refresh", response_model=Token, summary="Refresh a JWT access token")
def refresh_token(body: RefreshRequest) -> Token:
    try:
        payload = decode_token(body.token)
        username: str = payload.get("sub", "")
        if not username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    new_token = create_access_token({"sub": username})
    return Token(access_token=new_token, token_type="bearer", expires_in=300)


@app.get("/health", summary="Health check")
def health() -> dict:
    return {"status": "ok"}
