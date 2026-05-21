from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import BulkRankRequest
from app.services.ranker import rank_resumes
from app.core.security import verify_api_key

router = APIRouter()

@router.post("/bulk", dependencies=[Depends(verify_api_key)])
async def bulk_rank_candidates(request: BulkRankRequest):
    try:
        # Convert Pydantic objects back to dicts for the service layer
        resumes_dict = [r.dict() for r in request.resumes]
        result = rank_resumes(request.jd_text, resumes_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ranking failed: {str(e)}")