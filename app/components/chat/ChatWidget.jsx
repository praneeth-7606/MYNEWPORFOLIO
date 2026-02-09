'use client';

import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiMaximize2, FiMinimize2, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Praneeth's AI assistant. I can help you learn about:\n\n• Work Experience & Skills\n• Projects & Achievements\n• Education & Background\n• GitHub Repositories\n• Contact Information\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.message) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
          source: data.source
        }]);
      } else {
        throw new Error(data.error || 'No response from AI');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your connection.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    { icon: "💼", text: "Work Experience", query: "Tell me about your experience" },
    { icon: "🚀", text: "Projects", query: "Show me your projects" },
    { icon: "🛠️", text: "Skills", query: "What are your skills?" },
    { icon: "🎓", text: "Education", query: "What's your education?" },
    { icon: "💻", text: "GitHub", query: "Show me your latest repository" },
    { icon: "📧", text: "Contact", query: "How can I contact you?" }
  ];

  const handleQuickQuestion = (query) => {
    setInput(query);
    // Auto-submit
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) form.requestSubmit();
    }, 100);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! 👋 I'm Praneeth's AI assistant. I can help you learn about:\n\n• Work Experience & Skills\n• Projects & Achievements\n• Education & Background\n• GitHub Repositories\n• Contact Information\n\nWhat would you like to know?"
      }
    ]);
  };

  // Dynamic sizing based on enlarged state - Improved dimensions
  const chatSize = isEnlarged 
    ? "w-[90vw] max-w-[900px] h-[85vh] max-h-[900px]" 
    : "w-[95vw] max-w-[450px] h-[600px] sm:h-[650px]";

  const chatPosition = isEnlarged
    ? "bottom-6 right-6 left-6 sm:left-auto"
    : "bottom-20 right-4 sm:right-6";

  return (
    <>
      {/* Chat Toggle Button with Pulse Animation */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle chat"
        >
          {/* Pulse Ring */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-75"></span>
          )}
          <span className="relative z-10">
            {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
          </span>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${chatPosition} z-40 ${chatSize} bg-gradient-to-br from-[#0d1224] via-[#0a0e1a] to-[#0d1224] border-2 border-[#1b2c68a0] rounded-3xl shadow-2xl shadow-purple-500/20 flex flex-col backdrop-blur-xl transition-all duration-300`}
          >
            {/* Header with Enhanced Gradient */}
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
                  onClick={handleReset}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Reset chat"
                  title="Reset conversation"
                >
                  <FiRefreshCw size={18} />
                </motion.button>
                <button
                  onClick={() => setIsEnlarged(!isEnlarged)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  aria-label={isEnlarged ? "Minimize" : "Enlarge"}
                  title={isEnlarged ? "Minimize" : "Enlarge"}
                >
                  {isEnlarged ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
                </button>
              </div>
            </div>

            {/* Messages Area with Custom Scrollbar - Enhanced spacing */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
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
                    {msg.source && (
                      <p className="text-xs text-white/60 mt-2">
                        {msg.source === 'direct-skills' && '⚡ Instant response'}
                        {msg.source === 'direct-experience' && '⚡ Instant response'}
                        {msg.source === 'direct-education' && '⚡ Instant response'}
                        {msg.source === 'direct-projects' && '⚡ Instant response'}
                        {msg.source === 'github-mcp' && '🔧 GitHub MCP'}
                        {msg.source === 'rag-personal' && '🧠 AI Analysis'}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Loading Animation */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#1b2c68a0] backdrop-blur-sm text-white p-4 rounded-2xl rounded-bl-none border border-[#1b2c68]">
                    <div className="flex space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-violet-400 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions - Enhanced Design with Better Layout */}
            {messages.length === 1 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-5 sm:px-6 pb-4"
              >
                <p className="text-sm text-gray-300 mb-4 font-semibold flex items-center gap-2">
                  <span className="text-lg">💡</span> Quick Questions:
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {quickQuestions.map((q, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleQuickQuestion(q.query)}
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
            )}

            {/* Input Area - Enhanced with Better Styling */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 border-t-2 border-[#1b2c68a0] bg-gradient-to-b from-[#0a0e1a]/50 to-[#0d1224]/80 backdrop-blur-sm rounded-b-3xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gradient-to-r from-[#1b2c68] to-[#162454] text-white px-5 py-3.5 sm:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400 border-2 border-[#1b2c68] transition-all text-sm sm:text-base shadow-inner"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 text-white px-5 py-3.5 sm:py-4 rounded-xl hover:shadow-xl hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiSend size={22} />
                </motion.button>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-3 text-center font-medium">
                ⚡ Powered by AI • Instant responses for most queries
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #8b5cf6);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #7c3aed);
        }
      `}</style>
    </>
  );
}

