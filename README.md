# Help Digi School - Frontend

<div align="center">

![Help Digi School](https://img.shields.io/badge/Help_Digi_School-v1.0.0-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

**Plateforme SaaS de gestion scolaire pour les écoles primaires et secondaires du Cameroun**

[Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Déploiement](#-déploiement)

</div>

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Structure du projet](#-structure-du-projet)
- [Technologies](#-technologies)
- [Configuration](#-configuration)
- [Commandes Makefile](#-commandes-makefile)
- [Environnements](#-environnements)
- [Infrastructure](#-infrastructure)
- [Monitoring](#-monitoring)
- [API Routes](#-api-routes)
- [Authentification](#-authentification)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)

---

## 🎯 Aperçu

Help Digi School est une plateforme complète de gestion scolaire permettant aux établissements de :

- **Gérer les élèves** - Inscriptions, dossiers, suivi académique
- **Suivre les notes** - Saisie, bulletins, moyennes automatiques
- **Gérer les paiements** - Frais de scolarité, rapports financiers
- **Communiquer** - Messages, notifications SMS/email
- **Planifier** - Emploi du temps, cours, absences

### Multi-rôles

| Rôle | Accès | Dashboard |
|------|-------|-----------|
| **Admin** | Gestion globale | `/dashboard/admin` |
| **Directeur** | Établissement complet | `/dashboard/director` |
| **Enseignant** | Notes, cours, élèves | `/dashboard/teacher` |
| **Secrétaire** | Inscriptions, paiements | `/dashboard/secretary` |
| **Parent** | Suivi enfants, bulletins | `/dashboard/parent` |
| **Élève** | Notes, emploi du temps | `/dashboard/student` |

---

## 🚀 Quick Start

### Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x (ou yarn/bun)
- **Docker** >= 20.x (optionnel)
- **Make** (optionnel)

### Installation en 3 étapes

```bash
# 1. Cloner le repository
git clone https://github.com/helpdigischool/frontend.git
cd helpdigischool

# 2. Installer les dépendances
npm install --legacy-peer-deps

# 3. Configurer et lancer
cp .env.example .env.local
npm run dev
```

L'application est accessible sur **http://localhost:3000**

### Avec Docker

```bash
# Développement
make up-dev

# Production
make deploy-prod
```

---

## 🏗 Architecture

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Next.js 16)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  App Router  │  │  Components  │  │    Hooks     │  │    Types     │     │
│  │  (src/app)   │  │  (shadcn/ui) │  │  (custom)    │  │ (TypeScript) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                    │                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    Auth Context (Mock / API Client)                    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                              ┌──────┴──────┐
                              │   Traefik   │  (Reverse Proxy + SSL)
                              └──────┬──────┘
                                     │
┌─────────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY (Spring Boot)                            │
│                              (À développer)                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Auth Service   │       │ School Service  │       │ Grade Service   │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### Architecture Docker

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DOCKER INFRASTRUCTURE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                    │
│  │  Frontend   │     │  Frontend   │     │  Frontend   │                    │
│  │    (Dev)    │     │  (Preprod)  │     │   (Prod)    │                    │
│  │  Port 3000  │     │ Port 32031  │     │  Port 3000  │                    │
│  └─────────────┘     └─────────────┘     └─────────────┘                    │
│         │                   │                   │                            │
│         └───────────────────┼───────────────────┘                            │
│                             │                                                │
│                    ┌────────┴────────┐                                       │
│                    │     Traefik     │  (Load Balancer + SSL)                │
│                    │   Ports 80/443  │                                       │
│                    └────────┬────────┘                                       │
│                             │                                                │
│  ┌──────────────────────────┴──────────────────────────┐                    │
│  │              MONITORING STACK                        │                    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │                    │
│  │  │  Grafana │  │   Loki   │  │     Promtail     │   │                    │
│  │  │  :3001   │  │  :3100   │  │  (Log Collector) │   │                    │
│  │  └──────────┘  └──────────┘  └──────────────────┘   │                    │
│  └─────────────────────────────────────────────────────┘                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Structure du projet

```
helpdigischool/
├── docker/                          # 🐳 Configuration Docker
│   ├── Dockerfile                   # Multi-stage (legacy)
│   ├── Dockerfile.dev               # Développement
│   ├── Dockerfile.preprod           # Pre-production
│   ├── Dockerfile.prod              # Production
│   ├── compose/                     # Docker Compose files
│   │   ├── docker-compose.yml       # Base commune
│   │   ├── docker-compose.dev.yml   # Override dev
│   │   ├── docker-compose.preprod.yml
│   │   └── docker-compose.prod.yml
│   ├── scripts/                     # Scripts utilitaires
│   │   ├── healthcheck.sh
│   │   ├── entrypoint.sh
│   │   ├── wait-for-it.sh
│   │   └── validate-infra.sh
│   └── README.md
│
├── infrastructure/                  # 🏭 Infrastructure
│   ├── traefik/                     # Reverse Proxy
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.dev.yml
│   │   ├── docker-compose.preprod.yml
│   │   ├── docker-compose.prod.yml
│   │   ├── traefik.yml              # Config statique
│   │   └── config/
│   │       └── dynamic/             # Config dynamique
│   │           └── middlewares.yml
│   ├── monitoring/                  # Stack Monitoring
│   │   ├── docker-compose.yml
│   │   ├── loki/
│   │   │   └── loki-config.yml
│   │   ├── promtail/
│   │   │   └── promtail-config.yml
│   │   └── grafana/
│   │       └── provisioning/
│   │           ├── datasources/
│   │           └── dashboards/
│   └── README.md
│
├── src/                             # 📦 Code source
│   ├── app/                         # App Router (Next.js)
│   │   ├── (auth)/                  # Routes authentification
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (marketing)/             # Pages marketing
│   │   │   ├── about/
│   │   │   ├── pricing/
│   │   │   ├── features/
│   │   │   └── contact/
│   │   ├── api/                     # API Routes
│   │   │   ├── auth/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   ├── grades/
│   │   │   ├── payments/
│   │   │   └── health/
│   │   └── dashboard/               # Dashboards par rôle
│   │       ├── admin/
│   │       ├── director/
│   │       ├── teacher/
│   │       ├── secretary/
│   │       ├── parent/
│   │       └── student/
│   ├── components/                  # Composants React
│   │   ├── ui/                      # shadcn/ui
│   │   ├── dashboard/               # Composants dashboard
│   │   │   ├── shared/              # TopBar, Sidebar, etc.
│   │   │   ├── admin/
│   │   │   ├── director/
│   │   │   ├── teacher/
│   │   │   ├── secretary/
│   │   │   ├── parent/
│   │   │   └── student/
│   │   ├── landing/                 # Landing page
│   │   └── layout/                  # Navbar, Footer
│   ├── lib/                         # Utilitaires
│   │   ├── api/                     # Client API
│   │   ├── auth/                    # Contexte auth
│   │   └── i18n/                    # Internationalisation
│   ├── types/                       # Types TypeScript
│   ├── constants/                   # Constantes
│   ├── schemas/                     # Schémas Zod
│   └── services/                    # Services
│
├── logs/                            # 📊 Logs (PM2/Docker)
│   └── pm2/
│
├── .gitlab/                         # 🔄 CI/CD GitLab
│   ├── gitlab-ci-preprod.yml
│   └── gitlab-ci-prod.yml
│
├── .env.example                     # Variables d'environnement
├── .env.preprod.example
├── .env.production.example
├── .gitlab-ci.yml                   # Pipeline CI/CD
├── Makefile                         # Commandes DevOps
├── ecosystem.config.js              # Config PM2
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                      # Config Vercel
```

---

## 🛠 Technologies

### Frontend

| Technologie | Version | Description |
|-------------|---------|-------------|
| Next.js | 16.x | Framework React avec App Router |
| React | 19.x | Bibliothèque UI |
| TypeScript | 5.x | Typage statique |
| TailwindCSS | 3.4.x | Framework CSS utility-first |
| Radix UI | Latest | Composants accessibles |
| React Query | 5.x | Gestion du state serveur |
| React Hook Form | 7.x | Gestion des formulaires |
| Zod | 3.x | Validation de schémas |
| Recharts | 2.x | Graphiques |
| Lucide React | Latest | Icônes |

### Infrastructure

| Outil | Usage |
|-------|-------|
| Docker | Conteneurisation |
| Docker Compose | Orchestration |
| Traefik | Reverse Proxy + SSL |
| Loki | Agrégation de logs |
| Grafana | Monitoring & Dashboards |
| Promtail | Collecte de logs |
| PM2 | Process Manager |
| GitLab CI | Pipeline CI/CD |
| Vercel | Déploiement frontend |

---

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NEXT_PUBLIC_APP_NAME` | Nom de l'application | Help Digi School |
| `NEXT_PUBLIC_APP_URL` | URL de l'application | http://localhost:3000 |
| `NEXT_PUBLIC_API_URL` | URL de l'API backend | http://localhost:8080/api/v1 |
| `NEXT_PUBLIC_ENVIRONMENT` | Environnement | development |
| `FRONTEND_PORT` | Port du frontend | 3000 |

### Fichiers d'environnement

```
.env.example          # Template (à copier vers .env.local)
.env.local            # Développement local
.env.preprod          # Pre-production
.env.production       # Production
```

### Configuration rapide

```bash
# Développement
cp .env.example .env.local

# Pre-production
cp .env.preprod.example .env.preprod

# Production
cp .env.production.example .env.production
```

---

## 🎮 Commandes Makefile

Le projet utilise un **Makefile** pour simplifier toutes les opérations DevOps.

```bash
make help              # Afficher toutes les commandes
```

### Développement

| Commande | Description |
|----------|-------------|
| `make dev` | Démarrer en local (sans Docker) |
| `make install` | Installer les dépendances |
| `make lint` | Lancer ESLint |
| `make typecheck` | Vérifier les types TypeScript |
| `make test` | Lancer les tests |

### Docker - Développement

| Commande | Description |
|----------|-------------|
| `make build-dev` | Build image développement |
| `make up-dev` | Démarrer container (http://localhost:3000) |
| `make down-dev` | Arrêter container |
| `make logs-dev` | Afficher les logs |
| `make shell-dev` | Shell dans le container |

### Docker - Pre-Production

| Commande | Description |
|----------|-------------|
| `make build-preprod` | Build image preprod |
| `make up-preprod` | Démarrer (http://localhost:32031) |
| `make deploy-preprod` | Déploiement complet |

### Docker - Production

| Commande | Description |
|----------|-------------|
| `make build-prod` | Build image production |
| `make up-prod` | Démarrer container |
| `make deploy-prod` | Déploiement complet |

### Validation & Monitoring

| Commande | Description |
|----------|-------------|
| `make validate` | Valider toute la configuration |
| `make status` | État des containers |
| `make status-all` | État de tous les environnements |
| `make health` | Vérifier la santé |

### Infrastructure

| Commande | Description |
|----------|-------------|
| `make infra-up` | Démarrer Traefik + Monitoring |
| `make infra-down` | Arrêter l'infrastructure |
| `make monitoring-up` | Démarrer Grafana/Loki |

---

## 🌍 Environnements

| Environnement | Port | URL | Dockerfile | Traefik Host |
|---------------|------|-----|------------|--------------|
| **Dev** | 3000 | http://localhost:3000 | Dockerfile.dev | helpdigischool.localhost |
| **Preprod** | 32031 | http://localhost:32031 | Dockerfile.preprod | preprod.helpdigischool.com |
| **Prod** | 3000 | - | Dockerfile.prod | helpdigischool.com |

### Workflow de déploiement

```bash
# 1. Développement local
make dev

# 2. Test avec Docker
make up-dev

# 3. Déploiement pre-production
make deploy-preprod

# 4. Vérification
make logs-preprod
make health-check URL=http://localhost:32031/api/health

# 5. Déploiement production
make deploy-prod
```

---

## 🏭 Infrastructure

### Traefik (Reverse Proxy)

Traefik gère :
- Load balancing
- SSL/TLS avec Let's Encrypt
- Routage par domaine
- Middlewares de sécurité

```bash
# Démarrer Traefik
cd infrastructure/traefik
docker compose up -d

# Dashboard
http://traefik.localhost:8080  (dev)
https://traefik.helpdigischool.com  (prod)
```

### Configuration Traefik

```yaml
# infrastructure/traefik/traefik.yml
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

providers:
  docker:
    exposedByDefault: false
```

---

## 📊 Monitoring

### Stack complète

| Service | Port | URL | Credentials |
|---------|------|-----|-------------|
| Grafana | 3001 | http://localhost:3001 | admin / admin |
| Loki | 3100 | http://localhost:3100 | - |
| Node Exporter | 9100 | http://localhost:9100 | - |

### Démarrage

```bash
# Démarrer le monitoring
make monitoring-up

# Ou manuellement
cd infrastructure/monitoring
docker compose up -d
```

### Dashboards Grafana

- **Application Logs** - Logs de l'application
- **Performance** - Métriques de performance
- **Error Tracking** - Suivi des erreurs

---

## 🔌 API Routes

### Endpoints disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Connexion |
| POST | `/api/auth/register` | Inscription école |
| POST | `/api/auth/logout` | Déconnexion |
| GET | `/api/auth/me` | Utilisateur courant |
| GET | `/api/students` | Liste des élèves |
| GET | `/api/teachers` | Liste des enseignants |
| GET | `/api/classes` | Liste des classes |
| GET | `/api/grades` | Liste des notes |
| GET | `/api/payments` | Liste des paiements |
| GET | `/api/health` | Health check |

---

## 🔐 Authentification

### Mode Mock (développement)

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@helpdigischool.com | admin123 |
| Directeur | directeur@ecole.cm | directeur123 |
| Enseignant | enseignant@ecole.cm | enseignant123 |
| Secrétaire | secretaire@ecole.cm | secretaire123 |
| Parent | parent@email.cm | parent123 |
| Élève | eleve@ecole.cm | eleve123 |

### Internationalisation

Le projet supporte FR/EN :
- Changement de langue dans la navbar
- Persistance dans localStorage

---

## 📦 Déploiement

### Option 1: Vercel (Recommandé pour le frontend)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Option 2: Docker

```bash
# Build et déploiement production
make deploy-prod

# Avec Traefik
make infra-up
make deploy-prod
```

### Option 3: PM2

```bash
# Build
npm run build

# Démarrer avec PM2
pm2 start ecosystem.config.js

# Monitoring
pm2 monit
```

---

## 🤝 Contribution

### Workflow Git

```bash
# 1. Créer une branche
git checkout -b feature/ma-feature

# 2. Commiter
git commit -m "feat: description"

# 3. Push et MR
git push origin feature/ma-feature
```

### Convention de commits

| Préfixe | Description |
|---------|-------------|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `docs:` | Documentation |
| `style:` | Formatage |
| `refactor:` | Refactorisation |
| `test:` | Tests |
| `chore:` | Maintenance |

---

## 👥 Équipe

| Nom | Rôle |
|-----|------|
| **IVANA YOH** | Lead Developer Frontend |

---

## 📄 Licence

Ce projet est propriétaire. Tous droits réservés.

---

<div align="center">

**Help Digi School** - Plateforme de gestion scolaire moderne

Made with ❤️ au Cameroun

</div>