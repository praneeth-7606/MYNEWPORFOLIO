'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { FiMessageCircle, FiX, FiSend, FiMaximize2, FiMinimize2, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const GREETING = {
  role: 'assistant',
  content: "Hi! 👋 I'm Praneeth's AI assistant. I can help you learn about:\n\n• Work Experience & Skills\n• Projects & Achievements\n• Education & Background\n• GitHub Repositories\n• Contact Information\n\nWhat would you like to know?"
};

const quickQuestions = [
  { icon: "💼", text: "Work Experience", query: "Tell me about your experience" },
  { icon: "🚀", text: "Projects", query: "Show me your projects" },
  { icon: "🛠️", text: "Skills", query: "What are your skills?" },
  { icon: "🎓", text: "Education", query: "What's your education?" },
  { icon: "💻", text: "GitHub", query: "Show me your latest repository" },
  { icon: "📧", text: "Contact", query: "How can I contact you?" }
];

const SOURCE_LABELS = {
  'direct-skills': '⚡ Instant response',
  'direct-experience': '⚡ Instant response',
  'direct-education': '⚡ Instant response',
  'direct-projects': '⚡ Instant response',
  'github-mcp': '🔧 GitHub MCP',
  'rag-personal': '🧠 AI Analysis',
};

// Hoisted geometry so isEnlarged toggling doesn't rebuild fresh strings used by
// the (memoized) window subtree for no reason.
const CHAT_SIZE = {
  normal: "w-[95vw] max-w-[450px] h-[600px] sm:h-[650px]",
  enlarged: "w-[90vw] max-w-[900px] h-[85vh] max-h-[900px]",
};
const CHAT_POSITION = {
  normal: "bottom-20 right-4 sm:right-6",
  enlarged: "bottom-6 right-6 left-6 sm:left-auto",
};

// Each of these is memo'd on the props that actually feed it, so state changes
// in one part of the widget (typing in the input, opening/closing, toggling
// size, sending a message) never repaint the parts that didn't change.

const ChatToggleButton = memo(function ChatToggleButton({ isOpen, onToggle }) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.button
        onClick={onToggle}
        className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-75"></span>
        )}
        <span className="relative z-10">
          {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
        </span>
      </motion.button>
    </motion.div>
  );
});

const ChatHeader = memo(function ChatHeader({ isEnlarged, onReset, onToggleEnlarged }) {
  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 p-5 rounded-t-3xl flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
          <span className="text-3xl">🤖</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-xl">AI Assistant</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
            <p className="text-white/90 text-sm font-medium">Online • Instant responses</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <motion.button
          onClick={onReset}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          aria-label="Reset chat"
          title="Reset conversation"
        >
          <FiRefreshCw size={18} />
        </motion.button>
        <button
          onClick={onToggleEnlarged}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          aria-label={isEnlarged ? "Minimize" : "Enlarge"}
          title={isEnlarged ? "Minimize" : "Enlarge"}
        >
          {isEnlarged ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
        </button>
      </div>
    </div>
  );
});

const LoadingDots = memo(function LoadingDots() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="bg-[#1b2c68a0] backdrop-blur-sm text-white p-4 rounded-2xl rounded-bl-none border border-[#1b2c68]">
        <div className="flex space-x-2">
          {[0, 0.2, 0.4].map((delay) => (
            <motion.div
              key={delay}
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0, delay }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

const QuickQuestions = memo(function QuickQuestions({ onSelect, visible }) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-5 sm:px-6 pb-4"
    >
      <p className="text-sm text-gray-300 mb-4 font-semibold flex items-center gap-2">
        <span className="text-lg">💡</span> Quick Questions:
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {quickQuestions.map((q) => (
          <motion.button
            key={q.text}
            onClick={() => onSelect(q.query)}
            className="text-xs sm:text-sm bg-gradient-to-br from-[#1b2c68] to-[#162454] text-white px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl hover:from-pink-500/30 hover:to-violet-500/30 transition-all border-2 border-[#1b2c68] hover:border-pink-500/60 text-left flex items-center gap-2 shadow-lg hover:shadow-pink-500/20"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-lg sm:text-xl">{q.icon}</span>
            <span className="font-semibold">{q.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});

// Owns its own `input` state: keystrokes re-render just this form rather than the
// whole widget (transcript bubbles, header, toggle button all stay put).
const ChatForm = memo(function ChatForm({ onSend, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || disabled) return;
    setInput('');
    onSend(content);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6 border-t-2 border-[#1b2c68a0] bg-gradient-to-b from-[#0a0e1a]/50 to-[#0d1224]/80 backdrop-blur-sm rounded-b-3xl">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-gradient-to-r from-[#1b2c68] to-[#162454] text-white px-5 py-3.5 sm:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400 border-2 border-[#1b2c68] transition-all text-sm sm:text-base shadow-inner"
          disabled={disabled}
          aria-label="Chat message"
        />
        <motion.button
          type="submit"
          disabled={disabled || !input.trim()}
          className="bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 text-white px-5 py-3.5 sm:py-4 rounded-xl hover:shadow-xl hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Send message"
        >
          <FiSend size={22} />
        </motion.button>
      </div>
      <p className="text-xs sm:text-sm text-gray-400 mt-3 text-center font-medium">
        ⚡ Powered by AI • Instant responses for most queries
      </p>
    </form>
  );
});

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Mirrors `messages` so sendMessage can read the current history without taking
  // it as a dependency — that keeps the callback stable across every keystroke.
  const messagesRef = useRef(messages);
  const isLoadingRef = useRef(false);

  const appendMessage = useCallback((message) => {
    messagesRef.current = [...messagesRef.current, message];
    setMessages(messagesRef.current);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  const sendMessage = useCallback(async (text) => {
    const content = text.trim();
    if (!content || isLoadingRef.current) return;

    const userMessage = { role: 'user', content };
    appendMessage(userMessage);
    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesRef.current }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.message) {
        appendMessage({
          role: 'assistant',
          content: data.message,
          source: data.source
        });
      } else {
        throw new Error(data.error || 'No response from AI');
      }
    } catch (error) {
      console.error('Chat error:', error);
      appendMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your connection.'
      });
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [appendMessage]);

  const handleReset = useCallback(() => {
    messagesRef.current = [GREETING];
    setMessages(messagesRef.current);
  }, []);

  const toggleOpen = useCallback(() => setIsOpen((open) => !open), []);
  const toggleEnlarged = useCallback(() => setIsEnlarged((enlarged) => !enlarged), []);
  const handleQuickQuestion = useCallback((query) => sendMessage(query), [sendMessage]);

  const size = isEnlarged ? CHAT_SIZE.enlarged : CHAT_SIZE.normal;
  const position = isEnlarged ? CHAT_POSITION.enlarged : CHAT_POSITION.normal;

  return (
    <>
      <ChatToggleButton isOpen={isOpen} onToggle={toggleOpen} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${position} z-40 ${size} bg-gradient-to-br from-[#0d1224] via-[#0a0e1a] to-[#0d1224] border-2 border-[#1b2c68a0] rounded-3xl shadow-2xl shadow-purple-500/20 flex flex-col backdrop-blur-xl transition-all duration-300`}
          >
            <ChatHeader
              isEnlarged={isEnlarged}
              onReset={handleReset}
              onToggleEnlarged={toggleEnlarged}
            />

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
              <MessageList messages={messages} />
              {isLoading && <LoadingDots />}
              <div ref={messagesEndRef} />
            </div>

            <QuickQuestions
              visible={messages.length === 1 && !isLoading}
              onSelect={handleQuickQuestion}
            />

            <ChatForm onSend={sendMessage} disabled={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// memo on the transcript: `messages` only changes when a message is actually added,
// so typing in the input no longer re-renders every bubble in the conversation.
const MessageList = memo(function MessageList({ messages }) {
  return (
    <>
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] sm:max-w-[85%] p-4 sm:p-5 rounded-2xl shadow-xl ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 text-white rounded-br-none shadow-pink-500/30'
                : 'bg-gradient-to-br from-[#1b2c68] to-[#162454] backdrop-blur-sm text-white border-2 border-[#1b2c68] rounded-bl-none shadow-purple-500/20'
            }`}
          >
            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            {msg.source && SOURCE_LABELS[msg.source] && (
              <p className="text-xs text-white/60 mt-2">{SOURCE_LABELS[msg.source]}</p>
            )}
          </div>
        </motion.div>
      ))}
    </>
  );
});