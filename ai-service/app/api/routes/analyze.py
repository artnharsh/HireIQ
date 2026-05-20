from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.services.parser import extract_text_from_pdf, extract_text_from_docx
from app.services.skill_extractor import extract_skills
from app.services.analyzer import full_analysis
from app.models.schemas import AnalysisRequest
from app.core.security import verify_api_key

router = APIRouter()

@router.post("/parse", dependencies=[Depends(verify_api_key)])
async def parse_resume(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        
        if file.filename.endswith('.pdf'):
            text = extract_text_from_pdf(contents)
        elif file.filename.endswith('.docx'):
            text = extract_text_from_docx(contents)
        else:
            raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
            
        skills = extract_skills(text)
        
        return {
            "text": text,
            "skills": skills
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/full", dependencies=[Depends(verify_api_key)])
async def analyze_full(request: AnalysisRequest):
    try:
        analysis_result = full_analysis(request.resume_text, request.jd_text)
        return analysis_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")