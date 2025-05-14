# Bloc de Notas – Laravel API + React TS

Este repositorio contiene una aplicación de bloc de notas con:

* **Backend**: API REST construida con Laravel (PHP 8.2+)
* **Frontend**: SPA en React + TypeScript

Incluye dos formas de levantar el proyecto:
1. **Con Docker Compose** (recomendado)
2. **Manual** (sin Docker)


## 📂 Estructura del proyecto

```
notes-app/
├── backend/    # Proyecto Laravel (API)
├── frontend/   # Proyecto React + TypeScript
└── README.md   # Documentación general
```

## ⚙️ Requisitos previos

### 🐳 Con Docker
* Docker & Docker Compose instalados

### 🛠️ Manual (sin Docker)

| Dependencia | Versión mínima | Instalación |
|-------------|---------------|-------------|
| PHP         | 8.2+          | `brew install php` |
| Composer    | 2.x           | `brew install composer` |
| Node.js     | 18.x          | `brew install node` |
| npm         | 9.x           | incluido con Node.js |

## 📝 Variables de entorno

### Backend (`backend/.env`)

Ambos archivos `.env` están incluidos en el repositorio para facilitar la puesta en marcha de la prueba.

## 🌀 Clonar el repositorio

```bash
git clone https://github.com/alboup/notes-app.git
cd notes-app
```

## 🚀 Levantar la aplicación con Docker Compose

Desde la raíz del repositorio, ejecuta:

```bash
docker compose up --build
```

Espera a que termine la construcción y arranque de los servicios.

* **API Laravel**: http://localhost:8000
* **Front-end React**: http://localhost:5173

El contenedor de **backend** ejecuta migraciones y seeders automáticamente y arranca `php artisan serve`. El contenedor de **frontend** sirve la SPA compilada.

## ⚙️ Levantar manualmente (sin Docker)

### Backend

```bash
cd backend

# Instalar dependencias y generar fichero SQLite
env && composer install
touch database/database.sqlite

# Ejecutar migraciones y seeders
php artisan migrate:fresh --seed

# Arrancar servidor de desarrollo
php artisan serve --host=127.0.0.1 --port=8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

* Accede a http://localhost:5173
* El front consumirá la API en http://localhost:8000/api/v1

## 🔐 Autenticación de la API

Todas las rutas de la API requieren el header HTTP:

```
Authentication: Doonamis
```

Ejemplo con `curl`:

```bash
curl -H "Authentication: Doonamis" http://localhost:8000/api/v1/notes
```

## 📚 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/api/v1/notes` | Listar notas (paginación 6/página) |
| POST   | `/api/v1/notes` | Crear nueva nota (status 201) |
| GET    | `/api/v1/notes/{id}` | Ver detalle de una nota específica |
| PUT    | `/api/v1/notes/{id}` | Actualizar nota existente |
| DELETE | `/api/v1/notes/{id}` | Eliminar nota (status 204) |

**Búsqueda opcional:** `GET /api/v1/notes?search=texto`
