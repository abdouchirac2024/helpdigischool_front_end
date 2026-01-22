'use client'

import { motion } from 'framer-motion'

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2302B3]/30 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#4318FF]/20 rounded-full blur-[80px]" />

      <svg
        viewBox="0 0 800 600"
        className="relative z-10 w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2302B3" />
            <stop offset="100%" stopColor="#4318FF" />
          </linearGradient>

          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#16213e" />
          </linearGradient>

          <linearGradient id="cameroonGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#007a5e" />
            <stop offset="100%" stopColor="#009973" />
          </linearGradient>

          <linearGradient id="cameroonYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd116" />
            <stop offset="100%" stopColor="#ffe066" />
          </linearGradient>

          <linearGradient id="cameroonRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ce1126" />
            <stop offset="100%" stopColor="#ff4757" />
          </linearGradient>

          {/* Shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#2302B3" floodOpacity="0.3"/>
          </filter>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background decorative circles */}
        <motion.circle
          cx="650"
          cy="100"
          r="60"
          fill="url(#cameroonGreen)"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="150"
          cy="500"
          r="80"
          fill="url(#cameroonYellow)"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="700"
          cy="450"
          r="50"
          fill="url(#cameroonRed)"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        {/* Main Tablet/Device */}
        <motion.g
          filter="url(#shadow)"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Tablet body */}
          <rect
            x="200"
            y="120"
            width="400"
            height="280"
            rx="20"
            fill="#1a1a2e"
            stroke="url(#primaryGradient)"
            strokeWidth="3"
          />

          {/* Screen */}
          <rect
            x="215"
            y="135"
            width="370"
            height="235"
            rx="10"
            fill="url(#screenGradient)"
          />

          {/* Screen content - Dashboard */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Header bar */}
            <rect x="225" y="145" width="350" height="30" rx="5" fill="#2302B3" opacity="0.3" />
            <circle cx="240" cy="160" r="6" fill="#22c55e" />
            <rect x="255" y="155" width="80" height="10" rx="3" fill="white" opacity="0.5" />

            {/* Stats cards */}
            <motion.rect
              x="225"
              y="185"
              width="105"
              height="70"
              rx="8"
              fill="url(#primaryGradient)"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
            />
            <text x="277" y="215" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">500+</text>
            <text x="277" y="235" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">Écoles</text>

            <motion.rect
              x="340"
              y="185"
              width="105"
              height="70"
              rx="8"
              fill="url(#cameroonGreen)"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
            />
            <text x="392" y="215" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">150K</text>
            <text x="392" y="235" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">Élèves</text>

            <motion.rect
              x="455"
              y="185"
              width="105"
              height="70"
              rx="8"
              fill="url(#cameroonYellow)"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 }}
            />
            <text x="507" y="215" textAnchor="middle" fill="#1a1a2e" fontSize="18" fontWeight="bold">10</text>
            <text x="507" y="235" textAnchor="middle" fill="#1a1a2e" fontSize="8" opacity="0.8">Régions</text>

            {/* Chart area */}
            <rect x="225" y="265" width="220" height="95" rx="8" fill="white" opacity="0.05" />

            {/* Animated chart bars */}
            {[45, 65, 40, 70, 55, 75, 50].map((height, i) => (
              <motion.rect
                key={i}
                x={240 + i * 28}
                y={340 - height}
                width="18"
                height={height}
                rx="3"
                fill="url(#primaryGradient)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                style={{ transformOrigin: 'bottom' }}
              />
            ))}

            {/* Student list */}
            <rect x="455" y="265" width="105" height="95" rx="8" fill="white" opacity="0.05" />
            {[0, 1, 2].map((i) => (
              <motion.g
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.15 }}
              >
                <circle cx="475" cy={285 + i * 28} r="10" fill="url(#primaryGradient)" />
                <rect x="490" y={280 + i * 28} width="60" height="6" rx="3" fill="white" opacity="0.3" />
                <rect x="490" y={290 + i * 28} width="40" height="4" rx="2" fill="white" opacity="0.15" />
              </motion.g>
            ))}
          </motion.g>

          {/* Home button */}
          <circle cx="400" cy="385" r="8" fill="#333" stroke="#444" strokeWidth="1" />
        </motion.g>

        {/* Floating Elements */}

        {/* Book 1 */}
        <motion.g
          initial={{ y: 30, opacity: 0, rotate: -10 }}
          animate={{ y: [0, -10, 0], opacity: 1, rotate: -10 }}
          transition={{ y: { duration: 3, repeat: Infinity }, opacity: { duration: 0.5 } }}
        >
          <rect x="100" y="180" width="70" height="90" rx="5" fill="url(#cameroonGreen)" />
          <rect x="105" y="185" width="60" height="80" rx="3" fill="#006650" />
          <rect x="115" y="200" width="40" height="4" rx="2" fill="white" opacity="0.5" />
          <rect x="115" y="210" width="35" height="4" rx="2" fill="white" opacity="0.3" />
          <rect x="115" y="220" width="40" height="4" rx="2" fill="white" opacity="0.5" />
        </motion.g>

        {/* Book 2 */}
        <motion.g
          initial={{ y: 30, opacity: 0, rotate: 15 }}
          animate={{ y: [0, -15, 0], opacity: 1, rotate: 15 }}
          transition={{ y: { duration: 4, repeat: Infinity, delay: 0.5 }, opacity: { duration: 0.5, delay: 0.2 } }}
        >
          <rect x="620" y="200" width="65" height="85" rx="5" fill="url(#cameroonRed)" />
          <rect x="625" y="205" width="55" height="75" rx="3" fill="#b8101f" />
          <rect x="635" y="220" width="35" height="4" rx="2" fill="white" opacity="0.5" />
          <rect x="635" y="230" width="30" height="4" rx="2" fill="white" opacity="0.3" />
        </motion.g>

        {/* Graduation Cap */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [0, -8, 0], opacity: 1 }}
          transition={{ y: { duration: 2.5, repeat: Infinity }, opacity: { duration: 0.5, delay: 0.3 } }}
        >
          <polygon points="680,120 720,140 680,160 640,140" fill="url(#primaryGradient)" />
          <rect x="675" y="140" width="10" height="25" fill="#1c0291" />
          <circle cx="680" cy="170" r="8" fill="url(#cameroonYellow)" />
          <line x1="680" y1="170" x2="680" y2="195" stroke="url(#cameroonYellow)" strokeWidth="2" />
        </motion.g>

        {/* Pencil */}
        <motion.g
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: [-30, -25, -30], opacity: 1 }}
          transition={{ rotate: { duration: 2, repeat: Infinity }, opacity: { duration: 0.5, delay: 0.4 } }}
          style={{ transformOrigin: '80px 350px' }}
        >
          <rect x="60" y="320" width="80" height="12" rx="2" fill="url(#cameroonYellow)" />
          <polygon points="140,320 155,326 140,332" fill="#ffcc00" />
          <polygon points="155,324 162,326 155,328" fill="#333" />
          <rect x="60" y="320" width="15" height="12" rx="2" fill="#ff9999" />
        </motion.g>

        {/* WiFi Signal */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M${720 - i * 15} ${80 + i * 12} Q730 ${70 + i * 12} ${740 + i * 15} ${80 + i * 12}`}
              stroke="url(#primaryGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.3, 1, 0.3] }}
              transition={{
                pathLength: { delay: 0.8 + i * 0.2, duration: 0.5 },
                opacity: { duration: 2, repeat: Infinity, delay: i * 0.3 }
              }}
            />
          ))}
        </motion.g>

        {/* Students/People Icons */}
        {/* Student 1 */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <circle cx="130" y="420" r="25" fill="url(#primaryGradient)" />
          <circle cx="130" cy="410" r="12" fill="#ffd699" />
          <ellipse cx="130" cy="440" rx="18" ry="12" fill="url(#cameroonGreen)" />
        </motion.g>

        {/* Student 2 */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <circle cx="680" cy="350" r="22" fill="url(#cameroonRed)" />
          <circle cx="680" cy="342" r="10" fill="#8b6914" />
          <ellipse cx="680" cy="368" rx="15" ry="10" fill="url(#primaryGradient)" />
        </motion.g>

        {/* Floating Plus Signs (representing growth) */}
        {[
          { x: 170, y: 150, delay: 0 },
          { x: 630, y: 320, delay: 0.5 },
          { x: 100, y: 280, delay: 1 },
        ].map((pos, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ delay: pos.delay, duration: 2, repeat: Infinity }}
          >
            <line
              x1={pos.x - 8}
              y1={pos.y}
              x2={pos.x + 8}
              y2={pos.y}
              stroke="url(#primaryGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1={pos.x}
              y1={pos.y - 8}
              x2={pos.x}
              y2={pos.y + 8}
              stroke="url(#primaryGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
        ))}

        {/* Connection dots and lines */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2 }}
        >
          {/* Dotted connections */}
          <motion.circle
            cx="180"
            cy="300"
            r="4"
            fill="#4318FF"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="620"
            cy="380"
            r="4"
            fill="#4318FF"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="400"
            cy="480"
            r="4"
            fill="#4318FF"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.g>

        {/* Cameroon flag colors stripe at bottom */}
        <motion.g
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ transformOrigin: '400px 550px' }}
        >
          <rect x="250" y="540" width="100" height="8" rx="4" fill="url(#cameroonGreen)" />
          <rect x="350" y="540" width="100" height="8" rx="4" fill="url(#cameroonRed)" />
          <rect x="450" y="540" width="100" height="8" rx="4" fill="url(#cameroonYellow)" />
        </motion.g>

        {/* Star (from Cameroon flag) */}
        <motion.g
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
        >
          <polygon
            points="400,500 406,518 425,518 410,530 416,548 400,538 384,548 390,530 375,518 394,518"
            fill="url(#cameroonYellow)"
            filter="url(#softGlow)"
          />
        </motion.g>
      </svg>
    </div>
  )
}