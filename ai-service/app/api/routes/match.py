from fastapi import APIRouter, Depends
from app.models.schemas import JDMatchRequest, MatchResponse
from app.services.matcher import score_resume_jd
from app.core.security import verify_api_key

router = APIRouter()

@router.post("/", response_model=MatchResponse, dependencies=[Depends(verify_api_key)])
async def match_resume_to_jd(request: JDMatchRequest):
    result = score_resume_jd(request.resume_text, request.jd_text)
    
    return MatchResponse(
        score=result["score"],
        matched_skills=result["matched_skills"],
        missing_skills=result["missing_skills"],
        explanation=None
    )