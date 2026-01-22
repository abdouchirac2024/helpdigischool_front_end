'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Users, GraduationCap, CheckCircle2 } from 'lucide-react'

interface RegionData {
  id: string
  name: string
  nameFr: string
  schools: number
  students: string
  capital: string
  path: string
  labelX: number
  labelY: number
}

const regionsData: RegionData[] = [
  {
    id: 'extreme-north',
    name: 'Far North',
    nameFr: 'Extrême-Nord',
    schools: 45,
    students: '12K+',
    capital: 'Maroua',
    path: 'M245 20 L290 25 L310 45 L305 85 L280 110 L250 105 L230 80 L225 50 L245 20Z',
    labelX: 260,
    labelY: 60
  },
  {
    id: 'north',
    name: 'North',
    nameFr: 'Nord',
    schools: 38,
    students: '10K+',
    capital: 'Garoua',
    path: 'M230 80 L250 105 L280 110 L305 85 L310 120 L290 155 L250 165 L215 150 L200 115 L215 90 L230 80Z',
    labelX: 255,
    labelY: 125
  },
  {
    id: 'adamaoua',
    name: 'Adamawa',
    nameFr: 'Adamaoua',
    schools: 32,
    students: '8K+',
    capital: 'Ngaoundéré',
    path: 'M200 115 L215 150 L250 165 L290 155 L320 175 L310 215 L260 230 L200 220 L170 190 L175 155 L200 115Z',
    labelX: 245,
    labelY: 190
  },
  {
    id: 'east',
    name: 'East',
    nameFr: 'Est',
    schools: 28,
    students: '7K+',
    capital: 'Bertoua',
    path: 'M260 230 L310 215 L340 240 L360 290 L350 350 L310 380 L260 370 L230 330 L220 280 L240 250 L260 230Z',
    labelX: 290,
    labelY: 300
  },
  {
    id: 'centre',
    name: 'Centre',
    nameFr: 'Centre',
    schools: 85,
    students: '25K+',
    capital: 'Yaoundé',
    path: 'M170 230 L200 220 L260 230 L240 250 L220 280 L230 330 L200 360 L160 350 L140 310 L145 270 L170 230Z',
    labelX: 190,
    labelY: 290
  },
  {
    id: 'south',
    name: 'South',
    nameFr: 'Sud',
    schools: 35,
    students: '9K+',
    capital: 'Ebolowa',
    path: 'M140 310 L160 350 L200 360 L230 330 L260 370 L240 410 L190 430 L140 420 L110 380 L120 340 L140 310Z',
    labelX: 175,
    labelY: 375
  },
  {
    id: 'littoral',
    name: 'Littoral',
    nameFr: 'Littoral',
    schools: 95,
    students: '30K+',
    capital: 'Douala',
    path: 'M95 270 L125 255 L145 270 L140 310 L120 340 L90 330 L70 300 L80 275 L95 270Z',
    labelX: 108,
    labelY: 298
  },
  {
    id: 'south-west',
    name: 'South-West',
    nameFr: 'Sud-Ouest',
    schools: 42,
    students: '11K+',
    capital: 'Buea',
    path: 'M50 230 L80 215 L110 225 L125 255 L95 270 L80 275 L55 265 L40 250 L50 230Z',
    labelX: 80,
    labelY: 248
  },
  {
    id: 'north-west',
    name: 'North-West',
    nameFr: 'Nord-Ouest',
    schools: 48,
    students: '14K+',
    capital: 'Bamenda',
    path: 'M80 185 L115 175 L140 190 L145 220 L125 255 L110 225 L80 215 L65 200 L80 185Z',
    labelX: 105,
    labelY: 210
  },
  {
    id: 'west',
    name: 'West',
    nameFr: 'Ouest',
    schools: 52,
    students: '18K+',
    capital: 'Bafoussam',
    path: 'M115 175 L150 165 L175 155 L170 190 L200 220 L170 230 L145 270 L125 255 L145 220 L140 190 L115 175Z',
    labelX: 155,
    labelY: 210
  }
]

export function CameroonMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const activeData = regionsData.find(r => r.id === (hoveredRegion || activeRegion))

  return (
    <div className="relative">
      {/* Main Container */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Map Side */}
        <div className="relative order-2 lg:order-1">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2302B3]/20 via-transparent to-[#4318FF]/20 rounded-3xl blur-3xl" />

          {/* Map Container */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/10 overflow-hidden">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#4318FF] rounded-full"
                  initial={{
                    x: Math.random() * 400,
                    y: Math.random() * 500,
                    opacity: 0
                  }}
                  animate={{
                    y: [null, Math.random() * 500],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            {/* SVG Map */}
            <svg
              viewBox="0 0 400 460"
              className="relative z-10 w-full h-auto"
              style={{ filter: 'drop-shadow(0 4px 20px rgba(35, 2, 179, 0.3))' }}
            >
              <defs>
                {/* Gradient for active region */}
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2302B3" />
                  <stop offset="100%" stopColor="#4318FF" />
                </linearGradient>

                {/* Gradient for hover */}
                <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4318FF" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Pattern for inactive regions */}
                <pattern id="stripes" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                </pattern>
              </defs>

              {/* Regions */}
              {regionsData.map((region) => {
                const isActive = activeRegion === region.id
                const isHovered = hoveredRegion === region.id

                return (
                  <g key={region.id}>
                    <motion.path
                      d={region.path}
                      fill={isActive || isHovered ? 'url(#activeGradient)' : 'rgba(255,255,255,0.08)'}
                      stroke={isActive || isHovered ? '#4318FF' : 'rgba(255,255,255,0.2)'}
                      strokeWidth={isActive || isHovered ? 2 : 1}
                      className="cursor-pointer transition-colors"
                      onClick={() => setActiveRegion(region.id === activeRegion ? null : region.id)}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      initial={false}
                      animate={{
                        scale: isActive || isHovered ? 1.02 : 1,
                        filter: isActive || isHovered ? 'url(#glow)' : 'none'
                      }}
                      style={{ transformOrigin: `${region.labelX}px ${region.labelY}px` }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />

                    {/* Region Label */}
                    <motion.text
                      x={region.labelX}
                      y={region.labelY}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill={isActive || isHovered ? '#ffffff' : 'rgba(255,255,255,0.6)'}
                      fontSize="10"
                      fontWeight={isActive || isHovered ? 'bold' : 'normal'}
                      initial={false}
                      animate={{ opacity: 1 }}
                    >
                      {region.nameFr.length > 10 ? region.nameFr.split('-')[0] : region.nameFr}
                    </motion.text>

                    {/* Active Indicator Dot */}
                    {(isActive || isHovered) && (
                      <motion.circle
                        cx={region.labelX}
                        cy={region.labelY - 15}
                        r="3"
                        fill="#22c55e"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    )}
                  </g>
                )
              })}

              {/* Capital marker for Douala */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <circle cx="95" cy="295" r="6" fill="#2302B3" stroke="#fff" strokeWidth="2" />
                <motion.circle
                  cx="95"
                  cy="295"
                  r="12"
                  fill="none"
                  stroke="#2302B3"
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.g>

              {/* Yaoundé marker */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
              >
                <circle cx="185" cy="305" r="5" fill="#4318FF" stroke="#fff" strokeWidth="2" />
                <motion.circle
                  cx="185"
                  cy="305"
                  r="10"
                  fill="none"
                  stroke="#4318FF"
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                />
              </motion.g>
            </svg>

            {/* Legend */}
            <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2302B3] border border-white/50" />
                <span>Siège (Douala)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4318FF] border border-white/50" />
                <span>Capitale (Yaoundé)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span>Régions actives</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Side */}
        <div className="order-1 lg:order-2 space-y-6">
          {/* Active Region Info */}
          <AnimatePresence mode="wait">
            {activeData ? (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#2302B3] to-[#4318FF] animate-pulse" />
                      <span className="text-sm font-medium text-[#2302B3]">Région sélectionnée</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{activeData.nameFr}</h3>
                    <p className="text-gray-500">Chef-lieu: {activeData.capital}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm">Écoles</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{activeData.schools}+</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Élèves</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{activeData.students}</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-br from-[#2302B3] to-[#4318FF] rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Explorez la carte</h3>
                    <p className="text-white/80 text-sm">Cliquez sur une région</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">
                  Survolez ou cliquez sur une région pour découvrir notre présence et nos statistiques dans chaque zone du Cameroun.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Écoles', value: '500+', icon: GraduationCap },
              { label: 'Élèves Gérés', value: '150K+', icon: Users },
              { label: 'Régions', value: '10/10', icon: MapPin },
              { label: 'Couverture', value: '100%', icon: CheckCircle2 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <stat.icon className="w-5 h-5 text-[#2302B3] mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Region List */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3 px-2">Toutes les régions</h4>
            <div className="grid grid-cols-2 gap-2">
              {regionsData.map((region) => (
                <motion.button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id === activeRegion ? null : region.id)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                    activeRegion === region.id || hoveredRegion === region.id
                      ? 'bg-gradient-to-r from-[#2302B3] to-[#4318FF] text-white'
                      : 'bg-white hover:bg-gray-100 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle2 className={`w-4 h-4 ${
                    activeRegion === region.id || hoveredRegion === region.id
                      ? 'text-green-300'
                      : 'text-green-500'
                  }`} />
                  <span className="font-medium truncate">{region.nameFr}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}