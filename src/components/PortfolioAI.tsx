import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * PortfolioAI v4 - "Bespoke"
 * ============================================================================
 * A chat widget that answers questions about Hariom Acharya by calling the
 * Claude API directly (real answers, not just keyword matching). Falls back
 * to a local keyword-based responder if the API call fails for any reason
 * (network issue, rate limit, etc.) so the widget never goes silent.
 * ============================================================================
 */

const HARIOM_SYSTEM_PROMPT = `
You are Bespoke, Hariom Acharya's personal AI assistant, embedded in his portfolio site.

TONE: Chill, warm, confident — like a friendly senior dev, not a corporate bot. Use emojis naturally but sparingly (0-1 per message, not every message).

CRITICAL RULE — MATCH ANSWER LENGTH TO THE QUESTION:
This is the most important rule. Read what's actually being asked and answer exactly that, nothing more.
- If someone asks a single specific fact ("spi", "cgpa", "github link", "email", "what's his stack") — reply with ONLY that fact in a short, direct line. No backstory, no extra context, no listing unrelated things.
  Example: "spi" -> "9.29 this semester." That's it. Not his CGPA, not his degree, not his college.
  Example: "cgpa" -> "8.64/10."
  Example: "github" -> "github.com/HariomAcharya17"
- If someone asks a broader question ("tell me about his projects", "what does he do") — give a fuller but still tight answer.
- If someone says "tell me more", "explain", "how does X work", "go deeper" — now you can expand properly.
- Never pad a narrow question with information nobody asked for. Precision over volume, always.

OTHER RULES:
1. Answer directly and confidently. You know Hariom's work well — don't hedge, don't say "I think."
2. Never ask a question back unless truly necessary to understand what's being asked.
3. If something isn't in your knowledge, say so plainly in one line and move on — no over-apologizing.
4. If asked about something that could look like a weakness (e.g. "why no Java?", "why isn't X finished?"), be honest but frame it as a deliberate choice or a project still in motion — don't be defensive or evasive, just real.
5. Never share his phone number. If someone wants to reach him, point to email or LinkedIn.
6. Use his real projects as examples when explaining his skills, but only when relevant to what was asked.
7. Never use markdown formatting — no asterisks, no bold, no bullet points with *, no headers. Plain conversational text only, like a chat message. If you need to list things, use plain lines or commas, not markdown syntax.
8. For open-ended or speculative questions ("what's he building next", "what should he learn next", "is he good for a backend role") — don't just recite facts, actually reason using his skills, goals, and interests to give a real, specific answer. This is what makes you powerful — connect the dots instead of just retrieving data.

ABOUT HARIOM:

## IDENTITY
Name: Hariom Acharya
Role: Full Stack Developer | AI/ML Engineer | Cloud Enthusiast
Location: Gandhinagar, Gujarat, India
LinkedIn: linkedin.com/in/hariom
GitHub: github.com/HariomAcharya17
Email: hariomacharya2@gmail.com
Portfolio: hariomacharya.vercel.app
(Phone number is private — don't share it, direct people to email instead)

## EDUCATION
B.Tech in Computer Engineering, LDRP Institute of Technology & Research (LDRP-ITR), Gandhinagar. 2023–2027, final year. CGPA 8.64/10, current semester SPI 9.29/10.

## EXPERIENCE
Just wrapped up a Technology Internship at NST Private Limited, Ahmedabad (May–June 2026), where he built EaseExpense and picked up core networking & security fundamentals. Currently open to new opportunities and collaborations.

## PROJECTS
1. EaseExpense — Full-stack expense tracker built during the NST internship. Custom budgets, automated email alerts on overspend, monthly summaries. Stack: Node.js, Express, React, PostgreSQL, Supabase. Completed.

2. IoT-Based ML Machine Failure Detection System — Real-time machinery health monitoring: ESP32 streams sensor data to a Flask backend, a Scikit-learn model predicts failures and estimates remaining useful life, React dashboard shows it live. Trained on Kaggle datasets. Completed & deployed. No live demo (hardware project), but the code is on his GitHub. This one took him the longest of all his projects — but he says it was worth every hour.

3. PhishGuard — Phishing URL detection platform. FastAPI backend, Next.js frontend, VirusTotal + WHOIS intelligence, Random Forest classifier trained in Colab. Completed. (Live link coming soon — check GitHub for now.)

4. Vox-Hire — AI recruitment platform with adaptive mock interviews. React + Tailwind frontend, Node.js + FastAPI backend, OpenAI/Gemini/HuggingFace APIs. Hindi language support and coding-round access planned. Still in progress — and honestly his personal favorite project of the four, even unfinished.

If asked which project is his favorite: Vox-Hire, hands down — even though it's still in progress. If asked which was hardest / took the most time: the IoT failure detection system.

## SKILLS
Frontend: HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS.
Backend: Node.js, Express.js, FastAPI, Python. Databases: PostgreSQL, Supabase.
Languages he's proficient in: C, C++, Python, JavaScript, TypeScript. He intentionally hasn't invested in Java — doubling down on the JS/Python combo instead, since it covers full-stack plus AI/ML in one stack.
AI/ML: Scikit-learn, TensorFlow, NumPy, Pandas. Comfortable training/evaluating/deploying models via Colab & Kaggle. Strong at prompt engineering and integrating OpenAI/Gemini/HuggingFace APIs.
Cloud/DevOps: AWS (studying for Cloud Practitioner cert), Supabase, Vercel deployments, basic Docker.
Tools: Git/GitHub, VS Code, Postman, Arduino IDE/ESP32, Cisco Packet Tracer.

## CERTIFICATIONS
- The AI Engineer Course Bootcamp (Udemy) — done
- Probability & Statistics (Udemy) — done
- Python for Data Science (NPTEL) — done
- AWS Certified Cloud Practitioner — currently studying via AWS Skill Builder

## GOALS & UPCOMING PLANS
Mastering cloud architecture at scale (finishing the AWS Cloud Practitioner cert soon), going deeper into networking/cybersecurity, shipping more AI-integrated full-stack products, finishing and launching Vox-Hire with Hindi language support and a coding-round module, contributing to open source, and eventually leading a technical team.

## PERSONALITY & INTERESTS
Chill, easygoing, but focused when building. Swims and hits the gym regularly. Into tech blogging and open source (planning to contribute more). Cares about building things that actually solve real problems, not just resume projects.
`;

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

// ---- Local fallback responder (used only if the live API call fails) ----
const getLocalAIResponse = (query: string): string => {
  const normalized = query.toLowerCase().replace(/[?,.!:;()]/g, " ").trim();
  const words = normalized.split(/\s+/).filter(Boolean);

  const getLevenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= a.length; i++) matrix[i] = [i];
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
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

  // Narrow, single-fact queries -> short direct answers, nothing extra
  const directFacts: { keywords: string[]; response: string }[] = [
    { keywords: ["spi"], response: "9.29 this semester." },
    { keywords: ["cgpa", "gpa"], response: "8.64/10 cumulative." },
    { keywords: ["github"], response: "github.com/HariomAcharya17" },
    { keywords: ["linkedin"], response: "linkedin.com/in/hariom" },
    { keywords: ["email", "mail", "gmail"], response: "hariomacharya2@gmail.com" },
    { keywords: ["portfolio", "website"], response: "hariomacharya.vercel.app" },
    { keywords: ["phone", "number", "mobile", "call"], response: "That's private — email's the best way to reach him: hariomacharya2@gmail.com" },
    { keywords: ["location", "city", "based", "live"], response: "Gandhinagar, Gujarat, India." },
    { keywords: ["degree", "branch"], response: "B.Tech in Computer Engineering." },
    { keywords: ["college", "university", "ldrp"], response: "LDRP Institute of Technology & Research, Gandhinagar." },
    { keywords: ["graduate", "graduation", "graduating", "year"], response: "2027 — currently in final year." },
  ];

  for (const fact of directFacts) {
    if (words.some(w => fact.keywords.includes(w))) {
      // only treat as a narrow query if the message is short (not a broader sentence)
      if (words.length <= 4) return fact.response;
    }
  }

  const topics = [
    {
      id: "education", keywords: ["college", "university", "education", "ldrp", "school", "degree", "btech", "b.tech", "engineering", "student"],
      response: "B.Tech in Computer Engineering at LDRP-ITR, Gandhinagar — final year, graduating 2027."
    },
    {
      id: "experience", keywords: ["internship", "experience", "nst", "job", "work", "professional", "intern", "employer", "career"],
      response: "Just wrapped up a Tech Internship at NST Private Limited, where he built EaseExpense and picked up networking & security fundamentals. Open to new opportunities now."
    },
    {
      id: "projects", keywords: ["project", "projects", "build", "built", "app", "apps", "code"],
      response: "Main projects: PhishGuard (phishing detector), EaseExpense (budget tracker), an IoT failure predictor, and Vox-Hire (AI mock interviews). Ask about any one."
    },
    {
      id: "phishguard", keywords: ["phishguard", "phish", "phishing", "threat", "security", "url", "scan", "scanner", "malicious"],
      response: "PhishGuard scans URLs for phishing threats — FastAPI backend, Random Forest classifier, VirusTotal + WHOIS intel. Live link's coming soon, code's on GitHub."
    },
    {
      id: "easeexpense", keywords: ["easeexpense", "expense", "expenses", "budget", "budgeting", "alert", "tracker"],
      response: "EaseExpense is the full-stack budgeting app from his NST internship — custom budgets, email alerts, monthly summaries. Node.js, React, Supabase."
    },
    {
      id: "iot", keywords: ["iot", "failure", "machine", "machinery", "sensor", "esp32", "flask", "rul", "predict"],
      response: "ESP32 streams sensor data to a Flask backend, and a Scikit-learn model predicts machine failures and remaining useful life. Took him the longest of all his projects, but totally worth it."
    },
    {
      id: "vox-hire", keywords: ["vox-hire", "vox", "voxhire", "interview", "mock", "recruitment", "huggingface", "gemini"],
      response: "Vox-Hire is his AI mock interview platform — React + FastAPI, OpenAI/Gemini for adaptive interviews. Still in progress, but it's his personal favorite project."
    },
    {
      id: "skills", keywords: ["skills", "stack", "tech", "technologies", "python", "javascript", "typescript", "react", "nextjs", "node", "fastapi", "supabase", "aws"],
      response: "Core stack: React, Next.js, FastAPI, Node.js, PostgreSQL, Supabase — plus Python for AI/ML work."
    },
    {
      id: "java", keywords: ["java"],
      response: "No Java — he's doubled down on JS/Python instead, which covers full-stack speed and AI/ML in one combo."
    },
    {
      id: "certifications", keywords: ["certification", "certifications", "certificate", "bootcamp", "udemy", "nptel", "course"],
      response: "AI Engineer Bootcamp and Probability & Stats (Udemy), Python for Data Science (NPTEL) — done. Currently studying for AWS Cloud Practitioner."
    },
    {
      id: "hobbies", keywords: ["hobbies", "interests", "swim", "swimming", "gym", "fitness", "workout"],
      response: "Swims and hits the gym regularly to stay balanced outside of coding. Into tech blogging too."
    },
    {
      id: "contact", keywords: ["contact", "hire", "resume", "cv", "reach", "connect"],
      response: "Best way to reach him is hariomacharya2@gmail.com, or check LinkedIn/GitHub linked on the portfolio."
    },
    {
      id: "future", keywords: ["future", "plan", "plans", "goals", "goal", "ambition", "vision", "upcoming", "next"],
      response: "Finishing the AWS Cloud Practitioner cert, launching Vox-Hire with Hindi support, going deeper into cybersecurity, and eventually leading a dev team."
    },
  ];

  let bestMatch = null;
  let maxScore = 0;
  for (const topic of topics) {
    let score = 0;
    for (const word of words) if (topic.keywords.includes(word)) score += 5;
    for (const kw of topic.keywords) {
      for (const word of words) {
        if (word.length >= 3) {
          if (kw.includes(word) || word.includes(kw)) score += 2;
          const dist = getLevenshteinDistance(word, kw);
          const maxAllowedDist = kw.length <= 4 ? 1 : 2;
          if (dist <= maxAllowedDist) score += 3.5;
        }
      }
    }
    if (score > maxScore) { maxScore = score; bestMatch = topic; }
  }
  if (maxScore > 0 && bestMatch) return bestMatch.response;

  const isGreeting = words.some(w => ["hi", "hello", "hey", "yo"].includes(w));
  if (isGreeting) return "I'm Bespoke, Hariom's AI rep. Ask me about his projects, skills, education, or how to reach him.";

  return "I've got the full picture on Hariom — his SPI/CGPA, the NST internship, projects (PhishGuard, EaseExpense, IoT detector, Vox-Hire), tech stack, and certifications. Try asking about any of those.";
};

// ---- Idle-state animated tagline (fade in/out loop, shown until first message) ----
const TAGLINES = [
  "How can I help you?",
  "I'm here to give insight about Hariom...",
  "Ask about his skills, projects, or plans.",
  "Curious about his SPI, stack, or what's next?"
];

function AnimatedIntro() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % TAGLINES.length);
        setVisible(true);
      }, 500); // matches CSS transition duration below
    }, 2800);
    return () => clearInterval(cycleTimer);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <p
        className="text-base md:text-lg font-medium text-secondary_text text-center transition-opacity duration-500 ease-in-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {TAGLINES[index]}
      </p>
    </div>
  );
}

export default function PortfolioAI({ lightMode = true }: { lightMode?: boolean }) {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([]);
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
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages]);

  const callClaude = async (history: Message[]): Promise<string> => {
    const apiMessages = history.map(m => ({
      role: m.role,
      content: m.text
    }));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: HARIOM_SYSTEM_PROMPT,
        messages: apiMessages
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = (data.content || [])
      .map((block: any) => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("\n")
      .trim();

    if (!text) throw new Error("Empty response");
    return text;
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', text: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const replyText = await callClaude(nextMessages);
      setMessages(prev => [...prev, { role: 'assistant', text: replyText }]);
    } catch (err) {
      // Fall back to local keyword responder if the live call fails
      const replyText = getLocalAIResponse(trimmed);
      setMessages(prev => [...prev, { role: 'assistant', text: replyText }]);
    } finally {
      setIsLoading(false);
    }
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
            {isMobile ? "bespoke.sh" : "bespoke_assistant.sh"}
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
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-5 space-y-4 bg-layer/30 flex flex-col">
        {messages.length === 0 && !isLoading ? (
          <AnimatedIntro />
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
          </>
        )}
      </div>

      {/* Input */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-t border-border bg-layer flex gap-2 md:gap-3">
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
          className="px-4 md:px-6 py-2.5 md:py-3 bg-primary text-white rounded-2xl font-semibold text-sm hover:bg-primary/90 disabled:bg-border disabled:text-secondary_text transition-all active:scale-95 shadow-md flex items-center gap-2"
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