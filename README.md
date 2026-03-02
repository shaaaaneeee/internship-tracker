# Internship Tracker

A web app I built to track my own internship and job applications. Tired of using spreadsheets so I made this instead.

## What it does
- Create an account and log in securely
- Add, edit, and delete job applications
- Track status — applied, interview, rejected, offer
- Search and filter by company, role, or status
- Stats overview with a breakdown chart
- Dark and light mode that persists across sessions
- Only you can see your own data

## Tech
- React + Vite (frontend)
- Python + FastAPI (backend)
- PostgreSQL via Supabase (database)
- JWT authentication
- Deployed on Vercel + Render

## Live Demo
https://internship-tracker-shane.vercel.app

## Running locally

### Backend
```bash
py -m venv venv
venv\Scripts\activate
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Create a `.env` file inside the `backend` folder:
```
DATABASE_URL=your_supabase_connection_string
SECRET_KEY=your_secret_key
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside the `frontend` folder:
```
VITE_API_URL=http://127.0.0.1:8000
```