# Vocab Smart

A vocabulary learning application with flashcards, reading modes, and interactive India map.

## Project Structure

- `frontend/` - React frontend with Vite (Pure Frontend Application)

## Features

- Flashcard learning mode
- Reading mode with vocabulary list
- Configurable word ranges
- Progress tracking
- Responsive design
- Interactive India Political Map with Chief Ministers
- State information: MP Seats, Assembly Seats, Capital, Chief Minister

## Development Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Interactive India Map

Navigate to: Home → General Studies → Geography → India Map

Features:
- Click on any state to see detailed information
- MP Seats (Lok Sabha)
- Assembly Seats (Vidhan Sabha)
- Capital City
- Chief Minister (Current)
- Mobile responsive design
- Interactive hover effects

## Deployment on Vercel

1. Connect repository to Vercel
2. Use `vercel.json` configuration
3. Automatic deployment from main branch

## Environment Variables

### Frontend (.env.local)
Copy `frontend/.env.example` to `frontend/.env.local` and configure:
- No backend dependencies required

## Technologies Used

- React 18
- Vite
- CSS3 (Responsive Design)
- Interactive SVG Maps

## State Data Coverage

All 36 Indian States and Union Territories:
- 28 States with Chief Ministers
- 8 Union Territories (marked as "No CM")
- Current political leadership information
- Parliamentary and assembly seat data
