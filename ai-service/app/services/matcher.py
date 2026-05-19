from app.services.skill_extractor import extract_skills
from app.services.embedder import get_embedding, cosine_similarity

def score_resume_jd(resume_text: str, jd_text: str) -> dict:
    # 1. Extract skills
    resume_skills = set(extract_skills(resume_text))
    jd_skills = set(extract_skills(jd_text))
    
    # Calculate matched and missing
    matched_skills = list(jd_skills.intersection(resume_skills))
    missing_skills = list(jd_skills.difference(resume_skills))
    
    # 2. Compute skill overlap score (40% weight)
    # If JD has no skills identified, default to 1.0 to not penalize
    skill_score = len(matched_skills) / len(jd_skills) if jd_skills else 1.0
    
    # 3. Compute semantic similarity via embeddings (60% weight)
    resume_emb = get_embedding(resume_text)
    jd_emb = get_embedding(jd_text)
    semantic_score = cosine_similarity(resume_emb, jd_emb)
    
    # Ensure semantic score doesn't go below 0
    semantic_score = max(0.0, semantic_score)
    
    # 4. Composite score (0-100)
    final_score = (skill_score * 40) + (semantic_score * 60)
    
    return {
        "score": round(final_score, 2),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }