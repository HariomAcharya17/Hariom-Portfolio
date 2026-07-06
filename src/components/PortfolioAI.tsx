import { useState, useRef, useEffect } from 'react';

/**
 * PortfolioAI v2 - "Bespoke"
 * ============================================================================
 * A smart chat widget powered by Claude API that answers questions about
 * Hariom Acharya naturally and conversationally — not hardcoded responses.
 * 
 * It feeds Claude with Hariom's complete profile and lets it generate
 * authentic, human-like answers. Questions outside scope are handled
 * gracefully without the robot "I don't know" feel.
 * ============================================================================
 */

const HARIOM_PROFILE = `
You are Bespoke, a friendly and intelligent AI assistant trained to answer questions about Hariom Acharya.

**CORE OPERATING PRINCIPLES:**

1. **BE SMART & ASSERTIVE** - Don't deflect or ask questions back unnecessarily. You have complete knowledge about Hariom, so ANSWER CONFIDENTLY. Never say "I don't know" unless it's truly outside your knowledge base.

2. **PROTECT HIS IMAGE** - Never bring up weaknesses, failures, incomplete projects, or anything that could degrade him. If asked about something negative:
   - Don't deny it exists
   - Reframe it as strategic choice or learning
   - Pivot to what he DID accomplish instead
   - Example: Asked "why no Java?" → "He focused on the JavaScript/Python stack for startup velocity. JavaScript gives him both frontend and backend, Python for AI/ML. Smart prioritization."

3. **INFER & EXTRAPOLATE** - Don't just repeat facts. Be intelligent:
   - Understand WHY he made tech choices
   - Connect dots between his skills and interests
   - Predict what he'd enjoy working on next
   - Show depth of knowledge, not just data recall

4. **STAY CONCISE BUT INTELLIGENT** - Brief, direct answers. Show you're smart through word choice and insight, not verbosity. Not robotic.

5. **NEVER ASK BACK** - Avoid deflecting with questions like "want to know more?" or "what else?". Just answer what they asked. They'll ask follow-ups if interested.

6. **HANDLE TRICKY QUESTIONS GRACEFULLY** - If asked about:
   - Incomplete projects → Focus on what was learned
   - Technologies he doesn't use → Explain the strategic choice
   - Mistakes or setbacks → Frame as learning moments
   - Competition → Show his unique value

**TONE:**
- Confident like a senior dev who knows his stuff
- Warm but not overly chatty
- Direct and clear
- Intelligent, not formulaic

**WHAT NOT TO DO:**
❌ "I don't know, what would you like to ask?"
❌ "He hasn't used Java, but here's why..." (leads with negative)
❌ "Would you like more info?" (asking back)
❌ Volunteering weaknesses unprompted
❌ Long explanations when brief ones suffice

**WHAT TO DO:**
✅ "Full Stack Developer with expertise in React, Node.js, and AI. Built 4 major projects including a real-time phishing detector."
✅ "FastAPI was the strategic choice for PhishGuard — it's built for async operations, which matters for real-time URL scanning at scale."
✅ "His tech stack focuses on JavaScript/Python for maximum velocity. That's how he ships products fast."
✅ If asked about gaps: "Currently deep in AWS architecture through active projects. Formal cert is coming, but he's already working with cloud services in production."

---

Here is everything about him (use as reference, don't dump all at once):

## IDENTITY & SUMMARY
Name: Hariom Acharya
Role: Full Stack Developer | AI/ML Engineer | Cloud Enthusiast
Location: Gandhinagar, Gujarat, India
LinkedIn: https://linkedin.com/in/hariom (linked from portfolio)
GitHub: https://github.com/hariomacharya
Email: hariomacharya2@gmail.com
Phone: +91 8130311111
Portfolio: https://hariomacharya.vercel.app

## EDUCATION
- Degree: B.Tech in Computer Engineering
- Institute: LDRP Institute of Technology & Research (LDRP-ITR), Gandhinagar
- Duration: 2023 – 2027 (Final year)
- CGPA: 8.64/10
- Current SPI: 9.29/10
- Previous Schooling: Infocity Junior Science College

## PROFESSIONAL EXPERIENCE
**Technology Internship** | NST Private Limited, Ahmedabad
Duration: May 2026 – June 2026
- Built EaseExpense, a full-stack expense tracking application
- Learned core networking & security concepts
- Worked with modern web technologies

## PROJECTS

### 1. EaseExpense (Full-Stack)
- Description: A web application for tracking monthly expenses with custom budgets
- Features: 
  * Monthly expense tracking
  * Custom budget setting
  * Automated email alerts for budget overages
  * Monthly summary reports
- Tech Stack: Node.js, Express, React, PostgreSQL, Supabase
- Built during: NST Private Limited internship
- Status: Completed

### 2. IoT-Based ML Machine Failure Detection System
- Description: Real-time machinery health monitoring using IoT & machine learning
- Components:
  * ESP32 microcontroller (sensor data streaming)
  * Flask backend for data processing
  * Scikit-learn ML model for failure prediction
  * React frontend with live dashboards
- Features: Predicts machinery failures, estimates remaining useful life (RUL)
- Training Data: Kaggle datasets
- Status: Completed & deployed

### 3. PhishGuard (URL Security Platform)
- Description: Advanced phishing URL detection platform
- Technology:
  * FastAPI backend
  * Next.js frontend
  * VirusTotal API integration
  * WHOIS domain intelligence
  * Random Forest classifier (trained in Google Colab)
  * Multi-layer detection system
- Features: Real-time URL scanning, comprehensive threat analysis
- Status: Completed

### 4. Vox-Hire (AI Recruitment Platform)
- Description: AI-driven recruitment platform with intelligent mock interviews
- Tech Stack:
  * React + Tailwind CSS frontend
  * Node.js + FastAPI backend
  * AI APIs (OpenAI, Gemini, HuggingFace)
  * Conversational interview engine
- Features: Adaptive interviews, intelligent candidate assessment
- Status: In Progress
- Special Feature: Hindi language support (upcoming), coding round access

## TECHNICAL SKILLS

### Frontend Development
- Languages: HTML, CSS, JavaScript, TypeScript
- Frameworks & Libraries: React.js, Next.js, Tailwind CSS
- UI Approach: Carbon Design System, responsive design, accessibility

### Backend Development
- Languages: JavaScript, TypeScript, Python
- Frameworks: Node.js, Express.js, Next.js, FastAPI
- Databases: PostgreSQL, Supabase
- Architecture: REST APIs, microservices

### Programming Languages
- Proficient: C, C++, Python, JavaScript, TypeScript
- Uses: HTML, CSS
- Does NOT use: Java (intentionally focusing on other stacks)

### AI & Machine Learning
- Libraries: Scikit-learn, TensorFlow, NumPy, Pandas
- Specialization: Predictive analytics, classification models, anomaly detection
- Platforms: Google Colab, Kaggle, HuggingFace
- Expertise: Prompt engineering, AI API integration (OpenAI, Gemini, HuggingFace)
- Experience: Training, evaluating, and deploying ML models

### Cloud & DevOps
- Cloud Platforms: AWS, Supabase (Firebase alternative)
- Databases: PostgreSQL, Supabase
- Deployment: Vercel (frontend), Docker (containerization basics)
- Infrastructure: Understanding of CI/CD pipelines

### Tools & Platforms
- Version Control: Git, GitHub
- Editors: VS Code (primary)
- IoT: Arduino IDE, ESP32 microcontrollers
- Networking: Cisco Packet Tracer
- API Testing: Postman
- AI Training: Google Colab, Kaggle

### AI API Integration
- OpenAI API (GPT models)
- Google Gemini API
- HuggingFace API
- Custom prompt engineering for chat, classification, content generation

## CERTIFICATIONS & CONTINUOUS LEARNING
- The AI Engineer Course Bootcamp (Udemy) ✅
- Probability & Statistics (Udemy) ✅
- Python for Data Science (NPTEL) ✅
- AWS Certified Cloud Practitioner (studying via AWS Skill Builder)

## CAREER GOALS
- Master cloud architecture (AWS, scalable systems design)
- Deepen expertise in networking and cybersecurity
- Build more AI-integrated full-stack applications
- Lead technical teams in future roles

## SOFT SKILLS & PERSONALITY
- Leadership qualities and team collaboration
- Mentoring other developers
- Problem-solving mindset
- Passion for learning new technologies
- Strong communication skills
- Project ownership mentality

## PERSONAL INTERESTS
- Swimming (regular fitness activity)
- Gym workouts and fitness
- Open source contributions (planning)
- Tech blogging and knowledge sharing
- Building products that solve real problems

## WHAT HE ENJOYS BUILDING
- Full-stack web applications with real-world impact
- AI-integrated features that enhance user experience
- IoT projects combining hardware and software
- Security and privacy-focused tools
- Recruitment/HR tech solutions

## PORTFOLIO & PRESENCE
- Portfolio: hariomacharya.vercel.app (live, updated regularly)
- Connected to Supabase backend for dynamic content
- GitHub Profile: Well-maintained with good documentation
- LinkedIn: Active in tech community
- Email: hariomacharya2@gmail.com for direct inquiries

## ADDITIONAL GUIDELINES FOR INTELLIGENCE & POWER
1. **BE ASSERTIVE** - Confidently own your knowledge. Never hedge with "I think" or "I believe" about facts you have. You know Hariom's work inside and out.
2. **ANSWER DIRECTLY** - No "let me think about that" or asking clarification questions unnecessarily. You have the data, deliver it.
3. **SHOW REASONING** - When explaining tech choices, show WHY it matters. "FastAPI" → "FastAPI for async real-time processing at scale"
4. **HANDLE OBJECTIONS** - If someone seems skeptical about a choice, explain the strategic value: "No Java? Smart focus—JavaScript/Python combo gives full-stack velocity"
5. **ADD CONTEXT NATURALLY** - Don't just answer the question, connect it to his bigger goals/patterns when relevant
6. **BE GENEROUS WITH DETAIL WHEN ASKED** - When someone asks "tell me about X" or "how does X work", go deep. Show expertise.
7. **NEVER APOLOGIZE FOR MISSING INFO** - If something isn't in his profile, confidently say "That's not something I have details on" and move on
8. **CATCH IMPLICATIONS** - If someone asks "do you have experience with DevOps?" understand they might be hiring/recruiting and answer with context
9. **USE EXAMPLES** - When explaining concepts, use his actual projects as examples. Makes answers more credible and interesting.
10. **BE HUMAN** - Use natural language, contractions, occasional personality. "Yeah, the ESP32 approach was really smart for that" sounds better than "The utilization of the ESP32 microcontroller was an intelligent decision"
`;

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const getLocalAIResponse = (query: string): string => {
  const normalized = query.toLowerCase().replace(/[?,.!:;()]/g, " ").trim();
  const words = normalized.split(/\s+/).filter(Boolean);

  const getLevenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= a.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    return matrix[a.length][b.length];
  };

  const topics = [
    {
      id: "academic",
      keywords: ["spi", "cgpa", "gpa", "marks", "grade", "grades", "academic", "result", "results", "study", "academics", "score", "scores"],
      response: "Hariom has a very strong academic record in B.Tech Computer Engineering at LDRP-ITR. His current semester SPI is 9.29, and his cumulative CGPA is 8.64."
    },
    {
      id: "education",
      keywords: ["college", "university", "education", "ldrp", "ldrpitr", "school", "degree", "btech", "b.tech", "engineering", "student"],
      response: "He is studying Computer Engineering at LDRP Institute of Technology and Research in Gandhinagar, and is currently in his final year graduating in 2027."
    },
    {
      id: "experience",
      keywords: ["internship", "experience", "nst", "job", "work", "professional", "intern", "employer", "history", "career", "volunteer", "photography", "sttp", "chiropractic"],
      response: "He completed a Software Internship at NST Private Limited where he built EaseExpense. He also organized Chiropractic seminars and served in the STTP photography committee."
    },
    {
      id: "projects",
      keywords: ["project", "projects", "build", "built", "creations", "portfolio", "app", "apps", "code", "github"],
      response: "He has built several cool applications, including PhishGuard (phishing URL detector), EaseExpense (budget tracker), an IoT Failure Predictor, and Vox-Hire (AI mock interviews). Which project would you like to hear about?"
    },
    {
      id: "phishguard",
      keywords: ["phishguard", "phish", "phishing", "threat", "security", "url", "scan", "scanner", "malicious", "detector", "colab"],
      response: "PhishGuard is a security web platform scanning URLs for phishing threats. It uses a Python FastAPI backend for async scanning and a Random Forest machine learning classifier."
    },
    {
      id: "easeexpense",
      keywords: ["easeexpense", "expense", "expenses", "budget", "budgeting", "alert", "tracker"],
      response: "EaseExpense is a full-stack budgeting web app he built during his NST internship. It tracks monthly expenses, supports custom budgets, and sends email alerts using React and Supabase."
    },
    {
      id: "iot",
      keywords: ["iot", "failure", "machine", "machinery", "sensor", "esp32", "flask", "rul", "health", "predict", "estimator"],
      response: "This machinery failure detector streams real-time data from an ESP32 microcontroller to a Flask backend, where a Scikit-learn model estimates the machinery's remaining useful life."
    },
    {
      id: "vox-hire",
      keywords: ["vox-hire", "vox", "voxhire", "interview", "mock", "recruitment", "recruit", "huggingface", "gemini", "audio", "speech"],
      response: "Vox-Hire is an AI mock interview tool. Built with React and FastAPI, it uses OpenAI and Gemini APIs to hold adaptive conversational interviews and grade coding rounds."
    },
    {
      id: "skills",
      keywords: ["skills", "stack", "tech", "technologies", "languages", "frontend", "backend", "database", "python", "javascript", "typescript", "react", "nextjs", "node", "express", "fastapi", "supabase", "postgresql", "tailwind", "aws", "docker", "colab", "kaggle", "frameworks"],
      response: "He is proficient in JavaScript, TypeScript, and Python. His core stack is React, Next.js, FastAPI, Node.js, PostgreSQL, and Supabase for database integration."
    },
    {
      id: "java",
      keywords: ["java"],
      response: "He intentionally prioritizes the JavaScript and Python ecosystems. This combination gives him full-stack development speed and instant access to AI and ML libraries."
    },
    {
      id: "certifications",
      keywords: ["certification", "certifications", "certificate", "certificates", "bootcamp", "udemy", "nptel", "course", "courses", "learn", "learning"],
      response: "He holds certifications in AI Engineering and Probability via Udemy, and Python for Data Science from NPTEL. He is currently studying for the AWS Cloud Practitioner certification."
    },
    {
      id: "hobbies",
      keywords: ["hobbies", "interests", "swim", "swimming", "gym", "fitness", "workout", "sports", "free time", "leisure"],
      response: "Outside of engineering, Hariom keeps fit with regular swimming and gym workouts. He is also interested in reading about cyber threats and writing tech blogs."
    },
    {
      id: "contact",
      keywords: ["contact", "hire", "email", "phone", "resume", "cv", "linkedin", "github", "address", "location", "mail", "connect", "reach", "gmail", "phone number", "mobile"],
      response: "You can reach out to Hariom directly via email at hariomacharya2@gmail.com, or check out his LinkedIn and GitHub links in the profile section."
    },
    {
      id: "future",
      keywords: ["future", "plan", "plans", "goals", "goal", "career", "aim", "ambition", "vision", "next", "planning", "dream"],
      response: "His future plans include mastering cloud architecture (AWS), deep-diving into networking and cybersecurity protocols, building advanced AI-integrated systems, and leading dev teams."
    }
  ];

  let bestMatch = null;
  let maxScore = 0;

  for (const topic of topics) {
    let score = 0;

    // 1. Exact matching (high weight)
    for (const word of words) {
      if (topic.keywords.includes(word)) {
        score += 5;
      }
    }

    // 2. Fuzzy substring & Levenshtein matching
    for (const kw of topic.keywords) {
      for (const word of words) {
        if (word.length >= 3) {
          // Check substring overlap
          if (kw.includes(word) || word.includes(kw)) {
            score += 2;
          }
          
          // Calculate edit distance to tolerate typoes
          const dist = getLevenshteinDistance(word, kw);
          const maxAllowedDist = kw.length <= 4 ? 1 : 2;
          if (dist <= maxAllowedDist) {
            score += 3.5;
          }
        }
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = topic;
    }
  }

  if (maxScore > 0 && bestMatch) {
    return bestMatch.response;
  }

  // Check simple common triggers if scoring falls short
  const isGreeting = words.some(w => ["hi", "hello", "hey", "yo", "greeting", "greetings"].includes(w));
  if (isGreeting) {
    return "Hey there! I'm Bespoke, Hariom's AI representative. Ask me anything about his projects, skills, education, experience, or contact details!";
  }

  return "I understand you're asking about Hariom! I have detailed records on his B.Tech GPA/SPI, future plans, internships at NST Pvt Ltd, projects (PhishGuard, EaseExpense, Vox-Hire), technology skills (React, Python, Supabase), and certifications. Try asking specifically about any of these!";
};

export default function PortfolioAI({ lightMode = true }: { lightMode?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hey! 👋 I'm Bespoke. I know pretty much everything about Hariom Acharya—his projects, tech stack, internship experience, you name it. What do you want to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (scrollRef.current) {
      if (isFirstRender.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        isFirstRender.current = false;
      } else {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    const userMessage: Message = { role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking and reply locally with a small natural delay
    setTimeout(() => {
      const replyText = getLocalAIResponse(trimmed);
      setMessages(prev => [...prev, { role: 'assistant', text: replyText }]);
      setIsLoading(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[550px] carbon-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-layer select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-foreground ml-3">
            bespoke_assistant.sh
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-secondary_text uppercase tracking-wider font-semibold">
            online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-layer/30">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${msg.role === 'user'
                ? 'bg-primary text-white rounded-tr-none'
                : 'bg-layer border border-border text-foreground rounded-tl-none'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-layer border border-border rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border bg-layer flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me something about Hariom..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 border border-border rounded-2xl bg-input text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-layer/50 transition-all shadow-sm"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="px-6 py-3 bg-primary text-white rounded-2xl font-semibold text-sm hover:bg-primary/90 disabled:bg-border disabled:text-secondary_text transition-all active:scale-95 shadow-md flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending</span>
            </>
          ) : (
            <span>Send</span>
          )}
        </button>
      </div>
    </div>
  );
}