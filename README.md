# Help Digi School - Frontend Next.js

## 🏫 À propos
Help Digi School est une plateforme moderne de gestion scolaire conçue pour simplifier le quotidien des établissements éducatifs. Ce frontend est bâti avec **Next.js 16** et **React 19**, optimisé pour une intégration fluide avec un backend **Spring Boot**.

---

## 🏗️ Architecture du Code

Le projet suit une architecture modulaire et typée, prête pour l'échelle :

### 1. Dossiers Principaux
- `src/app/`: Structure de navigation Next.js (App Router). Segmentée en `(auth)`, `(marketing)`, et `dashboard`.
- `src/components/`:
    - `ui/`: Composants atomiques (Shadcn UI).
    - `layout/`: Éléments structurels (Navbar, Sidebar).
    - `dashboard/`: Composants métiers organisés par rôles (Directeur, Professeur, Parent, etc.).
- `src/lib/api/`: Cœur de la communication avec le backend.
- `src/types/models/`: Définitions TypeScript strictes basées sur le domaine métier.

### 2. Flux de Données (API & State)
- **Data Fetching**: Utilisation de `TanStack Query` (React Query) pour le cache et la synchronisation.
- **Client HTTP**: Un `apiClient` centralisé gère l'authentification (Tokens JWT), les timeouts et la gestion globale des erreurs avec notifications.
- **Formulaires**: Gestion robuste via `React Hook Form` et validation de schéma avec `Zod`.

---

## 🛰️ Connexion au Backend Spring Boot

Ce frontend est conçu pour communiquer avec une architecture microservices Spring Boot.

### Configuration
Éditez le fichier `.env.local` pour pointer vers votre API Gateway :
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Endpoints
Tous les endpoints sont centralisés dans `src/lib/api/config.ts`. La structure attendue suit le pattern :
`http://{gateway}:{port}/api/v1/{service}/{resource}`

---

## 🛠️ Développement & CI/CD

### Commandes Utiles (Makefile)
Le projet inclut un `Makefile` pour simplifier les opérations récurrentes :
- `make dev`: Lancer le serveur de développement local.
- `make build`: Builder l'application pour la production.
- `make lint`: Vérifier la qualité du code.

### Pipeline CI/CD
Une pipeline GitHub Actions est configurée (`.github/workflows/ci.yml`) pour valider chaque commit :
1. **Linting** : Vérification des règles de style.
2. **Type Checking** : Validation de la cohérence TypeScript.
3. **Build** : Vérification que l'application peut être compilée sans erreur.

---

## 🎨 Design System
Le design utilise **Tailwind CSS** avec un thème personnalisé supportant le mode sombre et des composants accessibles basés sur **Radix UI**.