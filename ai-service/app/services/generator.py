from app.services.groq_client import client

def generate_cover_letter(resume_text: str, jd_text: str, company: str, role: str) -> dict:
    system_prompt = """
    You are an expert career coach and technical recruiter.
    Write a professional, concise 3-paragraph cover letter.
    Rule 1: Match the tone of the job description.
    Rule 2: Extract and strictly use specific achievements and metrics from the provided resume.
    Rule 3: DO NOT use generic filler phrases (e.g., "I am writing to apply for...", "To whom it may concern").
    Rule 4: Output ONLY the cover letter text. No markdown blocks, no introductory text.
    """
    
    user_prompt = f"Role: {role}\nCompany: {company}\n\nRESUME:\n{resume_text}\n\nJOB DESCRIPTION:\n{jd_text}"
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=1500
    )
    
    return {"cover_letter": response.choices[0].message.content.strip()}