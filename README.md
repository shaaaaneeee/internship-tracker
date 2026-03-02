# Internship Tracker

A web app I built to track my own internship and job applications. Tired of using spreadsheets so I made this instead.

## What it does
- Create an account and log in
- Add, edit, and delete applications
- Track status — applied, interview, rejected, offer
- Add notes to each application
- Stats overview at the top of the dashboard
- Dark and light mode
- Only you can see your own data

## Tech
- React + Vite (frontend)
- Python + FastAPI (backend)
- PostgreSQL via Supabase (database)
- JWT for auth
- Deployed on Vercel + Render

## Running locally

### Backend
```bash
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd backend
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

## Project structure
```
internship-tracker/
├── backend/
│   ├── routers/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       └── pages/
├── .gitignore
└── README.md
```