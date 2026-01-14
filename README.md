# Help Digi School - Frontend

<div align="center">

![Help Digi School](https://img.shields.io/badge/Help_Digi_School-v1.0.0-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Plateforme SaaS de gestion scolaire pour les écoles primaires et secondaires**

[Demo](#demo) • [Installation](#installation) • [Documentation](#documentation) • [Contribution](#contribution)

</div>

---

## Table des matières

- [Apercu](#apercu)
- [Fonctionnalites](#fonctionnalites)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prerequis](#prerequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du projet](#structure-du-projet)
- [Commandes Makefile](#commandes-makefile)
- [Developpement](#developpement)
- [Authentification Mock](#authentification-mock)
- [API Routes](#api-routes)
- [Deploiement](#deploiement)
- [Monitoring](#monitoring)
- [Tests](#tests)
- [Contribution](#contribution)
- [Equipe](#equipe)
- [Licence](#licence)

---

## Apercu

Help Digi School est une plateforme complete de gestion scolaire permettant aux etablissements de :
- Gerer les eleves, enseignants et personnel administratif
- Suivre les notes et bulletins scolaires
- Gerer les paiements et frais de scolarite
- Communiquer avec les parents via SMS/email
- Generer des rapports et statistiques

---

## Fonctionnalites

### Multi-roles
| Role | Fonctionnalites |
|------|-----------------|
| **Admin** | Gestion globale des ecoles, utilisateurs, abonnements |
| **Directeur** | Gestion complete de l'etablissement |
| **Enseignant** | Saisie des notes, gestion des cours, suivi des eleves |
| **Secretaire** | Inscriptions, paiements, documents administratifs |
| **Parent** | Suivi des enfants, bulletins, paiements |
| **Eleve** | Notes, emploi du temps, devoirs |

### Modules principaux
- **Gestion des eleves** - Inscriptions, dossiers, suivi
- **Gestion des notes** - Saisie, bulletins, moyennes
- **Gestion financiere** - Paiements, frais, rapports
- **Communication** - Messages, notifications SMS/email
- **Emploi du temps** - Planning, cours, absences
- **Documents** - Certificats, attestations, impressions

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Pages     │  │ Components  │  │   Hooks     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                           │                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │              Auth Context (Mock/API)             │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY (Future)                       │
│                   Spring Boot + JWT                          │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  Auth Service │  │ School Service│  │ Grade Service │
└───────────────┘  └───────────────┘  └───────────────┘
```

---

## Technologies

### Frontend
| Technologie | Version | Description |
|-------------|---------|-------------|
| Next.js | 16.1.1 | Framework React avec SSR/SSG |
| React | 19.2.3 | Bibliotheque UI |
| TypeScript | 5.8.3 | Typage statique |
| TailwindCSS | 3.4.17 | Framework CSS utility-first |
| Radix UI | Latest | Composants accessibles |
| React Query | 5.83.0 | Gestion du state serveur |
| React Hook Form | 7.61.1 | Gestion des formulaires |
| Zod | 3.25.76 | Validation de schemas |
| Recharts | 2.15.4 | Graphiques et charts |
| Lucide React | 0.462.0 | Icones |

### Outils
| Outil | Usage |
|-------|-------|
| ESLint | Linting |
| PM2 | Process Manager |
| Docker | Conteneurisation |
| Traefik | Reverse Proxy |
| Loki | Agregation de logs |
| Grafana | Monitoring & Dashboards |

---

## Prerequis

- **Node.js** >= 18.x
- **npm** >= 9.x ou **yarn** >= 1.22 ou **bun** >= 1.x
- **Docker** >= 24.x (pour le deploiement)
- **Docker Compose** >= 2.x

---

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/your-org/helpdigischool.git
cd helpdigischool
```

### 2. Installer les dependances

```bash
# Avec npm
npm install

# Avec yarn
yarn install

# Avec bun (recommande)
bun install
```

### 3. Configurer l'environnement

```bash
# Copier le fichier d'environnement
cp .env.example .env.local

# Editer les variables selon votre environnement
nano .env.local
```

### 4. Lancer le serveur de developpement

```bash
npm run dev
# ou
yarn dev
# ou
bun dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

---

## Configuration

### Variables d'environnement

| Variable | Description | Defaut |
|----------|-------------|--------|
| `NEXT_PUBLIC_APP_NAME` | Nom de l'application | Help Digi School |
| `NEXT_PUBLIC_APP_URL` | URL de l'application | http://localhost:3000 |
| `NEXT_PUBLIC_API_URL` | URL de l'API backend | http://localhost:8080/api/v1 |
| `NEXT_PUBLIC_API_TIMEOUT` | Timeout API (ms) | 30000 |
| `NEXT_PUBLIC_SESSION_DURATION` | Duree de session (s) | 3600 |
| `NEXT_PUBLIC_ENABLE_NOTIFICATIONS` | Activer notifications | true |
| `NEXT_PUBLIC_ENABLE_DARK_MODE` | Activer mode sombre | true |

### Fichiers d'environnement

```
.env.local          # Developpement local
.env.preprod        # Pre-production
.env.production     # Production
```

---

## Structure du projet

```
helpdigischool/
├── docker/                     # Configuration Docker
│   ├── compose/               # Docker Compose files
│   ├── scripts/               # Scripts (entrypoint, healthcheck)
│   └── Dockerfile
├── infrastructure/            # Infrastructure
│   ├── traefik/              # Reverse proxy
│   └── monitoring/           # Stack de monitoring
│       ├── loki/             # Loki config
│       ├── promtail/         # Promtail config
│       ├── grafana/          # Grafana provisioning
│       └── docker-compose.yml
├── public/                    # Assets statiques
├── src/
│   ├── app/                   # App Router (Next.js 13+)
│   │   ├── (auth)/           # Routes authentification
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (marketing)/      # Pages marketing
│   │   │   ├── features/
│   │   │   ├── pricing/
│   │   │   └── contact/
│   │   ├── api/              # API Routes
│   │   │   ├── auth/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   ├── classes/
│   │   │   ├── grades/
│   │   │   └── payments/
│   │   └── dashboard/        # Dashboards par role
│   │       ├── admin/
│   │       ├── director/
│   │       ├── teacher/
│   │       ├── secretary/
│   │       ├── parent/
│   │       └── student/
│   ├── components/
│   │   ├── ui/               # Composants UI (shadcn/ui)
│   │   ├── dashboard/        # Composants dashboard
│   │   │   ├── shared/       # TopBar, Sidebar, StatCard
│   │   │   ├── admin/
│   │   │   ├── director/
│   │   │   ├── teacher/
│   │   │   ├── secretary/
│   │   │   ├── parent/
│   │   │   └── student/
│   │   ├── landing/          # Composants landing page
│   │   └── layout/           # Layouts
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilitaires
│   │   ├── api/             # Client API & config
│   │   └── auth/            # Contexte authentification
│   └── types/               # Types TypeScript
│       ├── api/             # Types API
│       └── models/          # Types modeles
├── .env.example
├── .env.local
├── ecosystem.config.js        # Config PM2
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Commandes Makefile

Le projet utilise un Makefile pour simplifier les operations de developpement, deploiement et monitoring.

### Afficher l'aide

```bash
make help
```

### Developpement local (sans Docker)

| Commande | Description |
|----------|-------------|
| `make install` | Installer les dependances npm |
| `make dev` | Demarrer le serveur de developpement |
| `make start` | Build et demarrer en production locale |
| `make lint` | Lancer ESLint |
| `make lint-fix` | Lancer ESLint avec correction automatique |
| `make test` | Lancer les tests |
| `make typecheck` | Verifier les types TypeScript |

### Developpement Docker

| Commande | Description |
|----------|-------------|
| `make build-dev` | Build l'image de developpement |
| `make up-dev` | Demarrer le container dev (http://localhost:3000) |
| `make down-dev` | Arreter le container dev |
| `make logs-dev` | Afficher les logs dev |
| `make shell-dev` | Shell dans le container dev |
| `make restart-dev` | Redemarrer le container dev |
| `make lint-dev` | Lancer le linter dans le container |

### Pre-Production

| Commande | Description |
|----------|-------------|
| `make build-preprod` | Build l'image pre-production |
| `make up-preprod` | Demarrer le container preprod (http://localhost:32031) |
| `make down-preprod` | Arreter le container preprod |
| `make logs-preprod` | Afficher les logs preprod |
| `make restart-preprod` | Redemarrer le container preprod |
| `make shell-preprod` | Shell dans le container preprod |
| `make deploy-preprod` | Deploiement complet preprod (down + build + up + health) |

### Production

| Commande | Description |
|----------|-------------|
| `make build-prod` | Build l'image production |
| `make up-prod` | Demarrer le container prod |
| `make down-prod` | Arreter le container prod |
| `make logs-prod` | Afficher les logs prod |
| `make restart-prod` | Redemarrer le container prod |
| `make shell-prod` | Shell dans le container prod |
| `make deploy-prod` | Deploiement complet prod (down + build + up + health) |

### Multi-Environnements

| Commande | Description |
|----------|-------------|
| `make up-all` | Demarrer tous les environnements (dev, preprod, prod) |
| `make down-all` | Arreter tous les environnements |
| `make logs-all` | Afficher les logs de tous les containers |

### Monitoring et Status

| Commande | Description |
|----------|-------------|
| `make status` | Afficher l'etat des containers |
| `make stats` | Statistiques des containers (CPU, RAM) |
| `make health` | Verifier la sante des containers |
| `make health-check URL=<url>` | Verifier un endpoint specifique |

### Docker Registry

| Commande | Description |
|----------|-------------|
| `make push` | Push les images vers le registry |
| `make push-preprod` | Push l'image pre-production |
| `make pull` | Pull la derniere image |
| `make version` | Afficher la version actuelle |

### Nettoyage

| Commande | Description |
|----------|-------------|
| `make clean` | Nettoyer tous les containers |
| `make clean-images` | Nettoyer les images Docker |
| `make prune` | Nettoyer TOUTES les ressources Docker (attention!) |

### Exemple de workflow complet

```bash
# 1. Installation et developpement local
make install
make dev

# 2. Deploiement en pre-production
make deploy-preprod

# 3. Verifier les logs
make logs-preprod

# 4. Deploiement en production
make deploy-prod

# 5. Monitoring
make status
make health
```

---

## Developpement

### Scripts disponibles

```bash
# Developpement
npm run dev          # Serveur de dev avec hot-reload

# Build
npm run build        # Build de production
npm run start        # Demarrer le build de production

# Linting
npm run lint         # Verifier le code avec ESLint
```

### Conventions de code

- **Composants** : PascalCase (`UserProfile.tsx`)
- **Hooks** : camelCase avec prefixe `use` (`useAuth.ts`)
- **Utilitaires** : camelCase (`formatDate.ts`)
- **Types** : PascalCase (`User`, `LoginRequest`)
- **CSS** : TailwindCSS utility classes

### Ajouter un nouveau composant

```tsx
// src/components/dashboard/shared/NewComponent.tsx
'use client'

import { useState } from 'react'

interface NewComponentProps {
  title: string
}

export function NewComponent({ title }: NewComponentProps) {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-100">
      <h3 className="font-semibold">{title}</h3>
    </div>
  )
}
```

---

## Authentification Mock

En l'absence d'API backend, l'authentification fonctionne en mode mock.

### Comptes de test disponibles

| Role | Email | Mot de passe | Dashboard |
|------|-------|--------------|-----------|
| Admin | admin@helpdigischool.com | admin123 | /dashboard/admin |
| Directeur | directeur@ecole.cm | directeur123 | /dashboard/director |
| Enseignant | enseignant@ecole.cm | enseignant123 | /dashboard/teacher |
| Secretaire | secretaire@ecole.cm | secretaire123 | /dashboard/secretary |
| Parent | parent@email.cm | parent123 | /dashboard/parent |
| Eleve | eleve@ecole.cm | eleve123 | /dashboard/student |

### Activer l'API reelle

Pour connecter a un vrai backend, modifiez `src/lib/auth/auth-context.tsx` :

```typescript
// Remplacer l'authentification mock par des appels API reels
const login = useCallback(async (credentials: LoginRequest) => {
  const response = await apiClient.post<LoginResponse>(
    API_ENDPOINTS.auth.login,
    credentials
  )
  // ... reste du code
}, [])
```

---

## API Routes

### Endpoints disponibles

| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Connexion |
| POST | `/api/auth/register` | Inscription ecole |
| POST | `/api/auth/logout` | Deconnexion |
| GET | `/api/auth/me` | Utilisateur courant |
| GET | `/api/students` | Liste des eleves |
| GET | `/api/teachers` | Liste des enseignants |
| GET | `/api/classes` | Liste des classes |
| GET | `/api/grades` | Liste des notes |
| GET | `/api/payments` | Liste des paiements |
| GET | `/api/health` | Health check |

---

## Deploiement

### Avec Docker

```bash
# Build l'image
docker build -f docker/Dockerfile -t helpdigischool:latest .

# Lancer le conteneur
docker run -p 3000:3000 helpdigischool:latest
```

### Avec Docker Compose

```bash
# Developpement
docker compose -f docker/compose/docker-compose.dev.yml up -d

# Production
docker compose -f docker/compose/docker-compose.prod.yml up -d
```

### Avec PM2

```bash
# Installer PM2 globalement
npm install -g pm2

# Build l'application
npm run build

# Demarrer avec PM2
pm2 start ecosystem.config.js

# Voir les logs
pm2 logs helpdigischool

# Monitoring
pm2 monit
```

---

## Monitoring

### Stack de monitoring (Loki + Grafana + Promtail)

La stack de monitoring est situee dans `infrastructure/monitoring/`.

```bash
# Demarrer le stack de monitoring
cd infrastructure/monitoring
docker compose up -d
```

### Architecture du monitoring

```
infrastructure/monitoring/
├── docker-compose.yml        # Orchestration des services
├── loki/
│   └── loki-config.yml      # Configuration Loki
├── promtail/
│   └── promtail-config.yml  # Configuration Promtail (collecte de logs)
└── grafana/
    └── provisioning/
        ├── datasources/     # Sources de donnees auto-configurees
        └── dashboards/      # Dashboards pre-configures
```

### Services inclus

| Service | URL | Credentials | Description |
|---------|-----|-------------|-------------|
| Grafana | http://localhost:3001 | admin / admin | Visualisation et dashboards |
| Loki | http://localhost:3100 | - | Agregation des logs |
| Promtail | - | - | Collecte des logs (PM2, Docker) |
| Node Exporter | http://localhost:9100 | - | Metriques systeme |

### Dashboards Grafana disponibles

- **Application Logs** - Logs de l'application Next.js
- **Performance Metrics** - Metriques de performance
- **Error Tracking** - Suivi des erreurs

### Configuration des logs PM2

Les logs PM2 sont automatiquement collectes par Promtail depuis:
- `logs/pm2/out-*.log` - Logs standard
- `logs/pm2/error-*.log` - Logs d'erreur

### Commandes utiles

```bash
# Demarrer le monitoring
cd infrastructure/monitoring && docker compose up -d

# Voir les logs du stack
cd infrastructure/monitoring && docker compose logs -f

# Arreter le monitoring
cd infrastructure/monitoring && docker compose down

# Redemarrer un service specifique
cd infrastructure/monitoring && docker compose restart grafana
```

---

## Tests

```bash
# Lancer les tests (a configurer)
npm run test

# Tests avec couverture
npm run test:coverage
```

---

## Contribution

### Workflow Git

1. Creer une branche feature
```bash
git checkout -b feature/ma-nouvelle-feature
```

2. Commiter les changements
```bash
git add .
git commit -m "feat: description de la feature"
```

3. Pousser et creer une MR
```bash
git push origin feature/ma-nouvelle-feature
```

### Convention de commits

```
feat:     Nouvelle fonctionnalite
fix:      Correction de bug
docs:     Documentation
style:    Formatage (pas de changement de code)
refactor: Refactorisation
test:     Ajout de tests
chore:    Maintenance
```

---

## Equipe

### Developpement Frontend

| Nom | Role | Contact |
|-----|------|---------|
| **IVANA YOH** | Lead Developer Frontend | - |

### Stack technique

- **Frontend** : Next.js, React, TypeScript, TailwindCSS
- **Backend** : Spring Boot (API - a developper)
- **Infrastructure** : Docker, Traefik, PM2
- **Monitoring** : Loki, Grafana, Promtail

---

## Licence

Ce projet est proprietaire. Tous droits reserves.

---

## Support

Pour toute question ou support :
- Creer une issue sur le repository
- Contacter l'equipe de developpement

---

<div align="center">

**Help Digi School** - Plateforme de gestion scolaire moderne

Made with love by **IVANA YOH**

</div>