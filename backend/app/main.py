from fastapi import FastAPI
from app.api.tickets import router as tickets_router
from app.api.comments import router as comments_router
from app.api.db import metadata, database, engine

from fastapi.middleware.cors import CORSMiddleware

metadata.create_all(engine)

app = FastAPI(openapi_url="/api/v1/openapi.json", 
              docs_url="/api/v1/docs")

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(tickets_router, prefix='/api/v1/tickets', tags=['tickets'])
app.include_router(comments_router, prefix='/api/v1/comments', tags=['comments'])