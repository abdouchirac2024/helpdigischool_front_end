# Architecture des Dashboards - Help Digi School

## Vue d'ensemble

L'application dispose de **5 dashboards différents** adaptés à chaque rôle utilisateur avec un design moderne, responsive et professionnel.

## Structure des Dashboards

### 1. Dashboard Directeur d'École (`/dashboard`)
**Utilisateur:** Directeur/Chef d'établissement

**Fonctionnalités:**
- Vue d'ensemble complète de l'école
- Statistiques: Élèves (342), Paiements, Enseignants (18), Taux de réussite (94%)
- Activités récentes en temps réel
- Répartition des élèves par classe
- Actions rapides: Gérer élèves, Bulletins, Paiements, Notifications

**Menu:**
- Dashboard, Élèves, Classes, Enseignants, Notes & Bulletins, Paiements, Emploi du temps, Statistiques, Notifications, Paramètres

---

### 2. Dashboard Admin SaaS (`/dashboard/admin`)
**Utilisateur:** Super Admin de la plateforme

**Fonctionnalités:**
- Gestion multi-écoles (127 écoles actives)
- Statistiques globales: Écoles, Utilisateurs (2.4k), Revenus (€12,450), Taux d'utilisation (87%)
- Écoles récemment inscrites
- Graphique d'évolution des revenus
- Distribution par région (10 régions du Cameroun)

**Menu:**
- Vue d'ensemble, Écoles, Utilisateurs, Abonnements, Revenus, Analytiques, Base de données, Sécurité, Paramètres

---

### 3. Dashboard Enseignant (`/dashboard/teacher`)
**Utilisateur:** Enseignant

**Fonctionnalités:**
- Gestion de classe (32 élèves)
- Présences du jour (94%)
- Notes à saisir (8 évaluations)
- Moyenne de classe (14.2/20)
- Emploi du temps du jour avec statut (complété, en cours, à venir)
- Top 3 des meilleurs élèves
- Actions rapides: Saisir notes, Présences, Messages, Cours

**Menu:**
- Tableau de bord, Mes élèves, Saisie des notes, Mes cours, Emploi du temps, Présences, Messages, Évaluations

---

### 4. Dashboard Parent (`/dashboard/parent`)
**Utilisateur:** Parent d'élève

**Fonctionnalités:**
- Suivi de plusieurs enfants
- Cartes individuelles par enfant (moyenne, présence)
- Frais scolaires (statut à jour)
- Messages non lus (2)
- Bulletins disponibles (4)
- Dernières notes des enfants
- Historique des paiements
- Événements à venir (réunions, remise bulletins)

**Menu:**
- Tableau de bord, Mes enfants, Bulletins, Notes & Résultats, Paiements, Emploi du temps, Messages

---

### 5. Dashboard Secrétaire (`/dashboard/secretary`)
**Utilisateur:** Secrétaire administrative

**Fonctionnalités:**
- Gestion administrative (342 élèves)
- Nouvelles inscriptions en attente (5)
- Paiements du jour (12 - 450,000 FCFA)
- Rendez-vous du jour (3)
- Liste des inscriptions à traiter
- Paiements récents en temps réel
- Calendrier des rendez-vous
- Actions rapides: Inscription, Paiement, Certificat, Impression

**Menu:**
- Tableau de bord, Élèves, Inscriptions, Paiements, Documents, Contacts, Rendez-vous, Impressions

---

## Composants Partagés

### `Sidebar` (`src/components/dashboard/shared/Sidebar.tsx`)
- Navigation latérale responsive
- Items de menu avec icônes et badges
- État actif avec style violet
- Collapse sur mobile

### `TopBar` (`src/components/dashboard/shared/TopBar.tsx`)
- Barre supérieure fixe
- Logo et nom de l'école
- Notifications avec badge
- Profil utilisateur
- Boutons Paramètres et Déconnexion
- Menu hamburger sur mobile

### `StatCard` (`src/components/dashboard/shared/StatCard.tsx`)
- Cartes de statistiques réutilisables
- Icône colorée avec fond
- Valeur, titre, sous-titre
- Badge de tendance (optionnel)
- Effet hover avec élévation

---

## Design System

### Couleurs
- **Primary:** `#2302B3` (Violet)
- **Secondary:** `#4318FF` (Bleu violet)
- **Success:** Vert
- **Warning:** Orange
- **Danger:** Rouge

### Typographie
- **Titres:** Font-bold, tailles 3xl/2xl/xl
- **Corps:** Font-medium, taille sm/base
- **Labels:** Font-semibold, taille xs/sm

### Espacements
- **Padding conteneur:** `p-6`
- **Gap grilles:** `gap-6`
- **Padding cartes:** `p-6`

### Bordures
- **Radius:** `rounded-2xl` (cartes), `rounded-xl` (boutons/badges)
- **Borders:** `border-gray-100` (cartes), `border-gray-200` (séparateurs)

---

## Responsive Design

### Mobile (< 1024px)
- Sidebar cachée par défaut
- Menu hamburger dans TopBar
- Overlay noir semi-transparent
- Grilles en 1 colonne
- Navigation bottom fixe (landing pages)

### Tablet (1024px - 1280px)
- Sidebar visible
- Grilles en 2 colonnes
- Cartes adaptées

### Desktop (> 1280px)
- Sidebar fixe visible
- Grilles en 3-4 colonnes
- Pleine largeur des composants

---

## Routes

```
/dashboard              → Directeur
/dashboard/admin        → Admin SaaS
/dashboard/teacher      → Enseignant
/dashboard/parent       → Parent
/dashboard/secretary    → Secrétaire
```

---

## Prochaines Étapes

### Fonctionnalités à implémenter:
1. **Authentification & Autorisation**
   - Login avec rôles
   - Protection des routes
   - Gestion des sessions

2. **Pages de détail**
   - Liste des élèves avec recherche/filtres
   - Formulaire de saisie des notes
   - Génération de bulletins PDF
   - Gestion des paiements Mobile Money

3. **Notifications en temps réel**
   - WebSocket/Pusher
   - Notifications push
   - SMS automatiques

4. **Graphiques & Analytics**
   - Charts.js ou Recharts
   - Évolution des notes
   - Statistiques de paiements
   - Taux de présence

5. **Export & Impression**
   - Export Excel/CSV
   - Génération PDF
   - Impression de documents

6. **Mobile App (PWA)**
   - Service Worker
   - Offline mode
   - Installation sur mobile

---

## Technologies Utilisées

- **Framework:** Next.js 16 (App Router)
- **UI:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **TypeScript:** Pour la sécurité des types
- **Responsive:** Mobile-first approach

---

## Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm start

# Linter
npm run lint
```
