'use client'

import { cn } from "@/lib/utils"

interface IdentitySectionProps {
    title?: string
    subtitle?: string
    description?: string
    className?: string
}

export function IdentitySection({
    title = "Notre Mission",
    subtitle = "L'excellence au service de l'éducation",
    description = "Chez Help Digi School, nous croyons que chaque établissement mérite les meilleurs outils technologiques pour s'épanouir. Notre mission est de simplifier la gestion scolaire pour permettre aux éducateurs de se concentrer sur ce qui compte vraiment : l'avenir des élèves.",
    className
}: IdentitySectionProps) {
    return (
        <section className={cn("relative py-24 overflow-hidden bg-white", className)}>
            {/* Branded Geometric Pattern Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] text-[#2302B3]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="identity-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                            <path d="M60 0 L120 60 L60 120 L0 60 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                            <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="0.8" />
                            <path d="M0 0 L120 120 M120 0 L0 120" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
                            <rect x="50" y="50" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.8" transform="rotate(45 60 60)" />
                            <circle cx="0" cy="0" r="2" fill="currentColor" />
                            <circle cx="120" cy="0" r="2" fill="currentColor" />
                            <circle cx="0" cy="120" r="2" fill="currentColor" />
                            <circle cx="120" cy="120" r="2" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#identity-pattern)" />
                </svg>
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-[#2302B3] uppercase bg-[#2302B3]/5 rounded-full ring-1 ring-[#2302B3]/10">
                        {title}
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 tracking-tight">
                        {subtitle}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#2302B3] to-[#4318FF] mx-auto mb-10 rounded-full" />
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    )
}
