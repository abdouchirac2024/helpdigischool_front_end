# Docker - Help Digi School

Configuration Docker complète pour le projet Help Digi School avec support multi-environnement.

## Table des matières

- [Structure](#structure)
- [Dockerfiles](#dockerfiles)
- [Quick Start](#quick-start)
- [Environnements](#environnements)
- [Commandes Make](#commandes-make)
- [Variables d'environnement](#variables-denvironnement)
- [Health Checks](#health-checks)
- [Networking](#networking)
- [Troubleshooting](#troubleshooting)

---

## Structure

```
docker/
├── Dockerfile              # Multi-stage (legacy, garde pour compatibilité)
├── Dockerfile.dev          # Environnement développement
├── Dockerfile.preprod      # Environnement pre-production
├── Dockerfile.prod         # Environnement production
├── compose/
│   ├── docker-compose.yml      # Configuration de base (commune)
│   ├── docker-compose.dev.yml  # Override développement
│   ├── docker-compose.preprod.yml
│   └── docker-compose.prod.yml
├── scripts/
│   ├── healthcheck.sh          # Script de vérification santé
│   ├── entrypoint.sh           # Point d'entrée container
│   ├── wait-for-it.sh          # Attente de services
│   └── validate-infra.sh       # Validation infrastructure
└── README.md
```

---

## Dockerfiles

### Dockerfile.dev (Développement)

- Hot-reload activé (WATCHPACK_POLLING)
- Port debug 9229 exposé
- Toutes les dépendances (dev + prod)
- Healthcheck tolérant

```bash
docker build -f docker/Dockerfile.dev -t helpdigischool/frontend:dev .
```

### Dockerfile.preprod (Pre-Production)

- Build optimisé multi-stage
- Utilisateur non-root
- Tini comme init process
- Healthcheck strict

```bash
docker build -f docker/Dockerfile.preprod -t helpdigischool/frontend:preprod .
```

### Dockerfile.prod (Production)

- Build optimisé avec cache BuildKit
- Labels OCI complets
- Sécurité renforcée
- Image finale ~150MB

```bash
docker build -f docker/Dockerfile.prod \
  --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  --build-arg VERSION=1.0.0 \
  -t helpdigischool/frontend:1.0.0 .
```

---

## Quick Start

### 1. Prérequis

- Docker >= 20.10
- Docker Compose V2
- Make (optionnel)

### 2. Développement

```bash
# Méthode 1: Avec Make (recommandé)
make up-dev

# Méthode 2: Sans Make
docker compose -f docker/compose/docker-compose.yml \
               -f docker/compose/docker-compose.dev.yml up -d
```

### 3. Pre-Production

```bash
make deploy-preprod
# ou
docker compose -f docker/compose/docker-compose.yml \
               -f docker/compose/docker-compose.preprod.yml up -d
```

### 4. Production

```bash
make deploy-prod
# ou
docker compose -f docker/compose/docker-compose.yml \
               -f docker/compose/docker-compose.prod.yml up -d
```

---

## Environnements

| Env | Dockerfile | Port | URL | Traefik |
|-----|------------|------|-----|---------|
| Dev | Dockerfile.dev | 3000 | http://localhost:3000 | helpdigischool.localhost |
| Preprod | Dockerfile.preprod | 32031 | http://localhost:32031 | preprod.helpdigischool.com |
| Prod | Dockerfile.prod | 3000 | - | helpdigischool.com |

### Caractéristiques par environnement

| Caractéristique | Dev | Preprod | Prod |
|-----------------|-----|---------|------|
| Hot-reload | ✅ | ❌ | ❌ |
| Port debug | ✅ (9229) | ❌ | ❌ |
| Replicas | 1 | 1 | 2 |
| User non-root | ❌ | ✅ | ✅ |
| Tini init | ❌ | ✅ | ✅ |
| BuildKit cache | ❌ | ❌ | ✅ |

---

## Commandes Make

```bash
make help              # Afficher toutes les commandes

# Développement
make build-dev         # Build image dev
make up-dev           # Démarrer container dev
make down-dev         # Arrêter container dev
make logs-dev         # Voir les logs
make shell-dev        # Shell dans le container

# Pre-Production
make build-preprod    # Build image preprod
make deploy-preprod   # Déploiement complet

# Production
make build-prod       # Build image prod
make deploy-prod      # Déploiement complet

# Validation
make validate         # Valider toute la configuration
make validate-compose # Valider les fichiers compose

# Monitoring
make status           # État des containers
make status-all       # État tous environnements
make health           # Vérifier la santé
```

---

## Variables d'environnement

### Fichiers .env

```
.env.example          # Template (à copier)
.env.local            # Développement
.env.preprod          # Pre-production
.env.production       # Production
```

### Variables principales

| Variable | Description | Dev | Preprod | Prod |
|----------|-------------|-----|---------|------|
| NODE_ENV | Environnement Node | development | production | production |
| FRONTEND_PORT | Port exposé | 3000 | 32031 | 3000 |
| NEXT_PUBLIC_API_URL | URL API backend | localhost:8080 | api-preprod.* | api.* |
| NEXT_PUBLIC_APP_URL | URL application | localhost:3000 | preprod.* | helpdigischool.com |

---

## Health Checks

### Endpoint

```
GET /api/health
```

### Configuration Docker

| Env | Interval | Timeout | Start Period | Retries |
|-----|----------|---------|--------------|---------|
| Dev | 60s | 15s | 120s | 5 |
| Preprod | 30s | 10s | 30s | 3 |
| Prod | 30s | 10s | 30s | 3 |

### Vérification manuelle

```bash
# Via curl
curl http://localhost:3000/api/health

# Via Make
make health-check URL=http://localhost:3000/api/health
```

---

## Networking

### Réseaux Docker

| Réseau | Usage |
|--------|-------|
| helpdigischool-network-dev | Développement |
| helpdigischool-network-preprod | Pre-production |
| helpdigischool-network-prod | Production |
| traefik-dev | Traefik développement |
| traefik-preprod | Traefik pre-production |
| traefik | Traefik production |

### Ports utilisés

| Port | Service | Env |
|------|---------|-----|
| 3000 | Frontend | Dev/Prod |
| 9229 | Node Debug | Dev |
| 32031 | Frontend | Preprod |
| 80 | Traefik HTTP | All |
| 443 | Traefik HTTPS | All |
| 8080 | Traefik Dashboard | All |

---

## Troubleshooting

### Container ne démarre pas

```bash
# Vérifier les logs
docker compose -f docker/compose/docker-compose.yml \
               -f docker/compose/docker-compose.dev.yml logs -f

# Vérifier la configuration
docker compose -f docker/compose/docker-compose.yml \
               -f docker/compose/docker-compose.dev.yml config
```

### Port déjà utilisé

```bash
# Trouver le processus
lsof -i :3000

# Changer le port (dans .env.local)
FRONTEND_PORT=3001
```

### Problèmes de build

```bash
# Rebuild sans cache
docker compose build --no-cache

# Nettoyer et reconstruire
make clean && make build-dev
```

### Vérifier les images

```bash
# Lister les images
docker images | grep helpdigischool

# Inspecter une image
docker inspect helpdigischool/frontend:dev
```

---

## Sécurité

### Bonnes pratiques appliquées

- ✅ Utilisateur non-root (prod/preprod)
- ✅ Image Alpine minimale
- ✅ Multi-stage builds
- ✅ Suppression des fichiers sensibles
- ✅ Healthcheck configuré
- ✅ Tini comme init process
- ✅ Labels OCI standards
- ✅ No new privileges (Traefik)

### Scanner les vulnérabilités

```bash
# Avec trivy
trivy image helpdigischool/frontend:latest

# Avec Make
make security-scan
```