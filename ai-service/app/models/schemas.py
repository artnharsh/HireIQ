from pydantic import BaseModel
from typing import List, Optional

class ResumeText(BaseModel):
    text: str

class JDMatchRequest(BaseModel):
    resume_text: str
    jd_text: str

class MatchResponse(BaseModel):
    score: float
    matched_skills: List[str]
    missing_skills: List[str]
    # We will populate explanation in Day 5 for the recruiter, but keeping it in the schema
    explanation: Optional[str] = None

class AnalysisRequest(BaseModel):
    resume_text: str
    jd_text: str

class BulkRankRequest(BaseModel):
    jd_text: str
    resumes: List[dict] # Expected format: [{"id": "1", "text": "..."}]

class CoverLetterRequest(BaseModel):
    resume_text: str
    jd_text: str
    company: str
    role: str