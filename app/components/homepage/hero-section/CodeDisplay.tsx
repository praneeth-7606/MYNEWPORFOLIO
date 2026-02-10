'use client';

import { motion } from 'framer-motion';

export default function CodeDisplay() {
  const codeLines = [
    { type: 'keyword', content: 'const' },
    { type: 'variable', content: ' developer' },
    { type: 'operator', content: ' = ' },
    { type: 'bracket', content: '{' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative rounded-lg border border-[#1b2c68a0] bg-gradient-to-r from-[#0d1224] to-[#0a0d37] overflow-hidden shadow-2xl"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-[#1b2c68a0]">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-orange-400" />
          <div className="h-3 w-3 rounded-full bg-green-200" />
        </div>
        <div className="ml-4 text-xs text-gray-400">developer.js</div>
      </div>

      {/* Code Content */}
      <div className="px-6 py-8 font-mono text-sm md:text-base overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-2"
        >
          {/* Line 1 */}
          <div className="flex items-center">
            <span className="text-pink-500 mr-2">const</span>
            <span className="text-white mr-2">developer</span>
            <span className="text-pink-500 mr-2">=</span>
            <span className="text-gray-400">{'{'}</span>
            <span className="blink ml-1">|</span>
          </div>

          {/* Line 2 */}
          <div className="ml-8">
            <span className="text-white">name:</span>
            <span className="text-gray-400 mx-1">&apos;</span>
            <span className="text-amber-300">Praneeth Vedagiri</span>
            <span className="text-gray-400">',</span>
          </div>

          {/* Line 3 - Skills Array */}
          <div className="ml-8">
            <span className="text-white">skills:</span>
            <span className="text-gray-400 ml-1">{'['}</span>
          </div>
          <div className="ml-12 space-y-1">
            <div>
              <span className="text-gray-400">'</span>
              <span className="text-amber-300">React.js</span>
              <span className="text-gray-400">',</span>
            </div>
            <div>
              <span className="text-gray-400">'</span>
              <span className="text-amber-300">Next.js</span>
              <span className="text-gray-400">',</span>
            </div>
            <div>
              <span className="text-gray-400">'</span>
              <span className="text-amber-300">Node.js</span>
              <span className="text-gray-400">',</span>
            </div>
            <div>
              <span className="text-gray-400">'</span>
              <span className="text-amber-300">TypeScript</span>
              <span className="text-gray-400">',</span>
            </div>
            <div>
              <span className="text-gray-400">'</span>
              <span className="text-amber-300">MongoDB</span>
              <span className="text-gray-400">',</span>
            </div>
            <div>
              <span className="text-gray-400">'</span>
              <span className="text-amber-300">Mistral AI</span>
              <span className="text-gray-400">',</span>
            </div>
            <div>
              <span className="text-gray-400">'</span>
              <span className="text-amber-300">LangChain</span>
              <span className="text-gray-400">'</span>
            </div>
          </div>
          <div className="ml-8">
            <span className="text-gray-400">{'],'}</span>
          </div>

          {/* Line 4 */}
          <div className="ml-8">
            <span className="text-white">hardWorker:</span>
            <span className="text-orange-400 ml-2">true</span>
            <span className="text-gray-400">,</span>
          </div>

          {/* Line 5 */}
          <div className="ml-8">
            <span className="text-white">quickLearner:</span>
            <span className="text-orange-400 ml-2">true</span>
            <span className="text-gray-400">,</span>
          </div>

          {/* Line 6 */}
          <div className="ml-8">
            <span className="text-white">problemSolver:</span>
            <span className="text-orange-400 ml-2">true</span>
            <span className="text-gray-400">,</span>
          </div>

          {/* Line 7 - Hireable Function */}
          <div className="ml-8">
            <span className="text-green-400">hireable:</span>
            <span className="text-orange-400 ml-2">function</span>
            <span className="text-gray-400">{'() {'}</span>
          </div>

          {/* Line 8 */}
          <div className="ml-12">
            <span className="text-orange-400">return</span>
            <span className="text-gray-400 ml-2">{'('}</span>
          </div>

          {/* Line 9 */}
          <div className="ml-16">
            <span className="text-cyan-400">this.</span>
            <span className="text-white">hardWorker</span>
            <span className="text-amber-300 mx-2">&amp;&amp;</span>
          </div>

          {/* Line 10 */}
          <div className="ml-16">
            <span className="text-cyan-400">this.</span>
            <span className="text-white">problemSolver</span>
            <span className="text-amber-300 mx-2">&amp;&amp;</span>
          </div>

          {/* Line 11 */}
          <div className="ml-16">
            <span className="text-cyan-400">this.</span>
            <span className="text-white">skills.length</span>
            <span className="text-amber-300 mx-2">&gt;=</span>
            <span className="text-orange-400">5</span>
          </div>

          {/* Line 12 */}
          <div className="ml-12">
            <span className="text-gray-400">{');'}</span>
          </div>

          {/* Line 13 */}
          <div className="ml-8">
            <span className="text-gray-400">{'},'}</span>
          </div>

          {/* Line 14 */}
          <div>
            <span className="text-gray-400">{'};'}</span>
          </div>
        </motion.div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-violet-600/5 to-[#16f2b3]/5 pointer-events-none" />
    </motion.div>
  );
}
