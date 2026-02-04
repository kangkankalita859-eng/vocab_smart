# Vocab Smart

A vocabulary learning application with flashcards and reading modes.

## Project Structure

- `backend/` - FastAPI backend with vocabulary API
- `frontend/` - React frontend with Vite

## Development Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev -- --host  # Accessible from other devices
```

## Multi-Machine Development

When developing on different machines on the same network:

1. **Find backend machine IP:**
   ```bash
   # On backend machine
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. **Update frontend .env.local:**
   ```
   VITE_API_URL=http://BACKEND_MACHINE_IP:8000
   ```

3. **Start services:**
   ```bash
   # Backend (on backend machine)
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   
   # Frontend (on frontend machine)
   npm run dev -- --host
   ```

4. **Access from other devices:**
   - Frontend: `http://FRONTEND_MACHINE_IP:5173`
   - Backend API: `http://BACKEND_MACHINE_IP:8000`

## Environment Variables

### Backend (.env)
Copy `backend/.env.example` to `backend/.env` and configure:
- `ALLOWED_ORIGINS` - Frontend URLs (development: http://localhost:5173)
- `API_PREFIX` - API prefix (default: /api)

### Frontend (.env.local)
Copy `frontend/.env.example` to `frontend/.env.local` and configure:
- `VITE_API_URL` - Backend URL (development: http://localhost:8000)

## API Endpoints

- `GET /api/vocab` - Get vocabulary with pagination
  - Query params: `start` (default: 0), `limit` (optional)
- `GET /api/vocab/{word_id}` - Get specific word by ID
- `GET /health` - Health check

## Deployment on Render

1. Connect repository to Render
2. Use `render.yaml` configuration
3. Update environment variables:
   - Backend: `ALLOWED_ORIGINS=https://your-frontend.onrender.com`
   - Frontend: `VITE_API_URL=https://your-backend.onrender.com`

## Features

- Flashcard learning mode
- Reading mode with vocabulary list
- Configurable word ranges
- Progress tracking
- Responsive design
