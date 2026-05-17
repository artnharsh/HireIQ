# 🚀 AI Job Application Intelligence Platform
## Complete 7-Day Build Plan + Scaling Roadmap

---

# 📌 PROJECT OVERVIEW

**Name:** HireIQ — AI-Powered Job Application Intelligence Platform  
**Stack:** MERN (MongoDB, Express, React, Node.js) + Python AI Microservice  
**Theme:** Help candidates land jobs faster. Help recruiters screen smarter.

---

# 🎯 COMPLETE FEATURE LIST

## ✅ Core Features (Building in 7 Days)

### Auth & Onboarding
- [ ] Google OAuth 2.0 login
- [ ] Email + Password login/signup (JWT-based)
- [ ] Role selection on signup: **Candidate** or **Recruiter**
- [ ] Profile setup wizard after first login

### Candidate Side
- [ ] **Resume Upload** (PDF/DOCX) → parsed and stored
- [ ] **AI Resume Analysis** → strengths, weaknesses, missing keywords
- [ ] **Job Description Paste** → JD gap analysis vs uploaded resume
- [ ] **Skill Gap Report** → what skills you're missing for the role
- [ ] **Match Score** → % match between resume and JD (0–100)
- [ ] **Tailored Bullet Suggestions** → rewrite your bullets to match JD
- [ ] **Interview Prep Questions** → AI generates 10 likely questions based on JD
- [ ] **Cover Letter Generator** → one-click draft based on resume + JD
- [ ] **Job Feed** → browse/search jobs (filtered)
- [ ] **Save Jobs** → bookmark jobs to apply later
- [ ] **Application Tracker** → track status: Applied, Interview, Rejected, Offer

### Filters (Job Feed)
- [ ] Type: **Internship / Full-time / Part-time / Contract**
- [ ] Experience Level: **Fresher (0) / 0–1 yr / 1–3 yrs / 3–5 yrs / 5+ yrs**
- [ ] Domain: Tech, Marketing, Finance, Design, etc.
- [ ] Location: Remote / Onsite / Hybrid + city
- [ ] Salary range
- [ ] Date posted: Last 24h / Week / Month

### Recruiter Side
- [ ] **Post a Job** → structured JD form
- [ ] **Upload Resumes (bulk)** → upload up to 50 PDFs
- [ ] **AI Ranking** → ranked list with match score per resume
- [ ] **Cluster View** → candidates grouped by skill similarity
- [ ] **Shortlist Explanation** → why each candidate is ranked where they are
- [ ] **Download Shortlist** → CSV export of ranked candidates
- [ ] **Candidate Profile View** → parsed resume in clean UI

### Analytics Dashboard (Data Layer)
- [ ] **Trending Skills** → what skills appear most in JDs this week
- [ ] **JD Keyword Cloud** → visual word cloud per domain
- [ ] **Your Match Trends** → how your resume score improves over time
- [ ] **Application Funnel** → how many applied → interviewed → offered

---

## 🔮 Features NOT Built Now (Post-MVP Scaling Additions)
- Auto-apply agent (LangGraph autonomous agent)
- Company research agent (scrapes Glassdoor, LinkedIn)
- Salary prediction model
- LinkedIn profile import
- ATS score checker
- Real-time job scraping (LinkedIn, Naukri, Indeed)
- Resume version manager
- Team collaboration for recruiters
- Email notifications pipeline
- Mobile app (React Native)

---

# 🏗️ TECH STACK (Final Decision)

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | UI |
| Styling | Tailwind CSS + shadcn/ui | Components |
| State | Zustand | Global state |
| Backend | Node.js + Express | REST API |
| Database | MongoDB Atlas | Data storage |
| Auth | Passport.js (Google OAuth) + JWT | Authentication |
| File Storage | Cloudinary or AWS S3 | Resume PDFs |
| AI Service | Python FastAPI microservice | All AI logic |
| LLM | Groq API (Llama 3.3 70B) — FREE | Text generation |
| Embeddings | sentence-transformers (all-MiniLM-L6-v2) | Resume-JD matching |
| PDF Parsing | pdfplumber + python-docx | Extract text from resumes |
| Vector Store | FAISS (local) → Pinecone later | Similarity search |
| Deployment | Railway (backend) + Vercel (frontend) | MVP hosting |

> **Why Groq?** Free tier, extremely fast inference (500 tok/sec), supports Llama 3.3 70B which is excellent for resume tasks.

---

# 📁 COMPLETE FILE & FOLDER STRUCTURE

```
hireiq/
│
├── client/                          # React Frontend (Vite)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                  # Images, icons
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn base components
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignupForm.jsx
│   │   │   │   └── GoogleOAuthButton.jsx
│   │   │   ├── candidate/
│   │   │   │   ├── ResumeUploader.jsx
│   │   │   │   ├── JDPasteBox.jsx
│   │   │   │   ├── MatchScoreCard.jsx
│   │   │   │   ├── SkillGapReport.jsx
│   │   │   │   ├── BulletSuggestions.jsx
│   │   │   │   ├── InterviewPrepCard.jsx
│   │   │   │   ├── CoverLetterModal.jsx
│   │   │   │   └── ApplicationTracker.jsx
│   │   │   ├── recruiter/
│   │   │   │   ├── ResumeRanker.jsx
│   │   │   │   ├── CandidateCluster.jsx
│   │   │   │   ├── ShortlistTable.jsx
│   │   │   │   └── JobPostForm.jsx
│   │   │   ├── jobs/
│   │   │   │   ├── JobCard.jsx
│   │   │   │   ├── JobFeed.jsx
│   │   │   │   ├── FilterSidebar.jsx
│   │   │   │   └── JobDetailModal.jsx
│   │   │   └── analytics/
│   │   │       ├── SkillTrendChart.jsx
│   │   │       ├── KeywordCloud.jsx
│   │   │       └── ApplicationFunnel.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── CandidateDashboard.jsx
│   │   │   ├── ResumeAnalysis.jsx
│   │   │   ├── JobFeedPage.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   ├── ApplicationTrackerPage.jsx
│   │   │   ├── RecruiterDashboard.jsx
│   │   │   ├── BulkScreening.jsx
│   │   │   ├── PostJob.jsx
│   │   │   └── AnalyticsDashboard.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useResume.js
│   │   │   ├── useJobs.js
│   │   │   └── useAI.js
│   │   ├── store/
│   │   │   ├── authStore.js          # Zustand auth state
│   │   │   ├── resumeStore.js
│   │   │   └── jobStore.js
│   │   ├── services/
│   │   │   ├── api.js                # Axios base instance
│   │   │   ├── authService.js
│   │   │   ├── resumeService.js
│   │   │   ├── jobService.js
│   │   │   └── aiService.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   └── validators.js
│   │   ├── constants/
│   │   │   └── filterOptions.js      # All filter enums
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                           # Node.js + Express Backend
│   ├── config/
│   │   ├── db.js                     # MongoDB connection
│   │   ├── passport.js               # Google OAuth strategy
│   │   └── cloudinary.js             # File upload config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── resumeController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── recruiterController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verify
│   │   ├── roleMiddleware.js         # candidate/recruiter guard
│   │   ├── uploadMiddleware.js       # multer config
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Resume.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   ├── Company.js
│   │   └── SkillTrend.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── recruiterRoutes.js
│   │   └── analyticsRoutes.js
│   ├── services/
│   │   ├── aiProxyService.js         # Calls Python AI microservice
│   │   ├── emailService.js           # Nodemailer (future)
│   │   └── fileService.js            # Cloudinary uploads
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── apiResponse.js            # Standardized responses
│   ├── .env
│   ├── server.js                     # Entry point
│   └── package.json
│
├── ai-service/                       # Python FastAPI AI Microservice
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── analyze.py        # Resume analysis endpoints
│   │   │   │   ├── match.py          # JD matching endpoints
│   │   │   │   ├── generate.py       # Cover letter, bullets
│   │   │   │   └── rank.py           # Bulk resume ranking
│   │   ├── core/
│   │   │   ├── config.py             # Settings, API keys
│   │   │   └── security.py           # API key auth for internal calls
│   │   ├── services/
│   │   │   ├── parser.py             # PDF/DOCX text extraction
│   │   │   ├── embedder.py           # sentence-transformers
│   │   │   ├── matcher.py            # Cosine similarity scoring
│   │   │   ├── groq_client.py        # Groq API calls
│   │   │   ├── analyzer.py           # Resume gap analysis logic
│   │   │   ├── ranker.py             # Bulk ranking logic
│   │   │   └── skill_extractor.py    # NER for skill extraction
│   │   ├── models/
│   │   │   └── schemas.py            # Pydantic models
│   │   └── main.py                   # FastAPI app entry
│   ├── requirements.txt
│   ├── .env
│   └── Dockerfile
│
├── docker-compose.yml                # Run all 3 services locally
├── .gitignore
└── README.md
```

---

# 📅 7-DAY BUILD PLAN

---

## 🗓️ DAY 1 — Foundation: Project Setup + Auth

### Goal
Working app skeleton with Google OAuth + Email/Password auth, role selection, and protected routes.

### What to Build
1. Initialize all 3 repos (client, server, ai-service)
2. MongoDB Atlas cluster setup
3. Google OAuth credentials (Google Cloud Console)
4. Groq API key setup (free at console.groq.com)
5. Full auth flow: signup, login, Google OAuth, JWT, role selection
6. Basic React routing with protected routes

### Detailed Task List
```
SERVER:
- npm init, install: express, mongoose, passport, passport-google-oauth20,
  jsonwebtoken, bcryptjs, cors, dotenv, multer, cloudinary
- server.js → Express app with CORS, JSON middleware
- config/db.js → mongoose.connect()
- models/User.js → { name, email, password, googleId, role, 
  profileComplete, avatar, createdAt }
- config/passport.js → GoogleStrategy setup
- controllers/authController.js → register, login, googleCallback, getMe
- middleware/authMiddleware.js → verifyJWT
- routes/authRoutes.js → POST /register, POST /login, 
  GET /google, GET /google/callback, GET /me
- utils/generateToken.js → jwt.sign()

CLIENT:
- npm create vite@latest client -- --template react
- Install: axios, react-router-dom, zustand, tailwindcss, 
  @radix-ui/react-*, lucide-react
- src/services/api.js → axios instance with baseURL + interceptors
- store/authStore.js → { user, token, setUser, logout }
- pages/Login.jsx → email/password form + Google button
- pages/Signup.jsx → name, email, password, confirm
- components/auth/GoogleOAuthButton.jsx
- pages/Onboarding.jsx → choose role: Candidate or Recruiter
- App.jsx → React Router setup, ProtectedRoute component
```

### .env Files
```bash
# server/.env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_KEY=internal_secret_key
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# client/.env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=...

# ai-service/.env
GROQ_API_KEY=gsk_...
INTERNAL_API_KEY=internal_secret_key
```

### End of Day 1 Checkpoint
✅ Can register with email/password  
✅ Can login with Google  
✅ JWT stored in localStorage  
✅ Role selection screen shows after first login  
✅ Protected routes redirect to login if not authenticated  

---

## 🗓️ DAY 2 — AI Microservice: Resume Parser + Match Engine

### Goal
Python FastAPI service running locally. Can parse a resume PDF, extract skills, and score it against a JD.

### What to Build
```
AI-SERVICE:
- pip install fastapi uvicorn pdfplumber python-docx 
  sentence-transformers scikit-learn groq python-dotenv pydantic

- main.py → FastAPI app, include routers
- core/config.py → Settings class with env vars
- core/security.py → API key dependency
- models/schemas.py:
    ResumeText(text: str)
    JDMatchRequest(resume_text: str, jd_text: str)
    MatchResponse(score: float, matched_skills: list, 
                  missing_skills: list, explanation: str)
    AnalysisRequest(resume_text: str, jd_text: str)
    BulkRankRequest(jd_text: str, resumes: list[dict])

- services/parser.py:
    def extract_text_from_pdf(file_bytes) → str
    def extract_text_from_docx(file_bytes) → str

- services/skill_extractor.py:
    SKILLS_DB = [...500 common tech/non-tech skills...]
    def extract_skills(text: str) → list[str]

- services/embedder.py:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    def get_embedding(text: str) → np.array
    def cosine_similarity(emb1, emb2) → float

- services/matcher.py:
    def score_resume_jd(resume_text, jd_text) → dict:
        # 1. Extract skills from both
        # 2. Compute skill overlap score (40% weight)
        # 3. Compute semantic similarity via embeddings (60% weight)
        # 4. Return composite score + matched/missing skills

- api/routes/match.py:
    POST /match → JDMatchRequest → MatchResponse

- api/routes/analyze.py:
    POST /analyze/parse → upload PDF → returns extracted text + skills
```

### Groq Client Setup
```python
# services/groq_client.py
from groq import Groq
client = Groq(api_key=settings.GROQ_API_KEY)

def chat(system_prompt: str, user_prompt: str, max_tokens=1000) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=max_tokens
    )
    return response.choices[0].message.content
```

### End of Day 2 Checkpoint
✅ `POST /match` returns score 0–100 + matched/missing skills  
✅ `POST /analyze/parse` returns extracted text from uploaded PDF  
✅ All tested via Swagger UI at `localhost:8000/docs`  

---

## 🗓️ DAY 3 — Candidate Core: Resume Upload + AI Analysis

### Goal
Candidate can upload their resume, see AI-powered analysis, paste a JD, and get a full gap report.

### What to Build
```
SERVER:
- config/cloudinary.js → cloudinary v2 setup
- middleware/uploadMiddleware.js → multer memoryStorage for PDFs
- models/Resume.js → { userId, fileUrl, rawText, extractedSkills,
  uploadedAt, analysisCache }
- controllers/resumeController.js:
    uploadResume(req, res) → upload to Cloudinary → send to AI service 
                              for parsing → save to DB
    analyzeWithJD(req, res) → send resume text + JD to AI /match + /analyze
    getMyResume(req, res) → fetch user's latest resume
- routes/resumeRoutes.js → POST /upload, POST /analyze, GET /me
- services/aiProxyService.js:
    parseResume(fileBuffer, mimeType) → calls AI service /analyze/parse
    matchResumeJD(resumeText, jdText) → calls AI service /match
    getFullAnalysis(resumeText, jdText) → calls AI service /analyze/full

AI-SERVICE:
- services/analyzer.py:
    def full_analysis(resume_text, jd_text) → dict:
        Uses Groq to return JSON with:
        {
          "strengths": [...],
          "weaknesses": [...],
          "missing_skills": [...],
          "bullet_suggestions": [...],   # 3 improved bullets
          "interview_questions": [...],  # 10 questions
          "summary": "..."
        }
    
    SYSTEM PROMPT:
    "You are an expert ATS resume coach and technical recruiter. 
     Analyze the resume against the job description. 
     Return ONLY valid JSON with keys: strengths, weaknesses, 
     missing_skills, bullet_suggestions, interview_questions, summary."

- api/routes/analyze.py:
    POST /analyze/full → AnalysisRequest → full analysis dict

CLIENT:
- pages/ResumeAnalysis.jsx → main analysis page
- components/candidate/ResumeUploader.jsx:
    Drag & drop zone, file type validation (PDF/DOCX only, max 5MB)
    Upload progress indicator
    Show extracted skills as tags after upload

- components/candidate/JDPasteBox.jsx:
    Large textarea with character count
    "Analyze" button → triggers full analysis

- components/candidate/MatchScoreCard.jsx:
    Circular progress chart showing % match
    Color: red (0-40), yellow (41-70), green (71-100)
    Matched skills (green tags) vs Missing skills (red tags)

- components/candidate/SkillGapReport.jsx:
    Strengths section (checkmarks)
    Weaknesses section (warning icons)
    Missing skills with "how to add" hints

- components/candidate/BulletSuggestions.jsx:
    Before/After comparison for 3 resume bullets
    Copy button for each suggestion

- components/candidate/InterviewPrepCard.jsx:
    Accordion with 10 Q&As
    Tag each question: Technical / Behavioral / Situational

- hooks/useResume.js → uploadResume(), analyzeWithJD(), loading states
- store/resumeStore.js → { resume, analysis, setResume, setAnalysis }
```

### End of Day 3 Checkpoint
✅ Candidate uploads PDF → skills extracted and shown  
✅ Paste JD → see match score (0–100)  
✅ Skill gap report with strengths and weaknesses  
✅ 3 improved bullet suggestions  
✅ 10 interview questions generated  

---

## 🗓️ DAY 4 — Job Feed + Filters + Cover Letter

### Goal
Full job feed with all filters working. Cover letter generator. Application tracker.

### What to Build
```
SERVER:
- models/Job.js:
    {
      title, company, description, requirements, responsibilities,
      type: ['internship','full-time','part-time','contract'],
      experienceLevel: ['fresher','0-1','1-3','3-5','5+'],
      domain: String,
      location: { type, city, remote },
      salary: { min, max, currency },
      skills: [String],
      postedBy: ObjectId (recruiter),
      postedAt, deadline, isActive
    }

- controllers/jobController.js:
    getJobs(req, res):
      → query params: type, experience, domain, location, 
                      salary_min, salary_max, search, page, limit
      → MongoDB query with all filters + text search
      → return paginated results

    getJobById(req, res)
    postJob(req, res) [recruiter only]
    seedJobs(req, res) [dev only — seed 20 sample jobs]

- routes/jobRoutes.js:
    GET /jobs → with all filter query params
    GET /jobs/:id
    POST /jobs [recruiter + auth]

- models/Application.js:
    { candidateId, jobId, status: enum, appliedAt, notes, resumeVersion }
    status enum: ['saved','applied','screening','interview','offer','rejected']

- controllers/applicationController.js:
    applyToJob, updateStatus, getMyApplications, getApplicationStats

AI-SERVICE:
- services/generator.py:
    def generate_cover_letter(resume_text, jd_text, company, role) → str:
        PROMPT: "Write a professional, concise 3-paragraph cover letter 
                 for [role] at [company]. Match the tone of the JD. 
                 Use specific achievements from the resume. 
                 Do NOT use generic filler phrases."

- api/routes/generate.py:
    POST /generate/cover-letter → CoverLetterRequest → { cover_letter: str }

CLIENT:
- pages/JobFeedPage.jsx → main job browsing page
- components/jobs/FilterSidebar.jsx:
    Collapsible sections:
    [Job Type] checkboxes: Internship, Full-time, Part-time, Contract
    [Experience] radio: Fresher, 0-1 yr, 1-3 yrs, 3-5 yrs, 5+ yrs
    [Work Mode] checkboxes: Remote, Hybrid, Onsite
    [Domain] dropdown: Tech, Marketing, Finance, Design, etc.
    [Salary Range] dual slider
    [Posted] radio: Today, This week, This month
    "Clear All Filters" button

- components/jobs/JobCard.jsx:
    Company logo placeholder, title, company, location
    Salary range, experience badge, type badge
    Match score badge (if resume uploaded — show % match)
    Save button, Quick Apply button

- components/jobs/JobDetailModal.jsx:
    Full JD, requirements, responsibilities
    "Analyze with My Resume" button → goes to ResumeAnalysis with JD pre-filled
    "Generate Cover Letter" button

- components/candidate/CoverLetterModal.jsx:
    Show generated cover letter
    Edit inline (contenteditable div)
    Copy / Download as .txt

- pages/ApplicationTrackerPage.jsx:
    Kanban-style board: Saved | Applied | Interview | Offer | Rejected
    Drag cards between columns (react-beautiful-dnd)
    Each card: job title, company, date, notes field

- constants/filterOptions.js:
    export const JOB_TYPES = ['Internship', 'Full-time', 'Part-time', 'Contract']
    export const EXPERIENCE_LEVELS = ['Fresher (0 yrs)', '0–1 yr', '1–3 yrs', '3–5 yrs', '5+ yrs']
    export const DOMAINS = ['Software Engineering', 'Data Science', 'Marketing', ...]
    export const WORK_MODES = ['Remote', 'Hybrid', 'Onsite']

- hooks/useJobs.js → fetchJobs(filters), saveJob(), applyToJob()
- store/jobStore.js → { jobs, filters, setFilters, savedJobs }
```

### End of Day 4 Checkpoint
✅ Job feed loads with all filters working  
✅ Match score badge on each job card (if resume uploaded)  
✅ Cover letter generates in < 5 seconds  
✅ Application tracker with status columns  

---

## 🗓️ DAY 5 — Recruiter Side: Bulk Screening + Job Posting

### Goal
Recruiter can post jobs, upload 50 resumes, and get an AI-ranked shortlist with explanations.

### What to Build
```
SERVER:
- middleware/roleMiddleware.js:
    requireRole('recruiter') → 403 if candidate tries to access

- controllers/recruiterController.js:
    bulkScreenResumes(req, res):
      → receive: JD text + array of resume files (multipart)
      → upload all to Cloudinary
      → send to AI service /rank/bulk
      → return ranked results with scores + explanations
      → save to DB as a screening session

    getScreeningSessions(req, res)
    downloadShortlist(req, res) → generates CSV

- models/Company.js: { name, recruiter, logo, about, website }
- models/ScreeningSession.js: { recruiterId, jobId, results[], createdAt }

AI-SERVICE:
- services/ranker.py:
    def rank_resumes(jd_text: str, resumes: list[dict]) → list[dict]:
        For each resume:
          1. score_resume_jd() → match score
          2. extract_skills() → candidate skills
        Sort by score descending
        Group into clusters: Strong Match (70+), Moderate (40-70), Weak (<40)
        For top 5: generate_explanation() via Groq

    def generate_explanation(resume_text, jd_text, score) → str:
        PROMPT: "In 2 sentences, explain why this candidate scored [score]% 
                 for this role. Be specific about skills and gaps."

    def cluster_candidates(ranked_list) → dict:
        Returns { strong: [], moderate: [], weak: [] }

- api/routes/rank.py:
    POST /rank/bulk → BulkRankRequest → { ranked: [...], clusters: {...} }

CLIENT:
- pages/RecruiterDashboard.jsx:
    Welcome card with stats: Jobs Posted, Total Applicants, Avg Match Score
    Quick actions: Post Job, Screen Resumes

- pages/BulkScreening.jsx:
    Step 1: Paste JD text
    Step 2: Multi-file upload zone (up to 50 PDFs)
    Step 3: "Start Screening" → loading state with progress
    Step 4: Results view

- components/recruiter/ShortlistTable.jsx:
    Sortable table: Rank | Name | Score | Matched Skills | Missing Skills | Action
    Color-coded rows by score range
    Expand row → full explanation text
    "View Full Resume" → opens parsed resume modal
    "Download CSV" button at top

- components/recruiter/CandidateCluster.jsx:
    3 columns: Strong Match / Moderate / Weak
    Candidate cards in each column
    Skill tags visible on each card

- pages/PostJob.jsx:
    Multi-step form:
    Step 1: Basic info (title, company, type, location)
    Step 2: Requirements (experience, skills, description)
    Step 3: Compensation + deadline
    Step 4: Preview + Publish
```

### End of Day 5 Checkpoint
✅ Recruiter can post a job  
✅ Upload 50 resumes → ranked list in < 30 seconds  
✅ Cluster view: Strong / Moderate / Weak  
✅ Explanation per candidate  
✅ Download shortlist as CSV  

---

## 🗓️ DAY 6 — Analytics Dashboard + Polish + Integration

### Goal
Analytics dashboard working. All components connected end-to-end. UI polish pass.

### What to Build
```
SERVER:
- controllers/analyticsController.js:
    getSkillTrends(req, res):
      → aggregate all jobs in DB
      → count skill frequency
      → return top 20 skills per domain

    getCandidateStats(req, res):
      → total applications, avg match score, 
        score improvement over time, skills added

    getApplicationFunnel(req, res):
      → count by status for candidate

- routes/analyticsRoutes.js:
    GET /analytics/skills/trending?domain=tech
    GET /analytics/candidate/stats
    GET /analytics/candidate/funnel

CLIENT:
- pages/AnalyticsDashboard.jsx:
    Tab switcher: My Progress | Market Trends

- components/analytics/SkillTrendChart.jsx:
    Recharts BarChart → top 15 skills in selected domain
    Domain selector dropdown
    Color: trending up (green), stable (blue)

- components/analytics/KeywordCloud.jsx:
    react-wordcloud or simple CSS-based word cloud
    Size = frequency, color = category (technical/soft/tools)

- components/analytics/ApplicationFunnel.jsx:
    Recharts FunnelChart or vertical bar
    Shows: Saved → Applied → Screening → Interview → Offer

- components/analytics/ScoreTimeline.jsx:
    LineChart showing match score across sessions over time

INTEGRATION & POLISH:
- Add loading skeletons everywhere (no blank screens)
- Add toast notifications (react-hot-toast):
    Success: "Resume uploaded!", "Cover letter generated!"
    Error: "File too large", "Analysis failed, try again"
- Add empty states for all lists (beautiful illustrations or icons)
- Responsive design check (mobile-friendly layouts)
- Add Navbar with: Logo | Job Feed | Dashboard | Analytics | Profile icon
- Profile dropdown: View Profile | Settings | Logout
- Add 404 page
- Seed database with 30 sample jobs across domains
```

### End of Day 6 Checkpoint
✅ Analytics dashboard shows real data  
✅ Skill trend chart working  
✅ Toast notifications everywhere  
✅ Loading states on all async operations  
✅ Mobile-responsive layout  

---

## 🗓️ DAY 7 — Testing + Deployment + Docs

### Goal
App deployed and publicly accessible. README complete.

### Deployment Plan
```
STEP 1: Prepare for Production

client/.env.production:
  VITE_API_URL=https://hireiq-server.railway.app/api

server/.env (production):
  Add all prod values
  Set NODE_ENV=production
  Set CLIENT_URL=https://hireiq.vercel.app

STEP 2: Deploy Python AI Service → Railway
- Add Dockerfile to ai-service/
- Create railway.toml:
    [build]
    builder = "DOCKERFILE"
    [deploy]
    startCommand = "uvicorn app.main:app --host 0.0.0.0 --port 8000"
- railway up → get URL → e.g. https://hireiq-ai.railway.app

STEP 3: Deploy Node.js Server → Railway
- Add Procfile: web: node server.js
- railway up → get URL → e.g. https://hireiq-server.railway.app
- Set all env vars in Railway dashboard

STEP 4: Deploy React Client → Vercel
- vercel deploy from /client folder
- Set VITE_API_URL in Vercel env vars
- Custom domain (optional): hireiq.vercel.app

STEP 5: Update Google OAuth
- Add production callback URL in Google Cloud Console:
  https://hireiq-server.railway.app/api/auth/google/callback

STEP 6: Final Tests
- [ ] Register with email → role selection → dashboard
- [ ] Login with Google
- [ ] Upload PDF resume → see skills extracted
- [ ] Paste JD → see match score
- [ ] Browse job feed with filters
- [ ] Generate cover letter
- [ ] Track application in Kanban
- [ ] Recruiter: post job → bulk screen 5 resumes
- [ ] Analytics dashboard loads
```

### README Structure
```markdown
# HireIQ — AI Job Application Intelligence Platform
## Live Demo | Tech Stack | Architecture Diagram
## Local Setup (3 commands to run everything)
## API Documentation
## Features Overview with Screenshots
```

### End of Day 7 Checkpoint
✅ App live on public URL  
✅ All core features working in production  
✅ README with setup instructions  
✅ Architecture diagram  

---

# 🔌 COMPLETE API REFERENCE

## Auth Routes `/api/auth`
```
POST   /register          → { name, email, password } → { token, user }
POST   /login             → { email, password } → { token, user }
GET    /google            → redirect to Google
GET    /google/callback   → redirect to client with token
GET    /me                → (auth) current user
PATCH  /role              → (auth) { role: 'candidate'|'recruiter' }
```

## Resume Routes `/api/resume`
```
POST   /upload            → (auth, candidate) multipart PDF → { resume }
POST   /analyze           → (auth) { jd_text } → full analysis object
GET    /me                → (auth) current user's resume
```

## Job Routes `/api/jobs`
```
GET    /                  → ?type=&experience=&domain=&location=
                             &salary_min=&salary_max=&search=&page=&limit=
GET    /:id               → single job detail
POST   /                  → (auth, recruiter) { ...jobData }
PATCH  /:id               → (auth, recruiter, owner)
DELETE /:id               → (auth, recruiter, owner)
```

## Application Routes `/api/applications`
```
POST   /                  → (auth, candidate) { jobId }
PATCH  /:id/status        → (auth) { status }
GET    /my                → (auth, candidate) all my applications
GET    /stats             → (auth, candidate) funnel stats
```

## Recruiter Routes `/api/recruiter`
```
POST   /screen            → (auth, recruiter) multipart: jd_text + resumes[]
GET    /sessions          → (auth, recruiter) past screening sessions
GET    /sessions/:id      → (auth, recruiter) full results
GET    /sessions/:id/csv  → (auth, recruiter) CSV download
```

## Analytics Routes `/api/analytics`
```
GET    /skills/trending   → ?domain=
GET    /candidate/stats   → (auth, candidate)
GET    /candidate/funnel  → (auth, candidate)
```

## AI Service Routes (Internal, port 8000)
```
POST   /analyze/parse     → { file: bytes } → { text, skills }
POST   /analyze/full      → { resume_text, jd_text } → full analysis
POST   /match             → { resume_text, jd_text } → score + skills
POST   /generate/cover-letter → { resume_text, jd_text, company, role }
POST   /rank/bulk         → { jd_text, resumes: [{name, text}] }
```

---

# 📊 MONGODB SCHEMAS (Detailed)

```javascript
// User
{
  _id, name, email,
  password: { type: String, select: false },
  googleId: String,
  role: { type: String, enum: ['candidate', 'recruiter', null], default: null },
  avatar: String,
  profileComplete: { type: Boolean, default: false },
  createdAt: Date
}

// Resume
{
  _id, userId: ObjectId,
  fileUrl: String,        // Cloudinary URL
  fileName: String,
  rawText: String,        // extracted text
  extractedSkills: [String],
  analysisHistory: [{     // each time they analyze with a JD
    jdText: String,
    score: Number,
    analysis: Object,     // full AI response cached
    analyzedAt: Date
  }],
  uploadedAt: Date
}

// Job
{
  _id, title, company: String, companyId: ObjectId,
  description, requirements, responsibilities,
  type: { enum: ['internship','full-time','part-time','contract'] },
  experienceLevel: { enum: ['fresher','0-1','1-3','3-5','5+'] },
  domain: String,
  location: { type: { enum: ['remote','hybrid','onsite'] }, city: String },
  salary: { min: Number, max: Number, currency: { default: 'INR' } },
  skills: [String],
  postedBy: ObjectId,
  postedAt: Date, deadline: Date,
  isActive: { type: Boolean, default: true }
}

// Application
{
  _id, candidateId: ObjectId, jobId: ObjectId,
  status: { enum: ['saved','applied','screening','interview','offer','rejected'] },
  matchScore: Number,     // snapshot of score at time of application
  notes: String,
  appliedAt: Date, updatedAt: Date
}
```

---

# 🚀 POST-LAUNCH: SCALING TO PRODUCTION

> Build this AFTER your MVP is live and getting users. Roughly 1–2 months after launch.

## Phase 1: Performance (Week 1–2 after launch)
- [ ] Add Redis caching for job feed (TTL: 5 minutes)
- [ ] Add Redis for AI analysis caching (same resume+JD = cached result for 24h)
- [ ] MongoDB indexes: `jobs: [type, experience, domain, postedAt]`
- [ ] Implement cursor-based pagination instead of offset
- [ ] Add rate limiting (express-rate-limit): 100 req/15min per IP
- [ ] Move to MongoDB Atlas M10 (dedicated cluster)

## Phase 2: Reliability
- [ ] Add Sentry for error tracking (frontend + backend)
- [ ] Add health check endpoints: `GET /health`
- [ ] Implement retry logic for AI service calls (3 retries with backoff)
- [ ] Job queue for bulk screening (BullMQ + Redis) so UI doesn't hang
- [ ] Proper logging with Winston (structured JSON logs)

## Phase 3: Features That Need Scale Infrastructure
- [ ] Real-time notifications → Socket.io or Supabase Realtime
- [ ] Weekly job scraping → cron job service (Railway Cron or GitHub Actions)
- [ ] Email notifications → Resend or Postmark
- [ ] Resume version manager (store multiple resumes per user)
- [ ] LinkedIn profile import via LinkedIn OAuth

## Phase 4: Production Infrastructure
- [ ] Move from Railway to AWS/GCP:
    - EC2 or Cloud Run for Node.js + Python services
    - MongoDB Atlas → stays (managed)
    - CloudFront CDN for React build
    - S3 for resume storage (instead of Cloudinary)
- [ ] Docker Compose → Kubernetes (EKS) for auto-scaling
- [ ] Separate AI service to GPU instance for faster embeddings
- [ ] Add Pinecone instead of FAISS for vector search at scale
- [ ] CI/CD pipeline: GitHub Actions → test → build → deploy

## Phase 5: Monetization-Ready
- [ ] Add Stripe for subscription plans (Free / Pro / Recruiter)
- [ ] Feature flags (LaunchDarkly or self-built) for plan-gated features
- [ ] Usage tracking per user (AI calls, resumes, applications)
- [ ] Admin dashboard (separate internal tool)

---

# 💡 PROMPTS TO GIVE TO AI EACH DAY

When you sit down to code each day, give your AI assistant this context block:

```
I'm building HireIQ — an AI Job Application Intelligence Platform.
Stack: React + Vite + Tailwind (frontend), Node.js + Express + MongoDB (backend), 
       Python FastAPI (AI microservice), Groq API for LLM.

Today I'm working on: [DAY X TASK]

Folder structure: [paste relevant section from this plan]
Existing files done: [list what you've already built]

Generate the complete code for: [specific file name]
Follow these rules:
- Use ES modules (import/export) in Node.js
- Use async/await, never callbacks
- Return standardized responses: { success: bool, data: {}, message: "" }
- All Mongoose schemas with timestamps: true
- React components with prop-types or JSDoc comments
- Include error handling in every function
```

---

# ⏱️ DAILY TIME BREAKDOWN

| Day | Hours Needed | Hardest Part |
|-----|-------------|--------------|
| 1 | 5–6 hrs | Google OAuth setup (tricky first time) |
| 2 | 4–5 hrs | Sentence transformers + scoring logic |
| 3 | 6–7 hrs | Most features land here, biggest day |
| 4 | 5–6 hrs | Filter logic + Kanban board |
| 5 | 5–6 hrs | Multi-file upload handling |
| 6 | 4–5 hrs | Charts + polish (fun day) |
| 7 | 3–4 hrs | Deployment env var debugging |

**Total: ~33–40 hours over 7 days**

---

*Built with: MERN + Python FastAPI + Groq + Cloudinary + MongoDB Atlas*
*Deploy: Vercel (client) + Railway (server + AI)*
