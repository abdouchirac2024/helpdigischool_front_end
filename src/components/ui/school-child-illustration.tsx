'use client'

export function SchoolChildIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#2302B3]/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-[#4318FF]/15 rounded-full blur-[80px]" />

      <svg
        viewBox="0 0 400 500"
        className="relative z-10 w-full max-w-md h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2302B3" />
            <stop offset="100%" stopColor="#4318FF" />
          </linearGradient>

          <linearGradient id="lightBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4318FF" />
            <stop offset="100%" stopColor="#6B5BFF" />
          </linearGradient>

          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="100%" stopColor="#6B4F0F" />
          </linearGradient>

          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>

          <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>

          <linearGradient id="shortsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3a5c" />
            <stop offset="100%" stopColor="#0f2940" />
          </linearGradient>

          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="50%" stopColor="#d0d0d0" />
            <stop offset="100%" stopColor="#e8e8e8" />
          </linearGradient>

          {/* Shadow filter */}
          <filter id="childShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="15" floodColor="#000000" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* Ground/Floor */}
        <ellipse cx="200" cy="470" rx="150" ry="20" fill="url(#groundGradient)" opacity="0.5" />

        {/* Child Figure */}
        <g filter="url(#childShadow)">

          {/* Legs */}
          <rect x="165" y="340" width="25" height="90" rx="12" fill="url(#skinGradient)" />
          <rect x="210" y="340" width="25" height="90" rx="12" fill="url(#skinGradient)" />

          {/* Shoes */}
          <ellipse cx="177" cy="435" rx="22" ry="12" fill="#1a1a1a" />
          <ellipse cx="222" cy="435" rx="22" ry="12" fill="#1a1a1a" />
          <ellipse cx="177" cy="432" rx="18" ry="8" fill="#333" />
          <ellipse cx="222" cy="432" rx="18" ry="8" fill="#333" />

          {/* Shorts */}
          <path d="M155 300 L155 355 Q155 365 165 365 L190 365 L190 340 Q190 330 200 330 Q210 330 210 340 L210 365 L235 365 Q245 365 245 355 L245 300 Q245 290 235 290 L165 290 Q155 290 155 300 Z" fill="url(#shortsGradient)" />

          {/* Body/Shirt */}
          <path d="M150 200 Q150 290 155 290 L245 290 Q250 290 250 200 L250 180 Q250 160 230 155 L200 150 L170 155 Q150 160 150 180 Z" fill="url(#shirtGradient)" />

          {/* Shirt collar */}
          <path d="M175 155 L200 170 L225 155" stroke="#ddd" strokeWidth="3" fill="none" />

          {/* Left Arm */}
          <path d="M150 175 Q130 185 125 220 Q120 250 135 270" stroke="url(#skinGradient)" strokeWidth="22" strokeLinecap="round" fill="none" />

          {/* Left Hand holding notebook */}
          <ellipse cx="135" cy="275" rx="14" ry="12" fill="url(#skinGradient)" />

          {/* Right Arm */}
          <path d="M250 175 Q270 185 280 210 Q285 230 275 250" stroke="url(#skinGradient)" strokeWidth="22" strokeLinecap="round" fill="none" />

          {/* Right Hand */}
          <ellipse cx="275" cy="255" rx="14" ry="12" fill="url(#skinGradient)" />

          {/* Notebook in left hand */}
          <g transform="translate(95, 240) rotate(-15)">
            <rect x="0" y="0" width="60" height="80" rx="3" fill="#fff" stroke="#ddd" strokeWidth="2" />
            <rect x="5" y="5" width="50" height="70" fill="#f8f8ff" />
            {/* Lines on notebook */}
            <line x1="10" y1="20" x2="50" y2="20" stroke="#e0e0ff" strokeWidth="1" />
            <line x1="10" y1="30" x2="50" y2="30" stroke="#e0e0ff" strokeWidth="1" />
            <line x1="10" y1="40" x2="50" y2="40" stroke="#e0e0ff" strokeWidth="1" />
            <line x1="10" y1="50" x2="50" y2="50" stroke="#e0e0ff" strokeWidth="1" />
            <line x1="10" y1="60" x2="50" y2="60" stroke="#e0e0ff" strokeWidth="1" />
            {/* Spiral binding */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle key={i} cx="3" cy={12 + i * 10} r="3" fill="none" stroke="#aaa" strokeWidth="1.5" />
            ))}
          </g>

          {/* Blue Pen in right hand */}
          <g transform="translate(265, 220) rotate(30)">
            <rect x="0" y="0" width="8" height="60" rx="2" fill="url(#blueGradient)" />
            <polygon points="0,60 4,75 8,60" fill="url(#lightBlueGradient)" />
            <rect x="0" y="0" width="8" height="10" rx="2" fill="#1a1a60" />
            <rect x="2" y="55" width="4" height="8" fill="#c0c0c0" />
          </g>

          {/* Head */}
          <ellipse cx="200" cy="115" rx="55" ry="60" fill="url(#skinGradient)" />

          {/* Hair */}
          <path d="M145 100 Q145 50 200 45 Q255 50 255 100 Q255 80 240 70 Q220 55 200 55 Q180 55 160 70 Q145 80 145 100 Z" fill="url(#hairGradient)" />

          {/* Small hair puffs/curls */}
          <circle cx="155" cy="75" r="12" fill="url(#hairGradient)" />
          <circle cx="175" cy="60" r="14" fill="url(#hairGradient)" />
          <circle cx="200" cy="52" r="15" fill="url(#hairGradient)" />
          <circle cx="225" cy="60" r="14" fill="url(#hairGradient)" />
          <circle cx="245" cy="75" r="12" fill="url(#hairGradient)" />

          {/* Eyes */}
          <ellipse cx="180" cy="115" rx="12" ry="14" fill="white" />
          <ellipse cx="220" cy="115" rx="12" ry="14" fill="white" />
          <circle cx="182" cy="117" r="7" fill="#2d1810" />
          <circle cx="222" cy="117" r="7" fill="#2d1810" />
          <circle cx="184" cy="114" r="3" fill="white" />
          <circle cx="224" cy="114" r="3" fill="white" />

          {/* Eyebrows */}
          <path d="M168 100 Q180 95 192 100" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M208 100 Q220 95 232 100" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Nose */}
          <ellipse cx="200" cy="130" rx="6" ry="4" fill="#7a5a10" opacity="0.5" />

          {/* Happy Smile */}
          <path d="M180 145 Q200 165 220 145" stroke="#5a3a00" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Ears */}
          <ellipse cx="145" cy="115" rx="10" ry="15" fill="url(#skinGradient)" />
          <ellipse cx="255" cy="115" rx="10" ry="15" fill="url(#skinGradient)" />

          {/* BACKPACK - Blue */}
          <g>
            {/* Main backpack body */}
            <path d="M140 170 Q130 175 125 250 Q125 320 140 330 L145 330 Q150 310 150 250 L150 200 Q150 175 140 170 Z" fill="url(#blueGradient)" />
            <path d="M260 170 Q270 175 275 250 Q275 320 260 330 L255 330 Q250 310 250 250 L250 200 Q250 175 260 170 Z" fill="url(#blueGradient)" />

            {/* Backpack back panel */}
            <rect x="140" y="175" width="120" height="150" rx="15" fill="url(#blueGradient)" />

            {/* Backpack front pocket */}
            <rect x="155" y="220" width="90" height="80" rx="10" fill="url(#lightBlueGradient)" />
            <rect x="165" y="230" width="70" height="60" rx="8" fill="url(#blueGradient)" opacity="0.3" />

            {/* Pocket zipper */}
            <line x1="175" y1="260" x2="225" y2="260" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" />
            <circle cx="225" cy="260" r="4" fill="#ffd700" />

            {/* Straps */}
            <path d="M160 175 Q155 140 170 130" stroke="url(#blueGradient)" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M240 175 Q245 140 230 130" stroke="url(#blueGradient)" strokeWidth="12" strokeLinecap="round" fill="none" />

            {/* Strap buckles */}
            <rect x="165" y="125" width="15" height="10" rx="2" fill="#c0c0c0" />
            <rect x="220" y="125" width="15" height="10" rx="2" fill="#c0c0c0" />

            {/* Blue Water Bottle on side */}
            <g transform="translate(270, 200)">
              <rect x="0" y="0" width="25" height="70" rx="8" fill="url(#lightBlueGradient)" />
              <rect x="3" y="5" width="19" height="55" rx="6" fill="url(#blueGradient)" opacity="0.5" />
              {/* Bottle cap */}
              <rect x="5" y="-8" width="15" height="12" rx="3" fill="#1a1a60" />
              {/* Water level indication */}
              <rect x="5" y="25" width="15" height="35" rx="4" fill="#4318FF" opacity="0.3" />
              {/* Bottle strap */}
              <path d="M0 15 Q-10 20 -5 35" stroke="url(#blueGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          </g>
        </g>

        {/* Floating decorative elements */}
        {/* Stars */}
        <g opacity="0.6">
          <polygon points="50,100 53,110 63,110 55,116 58,126 50,120 42,126 45,116 37,110 47,110" fill="#ffd700" />
          <polygon points="350,150 352,157 360,157 354,162 356,169 350,165 344,169 346,162 340,157 348,157" fill="#ffd700" />
          <polygon points="320,80 322,87 330,87 324,92 326,99 320,95 314,99 316,92 310,87 318,87" fill="#ffd700" />
        </g>

        {/* Small floating books */}
        <g transform="translate(40, 350) rotate(-10)" opacity="0.4">
          <rect x="0" y="0" width="30" height="40" rx="2" fill="#007a5e" />
          <rect x="3" y="3" width="24" height="34" fill="#006650" />
        </g>

        <g transform="translate(330, 380) rotate(15)" opacity="0.4">
          <rect x="0" y="0" width="25" height="35" rx="2" fill="#ce1126" />
          <rect x="3" y="3" width="19" height="29" fill="#b8101f" />
        </g>

        {/* ABC letters floating */}
        <text x="60" y="200" fontSize="24" fontWeight="bold" fill="url(#blueGradient)" opacity="0.3">A</text>
        <text x="330" y="300" fontSize="20" fontWeight="bold" fill="url(#blueGradient)" opacity="0.3">B</text>
        <text x="45" y="280" fontSize="18" fontWeight="bold" fill="url(#blueGradient)" opacity="0.3">C</text>

        {/* Math symbols */}
        <text x="340" y="420" fontSize="20" fontWeight="bold" fill="#ffd700" opacity="0.4">+</text>
        <text x="55" y="420" fontSize="18" fontWeight="bold" fill="#007a5e" opacity="0.4">=</text>
      </svg>
    </div>
  )
}