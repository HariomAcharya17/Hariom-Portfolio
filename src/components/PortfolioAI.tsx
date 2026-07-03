import { useState, useRef, useEffect } from 'react';

// ---------------------------------------------------------------
// 1. KNOWLEDGE BASE — edit this to update what the assistant knows
// ---------------------------------------------------------------

interface Topic {
  id: string;
  keywords: string[];
  responses: string[];
}

const KNOWLEDGE_BASE: Topic[] = [
  {
    id: 'identity',
    keywords: ['who', 'name', 'hariom', 'acharya', 'introduce', 'about him', 'tell me about', 'yourself'],
    responses: [
      "Hello there! 👋 Hariom Acharya is a highly motivated pre-final year Computer Science student at LDRP-ITR. He loves building full-stack applications and AI-driven tools! ✨",
      "Hey! 😊 He's Hariom Acharya, an enthusiastic 7th-semester engineering student who turns complex problems into elegant software solutions. 🚀"
    ]
  },
  {
    id: 'experience',
    keywords: ['experience', 'intern', 'internship', 'job', 'work', 'nst', 'pvt', 'ltd'],
    responses: [
      "Hariom just successfully completed an awesome internship at NST PVT LTD as a Software Engineering Intern! 💼 Would you like to know what he built there? 😉"
    ]
  },
  {
    id: 'academics',
    keywords: ['spi', 'cpi', 'gpa', 'grade', 'score', 'academic', 'marks', 'performance', 'semester', 'sem'],
    responses: [
      "Academically, Hariom is absolutely crushing it! 📚 His current SPI is an impressive 9.29, with an overall CPI of 8.64! 🌟"
    ]
  },
  {
    id: 'education',
    keywords: ['college', 'university', 'ldrp', 'itr', 'study', 'studying', 'degree', 'bachelor', 'course'],
    responses: [
      "He is proudly pursuing his Bachelor's degree at LDRP Institute of Technology and Research, currently thriving in his 7th semester! 🎓"
    ]
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'built', 'build', 'made', 'portfolio', 'work'],
    responses: [
      "Hariom has built an incredible array of projects! 🛠️ From a full-stack DevOps CI/CD pipeline, an AI Resume Analyzer, to a deeply integrated IoT Smart Home system using ESP32. He's always building something amazing! 💡 Which project would you like to hear more about?"
    ]
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'tech', 'technology', 'stack', 'know', 'language', 'framework', 'tools'],
    responses: [
      "Hariom's tech stack is super versatile! 💻 He is highly skilled in React, Next.js, Node.js, and TypeScript on the web front. He also works with Python for AI models, and knows his way around cloud computing with AWS and Docker. ☁️ A true full-stack powerhouse!"
    ]
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'mail', 'reach', 'connect', 'hire'],
    responses: [
      "You can easily reach out to Hariom directly via email at hariomacharya@gmail.com! ✉️ He'd love to chat with you about opportunities or cool tech. 🤝"
    ]
  },
  {
    id: 'small_talk',
    keywords: ['hi', 'hello', 'hey', 'how are you', 'what are you', 'who are you', 'why are you', 'what is this ai', 'purpose'],
    responses: [
      "Hello! 😊 I am Bespoke, uniquely trained to assist you with any questions regarding Hariom Acharya. Feel free to ask about his background, skills, or projects!",
      "Hi there! 👋 My sole purpose is to provide you with insights into Hariom's professional journey, technical expertise, and goals. How can I help you learn more about him?"
    ]
  }
];

const FALLBACKS = [
  "I'm dedicated specifically to providing information about Hariom Acharya. I don't have the context to answer that.",
  "That is outside my expertise. I am trained exclusively to answer questions regarding Hariom's background, education, and professional experience.",
  "I don't have the answer to that. Please ask me about Hariom's projects, skills, or professional journey."
];

const GREETINGS = [
  "Hello! I am Bespoke. I am here to provide you with any information you need regarding Hariom Acharya's background, projects, or professional goals.",
  "Greetings! I am Bespoke, ready to assist you with details about Hariom's tech stack, internships, or education."
];

// ---------------------------------------------------------------
// 2. MATCHING LOGIC & CONTEXT TRACKING
// ---------------------------------------------------------------

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function PortfolioAI({ lightMode = true }: { lightMode?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: pickRandom(GREETINGS) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // A simple state machine to track context for follow-up questions
  const [context, setContext] = useState<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "";
      const text = trimmed.toLowerCase();

      // Check context follow-ups first
      if (context === 'awaiting_nst_project_yes') {
        if (text.includes('yes') || text.includes('yep') || text.includes('sure') || text.includes('ok') || text.includes('yeah')) {
          responseText = "Awesome! 🎉 During his time there, he engineered 'EaseExpense' — an intuitive and powerful daily expense tracker application to seamlessly manage daily expenditures. It was a massive success! 📊💻";
        } else {
          responseText = "No worries! 😊 Is there anything else about his skills or education you'd like to explore?";
        }
        setContext(null);
      } 
      else {
        // Standard matching
        let bestTopic: Topic | null = null;
        let bestScore = 0;

        for (const topic of KNOWLEDGE_BASE) {
          let score = 0;
          for (const kw of topic.keywords) {
            if (text.includes(kw)) score += kw.split(' ').length;
          }
          if (score > bestScore) {
            bestScore = score;
            bestTopic = topic;
          }
        }

        if (bestTopic && bestScore > 0) {
          responseText = pickRandom(bestTopic.responses);
          
          // Set context if experience was asked
          if (bestTopic.id === 'experience') {
            setContext('awaiting_nst_project_yes');
          } else {
            setContext(null);
          }
        } else {
          responseText = pickRandom(FALLBACKS);
          setContext(null);
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
      setIsTyping(false);
    }, 1200); // 1.2s loader delay
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTyping) handleSend();
  };

  return (
    <div
      className="w-full max-w-md mx-auto carbon-card flex flex-col h-[480px] overflow-hidden"
    >
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
              className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed shadow-sm ${
                m.role === 'user'
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
          placeholder="e.g. Tell me about your internship..."
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
