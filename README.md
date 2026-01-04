# Help Digi School - Frontend Next.js

Plateforme SaaS #1 pour la gestion des ecoles primaires au Cameroun.

## Table des matieres

- [Technologies](#technologies)
- [Architecture](#architecture)
- [Installation](#installation)
- [Docker](#docker)
- [API Backend](#api-backend)
- [Structure du Projet](#structure-du-projet)
- [Monitoring](#monitoring)
- [Deploiement](#deploiement)

---

## Technologies

| Categorie | Technologie | Version |
|-----------|-------------|---------|
| Framework | Next.js | 16.1.1 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.8.3 |
| Styling | Tailwind CSS | 3.4.17 |
| Components | shadcn/ui + Radix UI | Latest |
| State | TanStack Query | 5.83.0 |
| Forms | React Hook Form + Zod | 7.61.1 |
| Icons | Lucide React | 0.462.0 |
| Charts | Recharts | 2.15.4 |

---

## Architecture

### Architecture Globale

```
                    ┌─────────────────────────────────────────┐
                    │           FRONTEND (Next.js)            │
                    │         Port: 3000                      │
                    └─────────────────┬───────────────────────┘
                                      │
                                      │ HTTP/REST
                                      ▼
                    ┌─────────────────────────────────────────┐
                    │         API GATEWAY (Spring Boot)       │
                    │         Port: 8080                      │
                    │         /api/v1/*                       │
                    └─────────────────┬───────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Auth Service   │       │  School Service │       │ Payment Service │
│  /api/v1/auth   │       │  /api/v1/schools│       │ /api/v1/payments│
└─────────────────┘       └─────────────────┘       └─────────────────┘
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ Student Service │       │ Teacher Service │       │  Grade Service  │
│ /api/v1/students│       │ /api/v1/teachers│       │  /api/v1/grades │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### Architecture Frontend (Feature-Based)

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Routes authentification
│   │   ├── login/
│   │   └── register/
│   ├── (marketing)/              # Routes publiques
│   │   ├── features/
│   │   ├── pricing/
│   │   └── contact/
│   ├── dashboard/                # Routes protegees par role
│   │   ├── admin/                # Dashboard Admin SaaS
│   │   │   └── schools/
│   │   ├── director/             # Dashboard Directeur
│   │   ├── teacher/              # Dashboard Enseignant
│   │   │   ├── attendance/
│   │   │   ├── courses/
│   │   │   ├── grades/
│   │   │   └── students/
│   │   ├── parent/               # Dashboard Parent
│   │   │   ├── children/
│   │   │   ├── grades/
│   │   │   ├── payments/
│   │   │   ├── schedule/
│   │   │   ├── reports/
│   │   │   ├── messages/
│   │   │   └── settings/
│   │   └── secretary/            # Dashboard Secretaire
│   ├── api/                      # API Routes Next.js
│   │   └── health/               # Health check endpoint
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── dashboard/                # Composants par role
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── pages/
│   │   ├── teacher/
│   │   │   ├── TeacherDashboard.tsx
│   │   │   └── pages/
│   │   ├── parent/
│   │   │   ├── ParentDashboard.tsx
│   │   │   └── pages/
│   │   │       ├── ChildrenPage.tsx
│   │   │       ├── GradesPage.tsx
│   │   │       ├── PaymentsPage.tsx
│   │   │       └── ...
│   │   ├── director/
│   │   ├── secretary/
│   │   └── shared/               # Composants partages
│   │       ├── Sidebar.tsx
│   │       ├── TopBar.tsx
│   │       ├── StatCard.tsx
│   │       └── Pagination.tsx
│   │
│   ├── landing/                  # Sections landing page
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── ...
│   │
│   ├── layout/                   # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   │
│   └── ui/                       # shadcn/ui (50+ composants)
│
├── lib/
│   ├── api/                      # Configuration API
│   │   ├── config.ts             # Endpoints des microservices
│   │   ├── client.ts             # Client HTTP (fetch)
│   │   └── index.ts
│   └── utils.ts                  # Utilitaires (cn, etc.)
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
└── types/
    ├── models/                   # Types du domaine
    │   ├── user.ts
    │   ├── student.ts
    │   ├── teacher.ts
    │   ├── grade.ts
    │   ├── payment.ts
    │   └── ...
    └── api/                      # Types des reponses API
        ├── auth.ts
        ├── common.ts
        └── ...
```

---

## Installation

### Prerequis

- Node.js 20+
- npm ou yarn
- Docker & Docker Compose (pour conteneurisation)

### Installation locale

```bash
# Cloner le projet
git clone https://github.com/helpdigischool/frontend.git
cd frontend

# Installer les dependances
npm ci --legacy-peer-deps

# Copier le fichier d'environnement
cp .env.example .env.local

# Lancer en developpement
npm run dev
```

L'application sera accessible sur http://localhost:3000

---

## Docker

### Commandes Makefile

```bash
# Voir toutes les commandes disponibles
make help

# === DEVELOPPEMENT ===
make build-dev     # Build l'image de developpement
make up-dev        # Demarre en mode developpement
make down-dev      # Arrete l'environnement de developpement
make logs-dev      # Affiche les logs

# === PRODUCTION ===
make build-prod    # Build l'image de production
make up-prod       # Demarre en mode production
make down-prod     # Arrete l'environnement de production
make logs-prod     # Affiche les logs

# === GENERAL ===
make build         # Build dev + prod
make down          # Arrete tous les conteneurs
make clean         # Nettoie les conteneurs et images
make shell         # Ouvre un shell dans le conteneur
make status        # Affiche le statut des conteneurs
make stats         # Statistiques des conteneurs
```

### Utilisation directe Docker Compose

```bash
# Developpement
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml logs -f
docker-compose -f docker-compose.dev.yml down

# Production
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml logs -f
docker-compose -f docker-compose.prod.yml down
```

### Build manuel de l'image

```bash
# Build developpement
docker build --target development -t helpdigischool/frontend:dev .

# Build production
docker build --target production -t helpdigischool/frontend:latest .

# Run manuel
docker run -p 3000:3000 --env-file .env.local helpdigischool/frontend:latest
```

---

## API Backend

### Point d'entree

Le frontend communique avec les microservices Spring Boot via une API Gateway unique:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Endpoints principaux

| Service | Endpoint | Description |
|---------|----------|-------------|
| Auth | `/api/v1/auth/*` | Authentification, tokens |
| Users | `/api/v1/users/*` | Gestion utilisateurs |
| Schools | `/api/v1/schools/*` | Gestion ecoles |
| Students | `/api/v1/students/*` | Gestion eleves |
| Teachers | `/api/v1/teachers/*` | Gestion enseignants |
| Parents | `/api/v1/parents/*` | Gestion parents |
| Classes | `/api/v1/classes/*` | Gestion classes |
| Grades | `/api/v1/grades/*` | Notes |
| Attendance | `/api/v1/attendance/*` | Presences |
| Payments | `/api/v1/payments/*` | Paiements |
| Messages | `/api/v1/messages/*` | Messagerie |
| Bulletins | `/api/v1/bulletins/*` | Bulletins scolaires |

### Configuration API

La configuration complete des endpoints se trouve dans:
```
src/lib/api/config.ts
```

### Exemple d'utilisation

```typescript
import { apiClient, API_ENDPOINTS } from '@/lib/api';

// GET request
const students = await apiClient.get(API_ENDPOINTS.students.base);

// POST request
const newStudent = await apiClient.post(API_ENDPOINTS.students.base, {
  firstName: 'Jean',
  lastName: 'Dupont',
  classId: '123'
});

// GET avec parametre
const grades = await apiClient.get(API_ENDPOINTS.grades.byStudent('student-id'));
```

---

## Variables d'Environnement

### Developpement (.env.local)

```env
NEXT_PUBLIC_APP_NAME=Help Digi School (Dev)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
FRONTEND_PORT=3000
```

### Production (.env.production)

```env
NEXT_PUBLIC_APP_NAME=Help Digi School
NEXT_PUBLIC_APP_URL=https://app.helpdigischool.com
NEXT_PUBLIC_API_URL=https://api.helpdigischool.com/api/v1
FRONTEND_PORT=3000
VERSION=1.0.0
```

---

## Monitoring

### Outils recommandes

#### 1. Sentry (Erreurs & Performance)
```bash
npm install @sentry/nextjs
```

Configuration:
```env
SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

Fonctionnalites:
- Capture automatique des erreurs
- Performance monitoring
- Session replay
- Source maps

#### 2. Vercel Analytics (Si deploye sur Vercel)
```bash
npm install @vercel/analytics @vercel/speed-insights
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### 3. LogRocket (Session Recording)
```bash
npm install logrocket
```

Fonctionnalites:
- Enregistrement des sessions utilisateur
- Replay des bugs
- Integration avec Sentry

#### 4. Prometheus + Grafana (Infrastructure)

Pour le monitoring des conteneurs Docker:
```yaml
# docker-compose.monitoring.yml
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
```

#### 5. Lighthouse CI (Performance)
```bash
npm install -D @lhci/cli
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/"]
    },
    "assert": {
      "preset": "lighthouse:recommended"
    }
  }
}
```

### Health Check

Un endpoint de health check est disponible:

```
GET /api/health
```

Reponse:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-04T12:00:00.000Z",
  "service": "helpdigischool-frontend",
  "version": "1.0.0"
}
```

---

## Deploiement

### Vercel (Recommande)

```bash
npm install -g vercel
vercel
```

### Docker (Self-hosted)

```bash
# Build et push
make build-prod
docker tag helpdigischool/frontend:latest your-registry/helpdigischool/frontend:latest
docker push your-registry/helpdigischool/frontend:latest

# Sur le serveur
docker pull your-registry/helpdigischool/frontend:latest
make up-prod
```

### Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helpdigischool-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: helpdigischool/frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "https://api.helpdigischool.com/api/v1"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
```

---

## Scripts npm

```bash
npm run dev      # Serveur de developpement (Turbopack)
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # Linter ESLint
```

---

## Fonctionnalites

### Gestion Scolaire
- Notes et bulletins PDF
- Paiements Mobile Money (MTN MoMo, Orange Money)
- Gestion des eleves et classes
- Communication avec les parents
- Statistiques et rapports

### Interface
- Design moderne et responsive
- Mode sombre/clair
- Animations fluides
- Accessibilite WCAG

### Technique
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- SEO optimise avec Metadata API
- Formulaires valides avec Zod
- Turbopack pour builds rapides

---

## Contribution

1. Fork le projet
2. Creez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## License

(c) 2025 Help Digi School. Tous droits reserves.

---

## Contact

- **Email**: contact@helpdigischool.cm
- **Telephone**: +237 6 00 00 00 00
- **Adresse**: Douala, Cameroun

---

**Version**: 1.0.0 | **Next.js**: 16.1.1 | **React**: 19.2.3