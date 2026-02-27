from fastapi import FastAPI
from database import Base, engine
import models
from routers import auth
from routers import applications

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(applications.router)

@app.get("/")
def read_root():
    return {"message": "Internship Tracker API is running!"}
