# Internship Tracker

A web app I built to track my own internship and job applications. Tired of using spreadsheets so I made this instead.

## What it does
- Create an account and log in
- Add applications with company, role, and status
- Update and delete applications
- Only you can see your own data

## Tech
- React (frontend)
- Python + FastAPI (backend)
- PostgreSQL via Supabase (database)
- JWT for auth

## Status
Still in progress — frontend coming soon.

## Running locally

```bash
# Backend
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Create a `.env` file with:
```
DATABASE_URL=your_supabase_url
SECRET_KEY=your_secret_key
```
