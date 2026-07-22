import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * PortfolioAI v4 - "Bespoke"
 * ============================================================================
 * A chat widget that answers questions about Hariom Acharya cleanly and accurately.
 * Uses a rich multi-intent knowledge retrieval engine with verified details about
 * Hariom's background, education, projects, skills, and experience.
 * ============================================================================
 */

const HARIOM_SYSTEM_PROMPT = `
You are Bespoke, Hariom Acharya's personal AI assistant, embedded in his portfolio site.

TONE: Chill, warm, confident — like a friendly senior dev, not a corporate bot. Use emojis naturally but sparingly (0-1 per message).

ABOUT HARIOM:
Identity: Hariom Acharya, Full Stack Developer & AI/ML Engineer in Gandhinagar, Gujarat, India.
Education: B.Tech in Computer Engineering at LDRP Institute of Technology & Research (LDRP-ITR), 2023-2027. CGPA 8.64/10, semester SPI 9.29/10.
Experience: Technology Intern at NST Private Limited, Ahmedabad (May–June 2026), built EaseExpense.
Projects: EaseExpense (budget tracker), IoT-Based ML Failure Detection, PhishGuard (phishing scanner), Vox-Hire (AI mock interviews - personal favorite).
Skills: React, Next.js, TypeScript, Node.js, FastAPI, Python, PostgreSQL, Supabase, Scikit-learn, TensorFlow, AWS (studying for cert).
`;

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

// ---- Rich Multi-Intent Local Knowledge Engine ----
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

  // 1. Direct Single-Fact Quick Answers (short queries)
  const directFacts: { keywords: string[]; response: string }[] = [
    { keywords: ["spi"], response: "Hariom's latest semester SPI is 9.29/10." },
    { keywords: ["cgpa", "gpa"], response: "Hariom's cumulative CGPA is 8.64/10." },
    { keywords: ["github"], response: "github.com/HariomAcharya17" },
    { keywords: ["linkedin"], response: "linkedin.com/in/hariom" },
    { keywords: ["email", "mail", "gmail"], response: "hariomacharya2@gmail.com" },
    { keywords: ["portfolio", "website"], response: "hariomacharya.vercel.app" },
    { keywords: ["phone", "number", "mobile", "call"], response: "Phone number is kept private — feel free to email him at hariomacharya2@gmail.com!" },
    { keywords: ["location", "city", "based", "live"], response: "Hariom is based in Gandhinagar, Gujarat, India." },
    { keywords: ["degree", "branch"], response: "B.Tech in Computer Engineering." },
    { keywords: ["college", "university", "ldrp"], response: "LDRP Institute of Technology & Research (LDRP-ITR), Gandhinagar." },
    { keywords: ["graduate", "graduation", "graduating", "year"], response: "Hariom is in his final year, graduating in 2027." },
  ];

  for (const fact of directFacts) {
    if (words.some(w => fact.keywords.includes(w))) {
      if (words.length <= 4) return fact.response;
    }
  }

  // 2. Who is Hariom / About / Introduce / Bio
  const isWhoIsHariom = 
    normalized.includes("who is hariom") || 
    normalized.includes("tell me about hariom") || 
    normalized.includes("about hariom") || 
    normalized.includes("who are you") || 
    normalized.includes("tell me about yourself") || 
    normalized.includes("who is he") || 
    normalized.includes("bio") || 
    normalized.includes("background") || 
    normalized.includes("summary") || 
    normalized.includes("introduce");

  if (isWhoIsHariom) {
    return "Hariom Acharya is a Full Stack Developer & AI/ML Engineer based in Gandhinagar, Gujarat. He is in his final year of B.Tech in Computer Engineering at LDRP-ITR (CGPA 8.64, recent SPI 9.29). He recently completed a Technology Internship at NST Private Limited where he built EaseExpense, and he specializes in building intelligent systems with React, Node.js, FastAPI, Python, and AI/ML (PhishGuard, IoT Failure Prediction, Vox-Hire).";
  }

  // 3. Favorite / Hardest Project
  if (normalized.includes("favorite project") || normalized.includes("favourite project") || normalized.includes("best project")) {
    return "Hariom's personal favorite project is Vox-Hire — an AI recruitment platform with adaptive mock interviews built using React, Node.js, FastAPI, and OpenAI/Gemini APIs.";
  }
  if (normalized.includes("hardest project") || normalized.includes("difficult project") || normalized.includes("toughest project") || normalized.includes("took longest")) {
    return "His IoT-Based Machine Failure Detection System took the longest of all his projects. ESP32 hardware streaming sensor data to a Flask backend with a Scikit-learn model predicting machine RUL was challenging, but he says it was 100% worth it!";
  }

  // 4. Topic Intent Engine
  const topics = [
    {
      id: "education", 
      keywords: ["college", "university", "education", "ldrp", "degree", "btech", "b.tech", "engineering", "student", "study", "cgpa", "spi", "gpa", "marks", "grades"],
      response: "Hariom is pursuing a B.Tech in Computer Engineering at LDRP-ITR, Gandhinagar (2023–2027). He maintains a strong cumulative CGPA of 8.64/10 and achieved a 9.29/10 SPI in his latest semester."
    },
    {
      id: "experience", 
      keywords: ["internship", "experience", "nst", "job", "work", "professional", "intern", "employer", "career", "company"],
      response: "Hariom completed a Technology Internship at NST Private Limited in Ahmedabad (May–June 2026). During the internship, he developed EaseExpense (a full-stack budgeting tracker with Supabase & email alerts) and gained core networking and cybersecurity fundamentals."
    },
    {
      id: "projects", 
      keywords: ["project", "projects", "build", "built", "app", "apps", "work", "portfolio"],
      response: "Hariom has developed 4 key projects:\n1. EaseExpense — Full-stack budgeting tool (Node.js, React, Supabase).\n2. IoT Machine Failure Predictor — Hardware-to-ML system (ESP32, Flask, Scikit-learn).\n3. PhishGuard — Phishing threat scanner (FastAPI, Random Forest, VirusTotal).\n4. Vox-Hire — AI adaptive mock interview platform (React, FastAPI, Gemini/OpenAI)."
    },
    {
      id: "phishguard", 
      keywords: ["phishguard", "phish", "phishing", "threat", "security", "url", "scan", "scanner", "malicious"],
      response: "PhishGuard is a phishing URL detection platform. It uses a FastAPI backend, a Next.js frontend, VirusTotal + WHOIS intelligence, and a Random Forest classifier trained in Colab."
    },
    {
      id: "easeexpense", 
      keywords: ["easeexpense", "expense", "expenses", "budget", "budgeting", "alert", "tracker"],
      response: "EaseExpense is a full-stack expense tracker Hariom built during his internship at NST Private Limited. Features custom budgets, automated email alerts on overspend, and monthly summaries (Node.js, Express, React, PostgreSQL, Supabase)."
    },
    {
      id: "iot", 
      keywords: ["iot", "failure", "machine", "machinery", "sensor", "esp32", "flask", "rul", "predict"],
      response: "The IoT Machine Failure Detection System streams real-time sensor data from ESP32 microcontrollers to a Flask backend, where a Scikit-learn model predicts machinery failures and estimates remaining useful life (RUL)."
    },
    {
      id: "vox-hire", 
      keywords: ["vox-hire", "vox", "voxhire", "interview", "mock", "recruitment", "huggingface", "gemini"],
      response: "Vox-Hire is Hariom's AI recruitment platform providing adaptive mock interviews. Built with React + Tailwind, Node.js + FastAPI backend, and Gemini/OpenAI integration. Hindi support and coding rounds are currently being added."
    },
    {
      id: "skills", 
      keywords: ["skills", "stack", "tech", "technologies", "python", "javascript", "typescript", "react", "nextjs", "node", "fastapi", "supabase", "aws", "languages"],
      response: "Hariom's core stack includes React.js, Next.js, TypeScript, Node.js, Express, FastAPI, Python, PostgreSQL, and Supabase. For AI/ML, he uses Scikit-learn, TensorFlow, and prompt engineering with OpenAI & Gemini APIs."
    },
    {
      id: "java", 
      keywords: ["java"],
      response: "Hariom intentionally focuses on JavaScript/TypeScript and Python rather than Java. This combination covers full-stack web engineering, cloud backend, and AI/ML seamlessly in one stack."
    },
    {
      id: "certifications", 
      keywords: ["certification", "certifications", "certificate", "bootcamp", "udemy", "nptel", "course", "aws"],
      response: "Hariom holds certificates in The AI Engineer Bootcamp (Udemy), Probability & Statistics (Udemy), and Python for Data Science (NPTEL). He is currently preparing for the AWS Certified Cloud Practitioner certification."
    },
    {
      id: "hobbies", 
      keywords: ["hobbies", "interests", "swim", "swimming", "gym", "fitness", "workout", "free time"],
      response: "Outside of coding, Hariom stays active by swimming and hitting the gym regularly. He's also passionate about tech blogging and open-source contributions."
    },
    {
      id: "contact", 
      keywords: ["contact", "hire", "resume", "cv", "reach", "connect", "social", "github", "linkedin"],
      response: "You can reach Hariom at hariomacharya2@gmail.com, or check out his LinkedIn (linkedin.com/in/hariom) and GitHub (github.com/HariomAcharya17)."
    },
    {
      id: "future", 
      keywords: ["future", "plan", "plans", "goals", "goal", "ambition", "vision", "upcoming", "next"],
      response: "Hariom's goal is to master cloud architecture at scale (completing AWS Cloud Practitioner cert), launch Vox-Hire with multi-language support, dive deeper into cybersecurity, and eventually lead a technical engineering team."
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

  const isGreeting = words.some(w => ["hi", "hello", "hey", "yo", "namaste", "greetings"].includes(w));
  if (isGreeting) return "Hey there! I'm Bespoke, Hariom's AI representative. Feel free to ask me anything about his projects, skills, education, or internship at NST!";

  return "Hariom is a Full Stack Developer & AI/ML Engineer with expertise in React, FastAPI, Python, and IoT systems. Ask me about his SPI/CGPA, NST internship, projects (EaseExpense, PhishGuard, Vox-Hire), tech stack, or certifications!";
};

// ---- Idle-state animated intro with quick prompt pills ----
const TAGLINES = [
  "How can I help you?",
  "I'm here to give insight about Hariom...",
  "Ask about his skills, projects, or plans.",
  "Curious about his SPI, stack, or what's next?"
];

const SUGGESTED_PROMPTS = [
  "Who is Hariom?",
  "Tell me about his projects",
  "Skills & Tech Stack",
  "Education & SPI",
  "NST Internship"
];

function AnimatedIntro({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % TAGLINES.length);
        setVisible(true);
      }, 500);
    }, 2800);
    return () => clearInterval(cycleTimer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-6 gap-6 text-center">
      <p
        className="text-base md:text-lg font-medium text-secondary_text transition-opacity duration-500 ease-in-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {TAGLINES[index]}
      </p>

      <div className="flex flex-wrap justify-center gap-2 max-w-md">
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelectPrompt(prompt);
            }}
            className="text-xs px-3.5 py-2 rounded-full border border-border bg-layer/60 hover:bg-primary hover:text-white hover:border-primary text-foreground transition-all active:scale-95 shadow-sm font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioAI({ lightMode = true }: { lightMode?: boolean }) {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep internal scroll position attached strictly to bottom without page scrolling
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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

  const handleSendQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
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
      // Fall back to local knowledge engine
      const replyText = getLocalAIResponse(trimmed);
      setMessages(prev => [...prev, { role: 'assistant', text: replyText }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    handleSendQuery(input);
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
          <AnimatedIntro onSelectPrompt={(prompt) => handleSendQuery(prompt)} />
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
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSend();
          }}
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