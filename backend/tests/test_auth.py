import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_login_success():
    response = client.post("/token", data={"username": "admin", "password": "admin123"})
    assert response.status_code == 200
    data = response.json()
    assert data["token_type"] == "bearer"
    assert data["expires_in"] == 300
    assert "access_token" in data
    assert len(data["access_token"]) > 0


def test_login_wrong_password():
    response = client.post("/token", data={"username": "admin", "password": "wrong"})
    assert response.status_code == 401


def test_login_unknown_user():
    response = client.post("/token", data={"username": "unknown", "password": "admin123"})
    assert response.status_code == 401


def test_refresh_token_success():
    login = client.post("/token", data={"username": "admin", "password": "admin123"})
    token = login.json()["access_token"]

    response = client.post("/token/refresh", json={"token": token})
    assert response.status_code == 200
    data = response.json()
    assert data["token_type"] == "bearer"
    assert data["expires_in"] == 300
    assert "access_token" in data


def test_refresh_token_invalid():
    response = client.post("/token/refresh", json={"token": "not.a.valid.token"})
    assert response.status_code == 401


def test_refresh_token_tampered():
    login = client.post("/token", data={"username": "admin", "password": "admin123"})
    token = login.json()["access_token"]
    tampered = token[:-5] + "XXXXX"
    response = client.post("/token/refresh", json={"token": tampered})
    assert response.status_code == 401
