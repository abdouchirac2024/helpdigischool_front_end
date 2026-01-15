# ============================================
# Help Digi School - Frontend Next.js
# Dockerfile Multi-Stage Optimisé v2.0
# ============================================
# Build: docker build -f docker/Dockerfile -t helpdigischool/frontend .
# Dev:   docker build -f docker/Dockerfile --target development -t helpdigischool/frontend:dev .
# Prod:  docker build -f docker/Dockerfile --target production -t helpdigischool/frontend:prod .
#
# Multi-Environment Support:
#   --build-arg ENVIRONMENT=dev|preprod|prod
#   --build-arg NODE_VERSION=20|22
# ============================================

# ===========================================
# BUILD ARGUMENTS
# ===========================================
ARG NODE_VERSION=20
ARG ENVIRONMENT=production
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=latest

# ============================================
# STAGE 1: Base - Image de base Alpine
# ============================================
FROM node:${NODE_VERSION}-alpine AS base

# Métadonnées OCI
LABEL maintainer="HelpDigiSchool Team <contact@helpdigischool.cm>"
LABEL description="Frontend Next.js pour HelpDigiSchool - Gestion scolaire moderne"
LABEL org.opencontainers.image.source="https://github.com/helpdigischool/frontend"
LABEL org.opencontainers.image.title="Help Digi School Frontend"
LABEL org.opencontainers.image.description="Application Next.js pour la gestion scolaire"
LABEL org.opencontainers.image.vendor="HelpDigiSchool"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.revision="${VCS_REF}"
LABEL org.opencontainers.image.version="${VERSION}"

# Installation des dépendances système avec sécurité
RUN apk update && apk upgrade && \
    apk add --no-cache \
    libc6-compat \
    curl \
    wget \
    ca-certificates \
    tzdata \
    dumb-init \
    && rm -rf /var/cache/apk/* /tmp/*

# Configuration npm pour performance et sécurité
RUN npm config set fund false && \
    npm config set audit false && \
    npm config set update-notifier false

# Timezone
ENV TZ=Africa/Douala

WORKDIR /app

# ============================================
# STAGE 2: Dependencies - Installation des modules
# ============================================
FROM base AS deps

# Copie des fichiers de dépendances uniquement
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* ./

# Installation des dépendances avec détection automatique du gestionnaire
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.yarn \
    --mount=type=cache,target=/root/.pnpm-store \
    if [ -f bun.lockb ]; then \
        npm install -g bun && bun install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm ci --legacy-peer-deps --prefer-offline; \
    elif [ -f yarn.lock ]; then \
        corepack enable && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable && pnpm install --frozen-lockfile; \
    else \
        npm install --legacy-peer-deps; \
    fi

# ============================================
# STAGE 3: Dependencies de production uniquement
# ============================================
FROM base AS deps-prod

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* ./

RUN --mount=type=cache,target=/root/.npm \
    if [ -f bun.lockb ]; then \
        npm install -g bun && bun install --frozen-lockfile --production; \
    elif [ -f package-lock.json ]; then \
        npm ci --legacy-peer-deps --prefer-offline --omit=dev; \
    elif [ -f yarn.lock ]; then \
        corepack enable && yarn install --frozen-lockfile --production; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable && pnpm install --frozen-lockfile --prod; \
    else \
        npm install --legacy-peer-deps --omit=dev; \
    fi

# ============================================
# STAGE 4: Development - Environnement de développement
# ============================================
FROM base AS development

WORKDIR /app

# Arguments de build
ARG ENVIRONMENT=development

# Copie des node_modules depuis deps
COPY --from=deps /app/node_modules ./node_modules

# Copie du code source
COPY . .

# Scripts Docker
RUN mkdir -p /app/docker/scripts && \
    if [ -d "docker/scripts" ]; then \
        chmod +x docker/scripts/*.sh 2>/dev/null || true; \
    fi

# Variables d'environnement développement
ENV NODE_ENV=development \
    ENVIRONMENT=${ENVIRONMENT} \
    NEXT_TELEMETRY_DISABLED=1 \
    WATCHPACK_POLLING=true \
    CHOKIDAR_USEPOLLING=true \
    PORT=3000

# Port principal
EXPOSE 3000

# Port debugger Node.js
EXPOSE 9229

# Healthcheck développement (plus tolérant)
HEALTHCHECK --interval=60s --timeout=15s --start-period=120s --retries=5 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Commande de démarrage
CMD ["npm", "run", "dev"]

# ============================================
# STAGE 5: Builder - Build de production
# ============================================
FROM base AS builder

WORKDIR /app

# Arguments de build
ARG ENVIRONMENT=production
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_APP_NAME

# Copie des node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copie du code source
COPY . .

# Variables d'environnement pour le build
ENV NODE_ENV=production \
    ENVIRONMENT=${ENVIRONMENT} \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
    NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}

# Build de l'application avec cache
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# ============================================
# STAGE 6: Production - Image finale optimisée
# ============================================
FROM node:${NODE_VERSION}-alpine AS production

# Arguments de build
ARG ENVIRONMENT=production
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=latest

# Labels de production
LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.environment="${ENVIRONMENT}"

# Installation minimale pour production avec sécurité
RUN apk update && apk upgrade && \
    apk add --no-cache \
    wget \
    ca-certificates \
    tini \
    tzdata \
    && rm -rf /var/cache/apk/* /tmp/* \
    # Suppression des utilisateurs inutiles pour sécurité
    && deluser --remove-home daemon 2>/dev/null || true \
    && deluser --remove-home lp 2>/dev/null || true

WORKDIR /app

# Création d'un utilisateur non-root avec UID/GID fixes
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

# Variables d'environnement production
ENV NODE_ENV=production \
    ENVIRONMENT=${ENVIRONMENT} \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    TZ=Africa/Douala

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

# Security: Suppression des fichiers sensibles
RUN rm -rf \
    /app/.git \
    /app/.env* \
    /app/*.md \
    /app/node_modules \
    2>/dev/null || true

# Passage à l'utilisateur non-root
USER nextjs

# Port d'écoute
EXPOSE 3000

# Healthcheck production (strict)
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Utilisation de tini comme init process pour gérer les signaux proprement
ENTRYPOINT ["/sbin/tini", "--"]

# Commande de démarrage
CMD ["node", "server.js"]

# ============================================
# STAGE 7: Production Distroless (Alternative ultra-sécurisée)
# ============================================
# Note: Décommentez pour utiliser une image distroless
# FROM gcr.io/distroless/nodejs20-debian12 AS production-distroless
#
# WORKDIR /app
#
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public
#
# ENV NODE_ENV=production \
#     PORT=3000 \
#     HOSTNAME="0.0.0.0"
#
# EXPOSE 3000
#
# CMD ["server.js"]