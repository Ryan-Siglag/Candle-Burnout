# Candle-Burnout

This is a full stack project with the goal of helping students track their burnout levels over the course of a semester or year.

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose

## Environment setup

Create a `.env` file in the project root:

```env
DB_PASSWORD=your_mysql_password
SECRET_KEY=your_django_secret_key
VITE_API_URL=http://localhost:8000
```

`VITE_API_URL` is baked into the frontend at build time and should point to the Django API as seen from your browser.

## Startup (Docker)

From the project root:

```bash
docker compose up --build
```

On first run, the backend automatically runs migrations and seeds the database.

To run in the background:

```bash
docker compose up -d --build
```

To stop:

```bash
docker compose down
```

## URLs

### Docker (recommended)

| Service | URL |
|---------|-----|
| **App (frontend)** | http://localhost/candle-burnout-tracker/ |
| **API (backend)** | http://localhost:8000 |
| **Django admin** | http://localhost:8000/admin/ |

The app is served under `/candle-burnout-tracker/` because of the Vite base path. Opening `http://localhost/` alone will not load the app.

### Local development (without Docker)

**Backend** (from the `candle/` directory):

```bash
python manage.py migrate
python manage.py seed
python manage.py runserver
```

**Frontend** (from the `frontend/` directory):

```bash
npm install
npm run dev
```

| Service | URL |
|---------|-----|
| **App (frontend)** | http://localhost:5173/candle-burnout-tracker/ |
| **API (backend)** | http://127.0.0.1:8000 |

Set `VITE_API_URL=http://127.0.0.1:8000` in a `frontend/.env` file (or export it) when running the Vite dev server.

### Network / VM access

If accessing from another device on the same network, use your host machine's IP (e.g. `192.168.1.168`):

- **App:** http://192.168.1.168/candle-burnout-tracker/
- **API:** http://192.168.1.168:8000

Make sure the host IP is listed in `ALLOWED_HOSTS` in `candle/candle/settings.py`.
