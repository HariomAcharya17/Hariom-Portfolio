import { useState, useRef, useEffect } from 'react';

/**
 * PortfolioAI ("Bespoke")
 * ------------------------------------------------------------------
 * A fully local, offline "ask me about Hariom" chat widget — no API,
 * no external calls. It works by scoring the visitor's question
 * against a knowledge base of topics (each with keywords + synonyms)
 * and returning a matching response, with light context-tracking so
 * follow-ups like "what did he build there?" work naturally.
 *
 * This is NOT a general-purpose AI — it can only ever answer using
 * facts defined in KNOWLEDGE_BASE below, which is pulled directly
 * from Hariom's resume. To teach it something new, add a topic here.
 * ------------------------------------------------------------------
 */

interface Topic {
  id: string;
  keywords: string[];
  responses: string[];
  followUp?: string; // context key to set after answering, for linked follow-ups
}

// ---------------------------------------------------------------
// 1. KNOWLEDGE BASE — sourced from resume
// ---------------------------------------------------------------

const KNOWLEDGE_BASE: Topic[] = [
  // ---------- Identity / summary ----------
  {
    id: 'identity',
    keywords: ['who', 'name', 'hariom', 'acharya', 'introduce', 'about him', 'about you', 'tell me about', 'yourself', 'summary'],
    responses: [
      "Hariom Acharya is a Full Stack Developer, AI/ML Engineer, and Cloud enthusiast — currently pursuing his B.Tech in Computer Engineering at LDRP-ITR, Gandhinagar. 🚀",
      "He's a Full Stack Developer who's passionate about building real-world web applications and integrating AI into them — combining frontend, backend, and prompt engineering to ship fully working products. ✨"
    ]
  },
  // ---------- Education ----------
  {
    id: 'education',
    keywords: ['college', 'university', 'ldrp', 'itr', 'study', 'studying', 'degree', 'bachelor', 'btech', 'course', 'gandhinagar', 'computer engineering'],
    responses: [
      "He's pursuing a B.Tech in Computer Engineering at LDRP-ITR, Gandhinagar (2023 – 2027). 🎓",
      "His degree is B.Tech in Computer Engineering from LDRP Institute of Technology and Research, Gandhinagar, running 2023 to 2027."
    ]
  },
  {
    id: 'academics',
    keywords: ['spi', 'cpi', 'gpa', 'cgpa', 'grade', 'score', 'academic', 'marks', 'performance', 'semester', 'sem'],
    responses: [
      "Academically he's doing great — CGPA of 8.64/10, with a current SPI of 9.29/10. 📚",
      "His current SPI is 9.29/10, and his overall CGPA stands at 8.64/10."
    ]
  },
  // ---------- Experience / Internship ----------
  {
    id: 'experience',
    keywords: ['experience', 'intern', 'internship', 'job', 'work', 'nst', 'pvt', 'ltd', 'ahmedabad', 'technology intern', 'professional experience'],
    responses: [
      "He did a Technology Internship at NST Private Limited, Ahmedabad (May 2026 – June 2026). During it, he built EaseExpense and also picked up core networking and security concepts. 💼"
    ],
    followUp: 'easeexpense'
  },
  {
    id: 'networking',
    keywords: ['networking', 'network', 'security', 'protocol', 'data transmission', 'vulnerability', 'unauthorized access', 'interception', 'cyber security', 'cybersecurity'],
    responses: [
      "During his internship at NST Private Limited, he learned core networking and security concepts — including data transmission protocols and safeguards against vulnerabilities like unauthorized access and data interception. 🔐",
      "He's got hands-on exposure to networking and network security fundamentals, gained during his NST Private Limited internship — covering data transmission protocols and common attack safeguards."
    ]
  },
  // ---------- EaseExpense ----------
  {
    id: 'easeexpense',
    keywords: ['easeexpense', 'ease expense', 'expense', 'expenditure', 'budget', 'tracker', 'tracking'],
    responses: [
      "EaseExpense is a full-stack web application he built during his NST Private Limited internship — it lets users track monthly expenses, set custom budgets, and get automated email alerts for monthly summaries and budget overages. 📊 You can find it in the projects section!",
      "That's EaseExpense — a full-stack expense tracker built at NST Private Limited. It supports custom budgets and sends automated email alerts for monthly summaries and overspending. 💻"
    ]
  },
  // ---------- Projects (general) ----------
  {
    id: 'projects',
    keywords: ['project', 'projects', 'built', 'build', 'made', 'portfolio work', 'what have you built'],
    responses: [
      "He's built quite a range: EaseExpense (full-stack expense tracker), an IoT + ML Machine Failure Detection System, PhishGuard (a phishing detection platform), and Vox-Hire (an AI recruitment platform, currently in progress). 🛠️ Want details on any specific one?"
    ]
  },
  {
    id: 'iot_project',
    keywords: ['iot', 'machine failure', 'esp32', 'esp 32', 'sensor', 'predictive', 'rul', 'remaining useful life', 'machinery', 'flask'],
    responses: [
      "That's the IoT-Based ML Machine Failure Detection System — it monitors machinery health in real time using an ESP32 microcontroller streaming sensor data to a Flask backend, with a Scikit-learn model (trained on Kaggle data) predicting failures and remaining useful life. A React frontend visualizes it all live. ⚙️📈"
    ]
  },
  {
    id: 'phishguard',
    keywords: ['phishguard', 'phishing', 'virustotal', 'random forest', 'url detection', 'domain intelligence'],
    responses: [
      "PhishGuard is a phishing URL detection platform he built — combining VirusTotal analysis, domain intelligence, and a Random Forest classifier trained in Google Colab. It runs on a FastAPI backend with a Next.js frontend for real-time URL scanning. 🛡️"
    ]
  },
  {
    id: 'voxhire',
    keywords: ['vox', 'voxhire', 'vox-hire', 'recruitment', 'interview', 'hiring platform', 'mock interview'],
    responses: [
      "Vox-Hire is an AI-driven recruitment platform he's currently building — it runs intelligent mock interview workflows using a React + Tailwind CSS frontend and a Node.js + FastAPI backend, with AI APIs powering adaptive, conversational interviews. It's still in progress! 🎙️"
    ]
  },
  // ---------- Skills — broken down by category ----------
  {
    id: 'skills_general',
    keywords: ['skill', 'skills', 'tech stack', 'technology', 'stack', 'know', 'proficient', 'capable', 'expertise'],
    responses: [
      "He's a genuinely full-stack skill set: React.js and Tailwind CSS on the frontend, Node.js/Next.js/FastAPI on the backend, Python for AI/ML, AWS/Supabase/PostgreSQL for cloud & data, plus IoT and network security fundamentals. 💻 Want a specific area — frontend, backend, AI, or cloud?"
    ]
  },
  {
    id: 'skills_frontend',
    keywords: ['frontend', 'front-end', 'react', 'html', 'css', 'tailwind', 'ui'],
    responses: [
      "Frontend-wise, he works with HTML, CSS, Tailwind CSS, and React.js."
    ]
  },
  {
    id: 'skills_backend',
    keywords: ['backend', 'back-end', 'node', 'nodejs', 'next.js', 'nextjs', 'fastapi', 'rest api', 'api development', 'server'],
    responses: [
      "On the backend, he builds with Node.js, Next.js, FastAPI, and REST APIs."
    ]
  },
  {
    id: 'skills_languages',
    keywords: ['language', 'languages', 'programming language', 'c++', 'python', 'javascript', 'typescript', 'coding'],
    responses: [
      "His programming languages include C, C++, Python, JavaScript, TypeScript, and HTML."
    ]
  },
  {
    id: 'skills_ai',
    keywords: ['ai', 'machine learning', 'ml', 'artificial intelligence', 'scikit', 'tensorflow', 'model', 'predictive analytics', 'kaggle', 'colab', 'prompt engineering'],
    responses: [
      "On the AI/ML side: Scikit-learn, TensorFlow, machine learning models, predictive analytics, Google Colab, and Kaggle — plus prompt engineering and integration with AI APIs like OpenAI, Gemini, and HuggingFace. 🤖"
    ]
  },
  {
    id: 'skills_cloud',
    keywords: ['cloud', 'aws', 'supabase', 'postgresql', 'database', 'deployment', 'devops'],
    responses: [
      "For cloud and data, he works with AWS, Supabase, PostgreSQL, and cloud deployment workflows. ☁️"
    ]
  },
  {
    id: 'skills_tools',
    keywords: ['tools', 'vs code', 'git', 'github', 'arduino ide', 'cisco', 'packet tracer'],
    responses: [
      "Tools and platforms he uses: VS Code, Git, GitHub, Arduino IDE, Cisco Packet Tracer, and prompt engineering workflows."
    ]
  },
  {
    id: 'skills_apis',
    keywords: ['api', 'apis', 'openai', 'gemini', 'huggingface', 'integration'],
    responses: [
      "He integrates AI APIs including OpenAI API, Gemini API, and HuggingFace API into his projects."
    ]
  },
  // ---------- Certifications ----------
  {
    id: 'certifications',
    keywords: ['certification', 'certifications', 'certificate', 'certificates', 'course', 'udemy', 'nptel', 'bootcamp'],
    responses: [
      "He's completed The AI Engineer Course Bootcamp (Udemy), Probability & Statistics (Udemy), and Python for Data Science (NPTEL). 📜"
    ]
  },
  // ---------- Future goals ----------
  {
    id: 'future',
    keywords: ['future', 'goal', 'plan', 'career', 'architect', 'aspire', 'aim', 'ambition'],
    responses: [
      "His goal is to master cloud architecture, while continuing to build depth in networking and cyber security. ☁️🔐"
    ]
  },
  // ---------- Hobbies / leadership (personal, non-resume) ----------
  {
    id: 'hobbies',
    keywords: ['hobby', 'hobbies', 'swim', 'swimming', 'workout', 'gym', 'fitness', 'free time'],
    responses: [
      "Outside of tech, he enjoys swimming and is genuinely into working out. 🏊"
    ]
  },
  {
    id: 'leadership',
    keywords: ['leadership', 'leader', 'lead', 'team', 'soft skill'],
    responses: [
      "He's also known for strong leadership qualities, alongside his technical skill set."
    ]
  },
  {
    id: 'schooling',
    keywords: ['school', 'schooling', 'high school', 'junior college', 'infocity'],
    responses: [
      "He completed his schooling at Infocity Junior Science College."
    ]
  },
  // ---------- Contact ----------
  {
    id: 'contact',
    keywords: ['contact', 'email', 'mail', 'reach', 'connect', 'hire', 'phone', 'number', 'linkedin', 'github'],
    responses: [
      "You can reach him at hariomacharya2@gmail.com or +91 8130311111 — his LinkedIn and GitHub links are also on the portfolio. 🤝"
    ]
  },
  // ---------- Small talk ----------
  {
    id: 'small_talk',
    keywords: ['hi', 'hello', 'hey', 'how are you', 'what are you', 'who are you', 'why are you', 'what is this ai', 'purpose'],
    responses: [
      "Hello! 😊 I'm Bespoke — built specifically to answer questions about Hariom Acharya. Ask me about his projects, skills, internship, or education!",
      "Hi there! 👋 My whole job is to tell you about Hariom's work, skills, and background. What would you like to know?"
    ]
  }
];

const FALLBACKS = [
  "I'm dedicated specifically to answering questions about Hariom Acharya — try asking about his projects, skills, internship, or education.",
  "That's outside what I know. I can only answer questions about Hariom's background, skills, and work — feel free to ask about EaseExpense, PhishGuard, Vox-Hire, or his internship.",
  "I don't have that information. Ask me something about his technical skills, projects, or professional experience instead."
];

const GREETINGS = [
  "Hello! I'm Bespoke — ask me anything about Hariom's background, projects, skills, or internship experience.",
  "Hi there! I can answer questions about Hariom's tech stack, projects like EaseExpense and PhishGuard, or his internship at NST. What would you like to know?"
];

// ---------------------------------------------------------------
// 2. MATCHING LOGIC
// ---------------------------------------------------------------

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Normalizes text: lowercase, strips punctuation, collapses whitespace.
function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Classic Levenshtein edit distance — counts the minimum number of
// single-character insertions/deletions/substitutions to turn `a` into `b`.
// Used to tolerate typos like "intership" vs "internship".
function editDistance(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

// Returns true if `word` fuzzily matches `keyword` — either as a substring
// (fast path) or within a typo-tolerant edit distance that scales with
// word length (longer words tolerate more typos before it's a false match).
function fuzzyWordMatch(word: string, keyword: string): boolean {
  if (word.length < 3 || keyword.length < 3) return word === keyword;
  if (word.includes(keyword) || keyword.includes(word)) return true;
  const maxDistance = keyword.length <= 5 ? 1 : keyword.length <= 8 ? 2 : 3;
  return editDistance(word, keyword) <= maxDistance;
}

// Scores a topic against the question. Multi-word keywords score higher
// (they're more specific). Each keyword phrase is split into words, and
// EVERY word in that phrase must fuzzily match some word in the question
// for the phrase to count — this tolerates typos while still requiring
// multi-word keywords to be reasonably specific.
function scoreTopic(text: string, topic: Topic): number {
  const textWords = text.split(' ');
  let score = 0;
  for (const kw of topic.keywords) {
    const kwWords = kw.split(' ');
    const allWordsMatch = kwWords.every(kwWord =>
      textWords.some(tw => fuzzyWordMatch(tw, kwWord))
    );
    if (allWordsMatch) {
      score += kwWords.length;
    }
  }
  return score;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

// ---------------------------------------------------------------
// 3. UI COMPONENT
// ---------------------------------------------------------------

export default function PortfolioAI({ lightMode = true }: { lightMode?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: pickRandom(GREETINGS) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tracks the last topic discussed, so a short/vague follow-up
  // ("what did he build there?", "tell me more") can still resolve.
  const [lastTopicId, setLastTopicId] = useState<string | null>(null);
  const [pendingFollowUp, setPendingFollowUp] = useState<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const resolveResponse = (raw: string): string => {
    const text = normalize(raw);

    // Affirmative follow-up ("yes", "sure", "tell me more") after a topic
    // that has a natural next-step (e.g. internship -> EaseExpense).
    const affirmatives = ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'please', 'more', 'go on', 'tell me more'];
    if (pendingFollowUp && affirmatives.some(a => text.includes(a))) {
      const topic = KNOWLEDGE_BASE.find(t => t.id === pendingFollowUp);
      setPendingFollowUp(null);
      if (topic) {
        setLastTopicId(topic.id);
        return pickRandom(topic.responses);
      }
    }

    let bestTopic: Topic | null = null;
    let bestScore = 0;

    for (const topic of KNOWLEDGE_BASE) {
      const score = scoreTopic(text, topic);
      if (score > bestScore) {
        bestScore = score;
        bestTopic = topic;
      }
    }

    // Vague follow-ups ("what about there?", "and that?") with no strong
    // match fall back to elaborating on whatever was last discussed.
    if ((!bestTopic || bestScore === 0) && lastTopicId) {
      const vague = ['there', 'that', 'it', 'more about', 'what about'];
      if (vague.some(v => text.includes(v))) {
        const topic = KNOWLEDGE_BASE.find(t => t.id === lastTopicId);
        if (topic) bestTopic = topic;
      }
    }

    if (bestTopic && bestScore > 0) {
      setLastTopicId(bestTopic.id);
      setPendingFollowUp(bestTopic.followUp ?? null);
      return pickRandom(bestTopic.responses);
    }

    setPendingFollowUp(null);
    return pickRandom(FALLBACKS);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = resolveResponse(trimmed);
      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTyping) handleSend();
  };

  return (
    <div className="w-full max-w-md mx-auto carbon-card flex flex-col h-[480px] overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-layer flex flex-col items-center justify-center">
        <p className="text-sm font-semibold font-mono tracking-widest uppercase text-primary">
          Bespoke
        </p>
        <p className="text-xs text-secondary_text">
          Trained specifically on Hariom Acharya
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed shadow-sm ${m.role === 'user'
                ? 'bg-primary text-white rounded-br-none'
                : 'bg-layer border border-border text-foreground rounded-bl-none'
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg rounded-bl-none px-4 py-3 bg-layer border border-border text-foreground flex items-center gap-1">
              <span className="w-2 h-2 bg-secondary_text rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-secondary_text rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-secondary_text rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border flex gap-2 bg-background">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Tell me about EaseExpense..."
          disabled={isTyping}
          className="flex-1 rounded-sm px-3 py-2 text-sm outline-none border border-border bg-input text-foreground carbon-focus focus-within:border-primary transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isTyping}
          className="carbon-btn-primary disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}