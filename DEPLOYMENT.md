# Deployment Guide

## Production (Recommended) - Works on Any Device

### Step 1: Deploy to Render
1. Go to Render.com
2. Connect your GitHub repository
3. Use the `render.yaml` configuration
4. Deploy both backend and frontend

### Step 2: Access URLs
- Frontend: `https://vocab-smart-frontend.onrender.com`
- Backend: `https://vocab-smart-backend.onrender.com`

## Local Network - Same WiFi Only

### Backend Machine
```bash
cd backend/app
python main.py  # Runs on 0.0.0.0:8000
```

### Frontend Machine
1. Update `.env.local`:
   ```
   VITE_API_URL=http://BACKEND_MACHINE_IP:8000
   ```

2. Start frontend:
   ```bash
   npm run dev -- --host
   ```

3. Access from any device:
   - Frontend: `http://FRONTEND_MACHINE_IP:5173`
   - Backend: `http://BACKEND_MACHINE_IP:8000`

### Find IP Addresses
```bash
# Windows
ipconfig

# Mac/Linux  
ifconfig
```

## Quick Test
1. Deploy to Render for easiest cross-device access
2. Or use local network for same WiFi devices only
