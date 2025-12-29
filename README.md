# Help Digi School - Next.js

Plateforme SaaS #1 pour la gestion des écoles primaires au Cameroun.

## 🚀 Technologies

- **Next.js 16** - Framework React avec App Router et Turbopack
- **React 19** - Dernière version de React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utility-first
- **shadcn/ui** - Composants UI
- **React Query** - Gestion d'état serveur
- **Radix UI** - Composants accessibles

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build production
npm run build

# Lancer en production
npm run start
```

## 🏗️ Structure du Projet

```
src/
├── app/                      # App Router Next.js
│   ├── (auth)/              # Groupe de routes auth
│   │   ├── login/
│   │   └── register/
│   ├── (marketing)/         # Groupe de routes marketing
│   │   ├── features/
│   │   ├── pricing/
│   │   └── contact/
│   ├── layout.tsx           # Layout racine
│   ├── page.tsx             # Page d'accueil
│   ├── globals.css          # Styles globaux
│   └── not-found.tsx        # Page 404
├── components/
│   ├── ui/                  # Composants shadcn/ui
│   ├── layout/              # Navbar, Footer
│   ├── landing/             # Sections landing page
│   └── providers.tsx        # Providers React Query, Theme
├── hooks/                   # Custom hooks
├── lib/                     # Utilitaires
└── types/                   # Types TypeScript
```

## 🌐 Routes

- `/` - Page d'accueil
- `/login` - Connexion
- `/register` - Inscription
- `/features` - Fonctionnalités
- `/pricing` - Tarifs
- `/contact` - Contact

## 🎨 Fonctionnalités

- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ SEO optimisé avec Metadata API
- ✅ Dark mode avec next-themes
- ✅ Responsive design
- ✅ Composants accessibles (Radix UI)
- ✅ Formulaires avec React Hook Form + Zod
- ✅ Animations Tailwind CSS
- ✅ Turbopack pour des builds ultra-rapides

## 📝 Développement

Le projet utilise :
- **App Router** de Next.js 16
- **Route Groups** pour organiser les routes
- **Server Components** par défaut
- **Client Components** (`'use client'`) pour l'interactivité
- **Turbopack** pour une compilation ultra-rapide

## 🚢 Déploiement

Le projet peut être déployé sur :
- **Vercel** (recommandé)
- Netlify
- AWS Amplify
- Railway
- Render

```bash
npm run build
npm run start
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Serveur de développement (port 3000)
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # Linter ESLint
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)

## 🎯 Fonctionnalités de l'Application

### Gestion Scolaire
- Notes et bulletins PDF
- Paiements Mobile Money (MTN MoMo, Orange Money)
- Gestion des élèves et classes
- Communication avec les parents
- Statistiques et rapports

### Interface
- Design moderne et responsive
- Mode sombre/clair
- Animations fluides
- Accessibilité WCAG

## 🔐 Variables d'Environnement

Créez un fichier `.env.local` :

```env
# API
NEXT_PUBLIC_API_URL=https://api.helpdigischool.cm

# Database (si nécessaire)
DATABASE_URL=

# Auth (si nécessaire)
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 License

© 2025 Help Digi School. Tous droits réservés.

## 📞 Contact

- **Email**: contact@helpdigischool.cm
- **Téléphone**: +237 6 00 00 00 00
- **Adresse**: Douala, Cameroun

---

**Version**: 1.0.0  
**Next.js**: 16.1.1  
**React**: 19.2.3
