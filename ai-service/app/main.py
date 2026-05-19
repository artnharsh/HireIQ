from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import analyze, match

app = FastAPI(
    title="HireIQ AI Service",
    description="Microservice for resume parsing, JD matching, and generative AI features.",
    version="1.0.0"
)

# CORS configuration - adjust in production to allow only your Node backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyze.router, prefix="/analyze", tags=["Analyze"])
app.include_router(match.router, prefix="/match", tags=["Match"])

@app.get("/")
async def root():
    return {"message": "HireIQ AI Service is running"}