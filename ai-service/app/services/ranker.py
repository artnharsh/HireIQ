import concurrent.futures
from app.services.matcher import score_resume_jd
from app.services.groq_client import client
from app.services.skill_extractor import extract_skills

def generate_explanation(resume_text: str, jd_text: str, score: float) -> str:
    system_prompt = "You are a senior technical recruiter summarizing an ATS match."
    user_prompt = f"""
    In exactly 2 sentences, explain why this candidate scored {round(score)}% against this Job Description. 
    Be specific about key skills they have and major gaps. 
    Do NOT mention the score in your response.
    
    RESUME: {resume_text[:2000]} # Truncate to save tokens
    JD: {jd_text}
    """
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=150
    )
    return response.choices[0].message.content.strip()

def cluster_candidates(ranked_list: list) -> dict:
    clusters = {"strong": [], "moderate": [], "weak": []}
    for candidate in ranked_list:
        if candidate["score"] >= 70:
            clusters["strong"].append(candidate)
        elif candidate["score"] >= 40:
            clusters["moderate"].append(candidate)
        else:
            clusters["weak"].append(candidate)
    return clusters

def process_single_resume(resume_item: dict, jd_text: str, generate_reasoning: bool) -> dict:
    match_data = score_resume_jd(resume_item["text"], jd_text)
    
    all_candidate_skills = extract_skills(resume_item["text"])

    explanation = ""
    if generate_reasoning:
        explanation = generate_explanation(resume_item["text"], jd_text, match_data["score"])
        
    return {
        "id": resume_item["id"],
        "filename": resume_item["filename"],
        "score": match_data["score"],
        "candidate_skills": all_candidate_skills,
        "matched_skills": match_data["matched_skills"],
        "missing_skills": match_data["missing_skills"],
        "explanation": explanation
    }

def rank_resumes(jd_text: str, resumes: list) -> dict:
    # Use ThreadPoolExecutor to process resumes concurrently (MASSIVE speedup)
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        # Submit all matching tasks
        future_to_resume = {
            executor.submit(process_single_resume, res, jd_text, False): res for res in resumes
        }
        
        for future in concurrent.futures.as_completed(future_to_resume):
            try:
                result = future.result()
                results.append(result)
            except Exception as e:
                print(f"Error processing resume: {e}")

    # Sort descending
    sorted_results = sorted(results, key=lambda x: x["score"], reverse=True)
    
    # Generate deep Groq explanations ONLY for the Top 5 to save LLM tokens/time
    top_5 = sorted_results[:5]
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        future_to_explanation = {
            executor.submit(generate_explanation, next(r["text"] for r in resumes if r["id"] == res["id"]), jd_text, res["score"]): res for res in top_5
        }
        for future in concurrent.futures.as_completed(future_to_explanation):
            res_ref = future_to_explanation[future]
            try:
                res_ref["explanation"] = future.result()
            except Exception:
                res_ref["explanation"] = "Explanation failed to generate."

    clusters = cluster_candidates(sorted_results)
    
    return {
        "ranked": sorted_results,
        "clusters": clusters
    }