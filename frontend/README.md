# Compliance Platform — Frontend

Aplicación web construida con **React 19** y **Vite** que implementa un flujo de autenticación completo contra el backend JWT.

---

## Características

| Característica | Detalle |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| Autenticación | JWT via backend FastAPI |
| Almacenamiento del token | `sessionStorage` |
| Diseño | Design system de `DESIGN.md` (Inter, glass surfaces, color tokens) |
| Contenedor | Docker + Nginx |

---

## Páginas

### `/login` — Página de inicio de sesión
- Formulario con campos **usuario** y **contraseña**.
- Llama a `POST /token` del backend con `application/x-www-form-urlencoded`.
- Si la autenticación es exitosa, guarda el token en `sessionStorage` y redirige a `/welcome`.
- Muestra mensajes de error para credenciales inválidas o problemas de conexión.

### `/welcome` — Página de bienvenida _(ruta protegida)_
- Solo accesible si existe un token válido en `sessionStorage`.
- Muestra el nombre del usuario autenticado.
- Panel con accesos directos a las secciones principales de la plataforma.
- Botón de **Cerrar sesión** que elimina el token y redirige a `/login`.

Cualquier ruta no reconocida redirige automáticamente a `/login`.

---

## Requisitos

- **Node.js** ≥ 18
- **npm** ≥ 9
- Backend corriendo en `http://localhost:8000` (ver carpeta `backend/`)

---

## Instalación y uso local

```bash
# 1. Ingresar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. (Opcional) Configurar la URL del backend
cp .env.example .env
# Editar VITE_API_URL si el backend no está en http://localhost:8000

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Credenciales de prueba

| Campo | Valor |
|---|---|
| Usuario | `admin` |
| Contraseña | `admin123` |

> El token expira en **5 minutos** (300 segundos). Volvé a hacer login para obtener uno nuevo.

---

## Compilación para producción

```bash
npm run build
```

Los archivos estáticos se generan en la carpeta `dist/`.

---

## Despliegue con Docker Compose

Desde la raíz del proyecto ejecutá:

```bash
docker compose up --build
```

| Servicio | URL |
|---|---|
| Backend | `http://localhost:8000` |
| Frontend | `http://localhost:3000` |

---

## Variables de entorno

| Variable | Por defecto | Descripción |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | URL base del backend |

---

## Estructura del proyecto

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Guard de ruta autenticada
│   ├── contexts/
│   │   └── AuthContext.jsx      # Estado global de autenticación
│   ├── pages/
│   │   ├── LoginPage.jsx        # Página de login
│   │   ├── LoginPage.module.css
│   │   ├── WelcomePage.jsx      # Página de bienvenida (protegida)
│   │   └── WelcomePage.module.css
│   ├── App.jsx                  # Rutas de la aplicación
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Variables de diseño globales
├── index.html
├── vite.config.js
├── Dockerfile
└── .env.example
```

---

## Diseño

El sistema de diseño sigue las especificaciones de [`DESIGN.md`](../DESIGN.md):

- **Paleta de colores:** `#0F172A` (primary), `#E0E7FF` (secondary), `#64748B` (tertiary), `#F1F5F9` (neutral)
- **Tipografía:** Inter (400, 500, 600)
- **Superficies:** estilo glass con `backdrop-filter: blur(12px)` y gradiente de borde
- **Espaciado:** base 12px, escala 1 / 12 / 16 / 20 / 64 px
- **Radios:** 4px, 15px, 16px, 24px, 32px
- **Movimiento:** 160ms `ease` / 200ms `cubic-bezier(0.23, 1, 0.32, 1)`
