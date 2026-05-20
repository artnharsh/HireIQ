import json
from app.services.groq_client import client

def full_analysis(resume_text: str, jd_text: str) -> dict:
    system_prompt = """
    You are an expert ATS resume coach and technical recruiter. 
    Analyze the provided resume against the job description (JD). 
    You MUST return your analysis ONLY as a valid JSON object. Do not include markdown code blocks or any conversational text.
    
    Required JSON structure exactly like this:
    {
      "strengths": ["string", "string"],
      "weaknesses": ["string", "string"],
      "missing_skills": ["string", "string"],
      "bullet_suggestions": [
        {"before": "original resume bullet", "after": "improved bullet targeting JD"}
      ],
      "interview_questions": [
        {"question": "string", "type": "Technical | Behavioral | Situational"}
      ],
      "summary": "string"
    }
    """
    
    user_prompt = f"RESUME:\n{resume_text}\n\nJOB DESCRIPTION:\n{jd_text}"
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        response_format={"type": "json_object"},
        max_tokens=2000
    )
    
    return json.loads(response.choices[0].message.content)