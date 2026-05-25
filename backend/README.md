# JWT Auth API — Backend

API REST construida con **Python 3.11** y **FastAPI** que implementa autenticación basada en **JWT** (JSON Web Tokens).

---

## Características

| Característica | Detalle |
|---|---|
| Framework | FastAPI |
| Gestión de dependencias | Poetry |
| Algoritmo JWT | HS256 |
| Expiración del token | 300 segundos |
| Contenedor | Docker / Docker Compose |

---

## Endpoints

### `POST /token`
Obtiene un token JWT enviando credenciales.

**Request** (form-data o `application/x-www-form-urlencoded`):
```
username=admin
******
```

**Response:**
```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

---

### `POST /token/refresh`
Refresca un token JWT existente (aún válido).

**Request** (JSON):
```json
{
  "token": "<jwt_actual>"
}
```

**Response:**
```json
{
  "access_token": "<nuevo_jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

---

### `GET /health`
Verifica el estado del servicio.

**Response:**
```json
{ "status": "ok" }
```

---

## Instalación y uso local (con Poetry)

### Prerrequisitos
- Python ≥ 3.11
- [Poetry](https://python-poetry.org/docs/#installation)

### Pasos

```bash
# 1. Ingresar a la carpeta backend
cd backend

# 2. Instalar dependencias
poetry install

# 3. Iniciar el servidor
poetry run uvicorn app.main:app --reload --port 8000
```

La API estará disponible en `http://localhost:8000`.  
La documentación interactiva (Swagger UI) se puede consultar en `http://localhost:8000/docs`.

---

## Despliegue con Docker

### Prerrequisitos
- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/install/) ≥ 2

### Pasos

```bash
# Desde la raíz del proyecto
docker compose up --build
```

La API quedará disponible en `http://localhost:8000`.

Para detener el contenedor:
```bash
docker compose down
```

---

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `SECRET_KEY` | `change-me-in-production-use-a-long-random-string` | Clave secreta para firmar los JWT. **Cambiar en producción.** |

---

## Ejemplo de uso con curl

```bash
# 1. Obtener token
curl -X POST http://localhost:8000/token \
  -d "username=admin&******"

# 2. Refrescar token (reemplazar <token> con el valor obtenido)
curl -X POST http://localhost:8000/token/refresh \
  -H "Content-Type: application/json" \
  -d '{"token": "<token>"}'
```

---

## Estructura del proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── auth.py        # Lógica de autenticación y JWT
│   ├── config.py      # Configuración (secreto, algoritmo, expiración)
│   └── main.py        # Definición de la API y endpoints
├── Dockerfile
├── pyproject.toml
└── README.md
```
