from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import CoverLetterRequest
from app.services.generator import generate_cover_letter
from app.core.security import verify_api_key

router = APIRouter()

@router.post("/cover-letter", dependencies=[Depends(verify_api_key)])
async def create_cover_letter(request: CoverLetterRequest):
    try:
        result = generate_cover_letter(
            request.resume_text, 
            request.jd_text, 
            request.company, 
            request.role
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")