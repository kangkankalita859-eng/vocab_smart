from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.vocab import router as vocab_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vocab_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Backend running"}
