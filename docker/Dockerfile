# ============================================
# Help Digi School - Frontend Next.js
# Dockerfile Multi-Stage Optimisé
# ============================================
# Build: docker build -f docker/Dockerfile -t helpdigischool/frontend .
# Dev:   docker build -f docker/Dockerfile --target development -t helpdigischool/frontend:dev .
# Prod:  docker build -f docker/Dockerfile --target production -t helpdigischool/frontend:prod .
# ============================================

# Arguments de build
ARG NODE_VERSION=20

# ============================================
# STAGE 1: Base - Image de base avec dépendances système
# ============================================
FROM node:${NODE_VERSION}-alpine AS base

# Métadonnées
LABEL maintainer="HelpDigiSchool Team"
LABEL description="Frontend Next.js pour HelpDigiSchool"
LABEL org.opencontainers.image.source="https://github.com/helpdigischool/frontend"

# Installation des dépendances système
RUN apk add --no-cache \
    libc6-compat \
    curl \
    wget \
    && rm -rf /var/cache/apk/*

# Configuration npm pour la performance
RUN npm config set fund false && \
    npm config set audit false

WORKDIR /app

# ============================================
# STAGE 2: Dependencies - Installation des modules
# ============================================
FROM base AS deps

# Copie des fichiers de dépendances
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* ./

# Installation des dépendances avec cache optimisé
RUN \
    if [ -f bun.lockb ]; then \
        npm install -g bun && bun install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm ci --legacy-peer-deps; \
    elif [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then \
        npm install -g pnpm && pnpm install --frozen-lockfile; \
    else \
        npm install --legacy-peer-deps; \
    fi

# ============================================
# STAGE 3: Development - Environnement de développement
# ============================================
FROM base AS development

WORKDIR /app

# Copie des node_modules depuis deps
COPY --from=deps /app/node_modules ./node_modules

# Copie du code source
COPY . .

# Création du répertoire pour les scripts Docker
RUN mkdir -p /app/docker/scripts

# Variables d'environnement
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

# Port d'écoute
EXPOSE 3000

# Debugger Node.js
EXPOSE 9229

# Commande de démarrage
CMD ["npm", "run", "dev"]

# ============================================
# STAGE 4: Builder - Build de production
# ============================================
FROM base AS builder

WORKDIR /app

# Copie des node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copie du code source
COPY . .

# Variables d'environnement pour le build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build de l'application
RUN npm run build

# ============================================
# STAGE 5: Production - Image finale optimisée
# ============================================
FROM node:${NODE_VERSION}-alpine AS production

# Installation de wget pour healthcheck (curl est plus lourd)
RUN apk add --no-cache wget tini && \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Création d'un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Variables d'environnement
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copie des fichiers publics
COPY --from=builder /app/public ./public

# Création et permissions du cache Next.js
RUN mkdir -p .next && chown nextjs:nodejs .next

# Copie du build standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copie des scripts Docker
COPY --chown=nextjs:nodejs docker/scripts/ ./docker/scripts/
RUN chmod +x ./docker/scripts/*.sh 2>/dev/null || true

# Passage à l'utilisateur non-root
USER nextjs

# Port d'écoute
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Utilisation de tini comme init process pour gérer les signaux
ENTRYPOINT ["/sbin/tini", "--"]

# Commande de démarrage
CMD ["node", "server.js"]