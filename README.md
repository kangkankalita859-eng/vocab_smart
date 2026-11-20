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
Copy `frontend/.env.example` to `frontend/.env.local` and add your Supabase project URL and anon key.

### Cloud flashcard sync setup

1. Create a Supabase project and enable the email provider in **Authentication → Providers → Email**. Disable email confirmation to allow immediate password sign-in after account creation.
2. In **Authentication → URL Configuration**, set the site URL to your deployed app and add the local and deployed app URLs as allowed redirect URLs for password resets.
3. Run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL Editor.
4. Copy the project URL and anon key into `frontend/.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Add the same variables to your Vercel project settings for production.
5. Restart/redeploy the frontend. Create an account or sign in with email and password; use the same account on each device. Existing email-link users can use **Forgot password?** once to set a password.

Vocabulary deck collections are loaded from and saved to the signed-in user's protected cloud row, so use the same account on each device. Changes are also cached locally per account. Existing unassigned local vocabulary decks are uploaded for the first account that opens the flashcard session on that browser; later accounts cannot claim another account's marked local data. Cloud saves happen automatically after deck changes; if a save fails, the app reports the error and **Save Progress** retries it. Do not put a Supabase `service_role` key in frontend variables.

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
