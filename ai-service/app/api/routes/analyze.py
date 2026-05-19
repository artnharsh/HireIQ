from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.services.parser import extract_text_from_pdf, extract_text_from_docx
from app.services.skill_extractor import extract_skills
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