from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from api.vocab import router as vocab_router

from api.pyq import router as pyq_router

import os

from dotenv import load_dotenv



# Load environment variables

load_dotenv()



app = FastAPI(

    title=os.getenv("APP_NAME", "Vocab Smart Backend"),

    version=os.getenv("APP_VERSION", "1.0.0")

)



# Get allowed origins from environment or use wildcard for development

allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",") if os.getenv("ALLOWED_ORIGINS") else ["*"]



app.add_middleware(

    CORSMiddleware,

    allow_origins=allowed_origins,

    allow_methods=["*"],

    allow_headers=["*"],

)



api_prefix = os.getenv("API_PREFIX", "/api")

app.include_router(vocab_router, prefix=api_prefix)

app.include_router(pyq_router, prefix=api_prefix)



@app.get("/")

def root():

    return {

        "status": "Backend running",

        "app": app.title,

        "version": app.version

    }



@app.get("/health")

def health_check():

    return {"status": "healthy"}

