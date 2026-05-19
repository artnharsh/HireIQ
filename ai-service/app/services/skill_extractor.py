import re

# A foundational list of skills. You can expand this massively later.
SKILLS_DB = [
    "python", "javascript", "react", "node.js", "express", "mongodb", "sql",
    "docker", "kubernetes", "aws", "azure", "gcp", "fastapi", "django", 
    "machine learning", "data analysis", "c++", "java", "c#", "typescript",
    "html", "css", "tailwind", "git", "linux", "agile", "scrum", "rest api",
    "graphql", "microservices", "redis", "postgres", "mysql"
]

def extract_skills(text: str) -> list[str]:
    text_lower = text.lower()
    found_skills = set()
    
    for skill in SKILLS_DB:
        # Use regex word boundaries to avoid matching "java" inside "javascript"
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.add(skill)
            
    return list(found_skills)