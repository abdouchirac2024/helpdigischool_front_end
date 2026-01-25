// Translations for Help Digi School
export type Language = 'fr' | 'en'

export const translations = {
  // Navbar
  nav: {
    home: { fr: 'Accueil', en: 'Home' },
    services: { fr: 'Services', en: 'Services' },
    pricing: { fr: 'Tarifs', en: 'Pricing' },
    about: { fr: 'À propos', en: 'About' },
    contact: { fr: 'Contact', en: 'Contact' },
    login: { fr: 'Connexion', en: 'Login' },
    register: { fr: 'Inscrire Mon École', en: 'Register My School' },
    registerShort: { fr: "S'inscrire", en: 'Register' },
    myDashboard: { fr: 'Mon Dashboard', en: 'My Dashboard' },
    myProfile: { fr: 'Mon Profil', en: 'My Profile' },
    logout: { fr: 'Déconnexion', en: 'Logout' },
    settings: { fr: 'Paramètres', en: 'Settings' },
  },
  // TopBar
  topbar: {
    notifications: { fr: 'Notifications', en: 'Notifications' },
    home: { fr: 'Accueil', en: 'Home' },
    myDashboard: { fr: 'Mon Dashboard', en: 'My Dashboard' },
    myProfile: { fr: 'Mon Profil', en: 'My Profile' },
    settings: { fr: 'Paramètres', en: 'Settings' },
    logout: { fr: 'Déconnexion', en: 'Logout' },
  },
  // Roles
  roles: {
    admin: { fr: 'Administrateur', en: 'Administrator' },
    director: { fr: 'Directeur', en: 'Director' },
    teacher: { fr: 'Enseignant', en: 'Teacher' },
    parent: { fr: 'Parent', en: 'Parent' },
    secretary: { fr: 'Secrétaire', en: 'Secretary' },
    student: { fr: 'Élève', en: 'Student' },
  },
  // Common
  common: {
    seeMore: { fr: 'Voir plus', en: 'See more' },
    close: { fr: 'Fermer', en: 'Close' },
    save: { fr: 'Enregistrer', en: 'Save' },
    cancel: { fr: 'Annuler', en: 'Cancel' },
    loading: { fr: 'Chargement...', en: 'Loading...' },
    error: { fr: 'Erreur', en: 'Error' },
    success: { fr: 'Succès', en: 'Success' },
  },
  // Auth messages
  auth: {
    logoutSuccess: { fr: 'Déconnexion réussie', en: 'Successfully logged out' },
    logoutMessage: { fr: 'À bientôt!', en: 'See you soon!' },
    logoutError: { fr: 'Erreur lors de la déconnexion', en: 'Error during logout' },
  },
  // Pricing page
  pricing: {
    badge: { fr: 'Tarifs transparents', en: 'Transparent Pricing' },
    title: { fr: 'Des prix adaptés à', en: 'Pricing adapted to' },
    titleHighlight: { fr: 'chaque école', en: 'every school' },
    subtitle: { fr: 'Pas de frais cachés, pas d\'engagement.', en: 'No hidden fees, no commitment.' },
    subtitleHighlight: { fr: '1ère année offerte', en: '1st year free' },
    subtitleEnd: { fr: 'pour toutes les nouvelles écoles!', en: 'for all new schools!' },
    trustNote: { fr: '✓ 1ère année offerte · ✓ Sans engagement · ✓ Annulation à tout moment · ✓ Paiement sécurisé', en: '✓ 1st year free · ✓ No commitment · ✓ Cancel anytime · ✓ Secure payment' },
    // Plans
    plan1: {
      name: { fr: '1 An Offert', en: '1 Year Free' },
      description: { fr: '1 an complet offert, upgrade PRO ensuite (35 000 FCFA/mois)', en: '1 full year free, upgrade to PRO after (35,000 FCFA/month)' },
      priceSubtext: { fr: '1ère année offerte', en: '1st year free' },
      badge: { fr: 'Offre spéciale', en: 'Special Offer' },
      cta: { fr: 'Profiter de l\'offre', en: 'Get the offer' },
      features: {
        students: { fr: 'Étudiants illimités', en: 'Unlimited students' },
        classes: { fr: 'Classes illimitées', en: 'Unlimited classes' },
        users: { fr: 'Utilisateurs illimités', en: 'Unlimited users' },
        subjects: { fr: 'Matières illimitées', en: 'Unlimited subjects' },
        excel: { fr: 'Import/Export Excel complet', en: 'Full Excel Import/Export' },
        dashboard: { fr: 'Tableau de bord simple', en: 'Simple dashboard' },
        payments: { fr: 'Gestion complète des paiements', en: 'Complete payment management' },
        grades: { fr: 'Gestion des notes', en: 'Grade management' },
        support: { fr: 'Support email (72h)', en: 'Email support (72h)' },
      },
      limitations: {
        sms: { fr: 'Pas de notifications SMS', en: 'No SMS notifications' },
        integration: { fr: 'Pas d\'intégration paiement', en: 'No payment integration' },
      },
    },
    plan2: {
      name: { fr: 'Pro', en: 'Pro' },
      description: { fr: 'Pour les écoles en croissance', en: 'For growing schools' },
      badge: { fr: 'Plus populaire', en: 'Most popular' },
      cta: { fr: 'Choisir Pro', en: 'Choose Pro' },
      features: {
        students: { fr: 'Élèves illimités', en: 'Unlimited students' },
        classes: { fr: 'Classes illimitées', en: 'Unlimited classes' },
        bulletins: { fr: 'Bulletins PDF illimités', en: 'Unlimited PDF reports' },
        users: { fr: '5 comptes utilisateurs', en: '5 user accounts' },
        notifications: { fr: 'Notifications push PWA', en: 'PWA push notifications' },
        dashboards: { fr: 'Tableaux de bord avancés', en: 'Advanced dashboards' },
        export: { fr: 'Export Excel/CSV', en: 'Excel/CSV export' },
        support: { fr: 'Support prioritaire', en: 'Priority support' },
      },
    },
    plan3: {
      name: { fr: 'Premium', en: 'Premium' },
      description: { fr: 'Solution complète enterprise', en: 'Complete enterprise solution' },
      badge: { fr: 'Tout inclus', en: 'All inclusive' },
      cta: { fr: 'Contacter les ventes', en: 'Contact sales' },
      features: {
        allPro: { fr: 'Tout du plan Pro', en: 'Everything in Pro' },
        users: { fr: 'Utilisateurs illimités', en: 'Unlimited users' },
        sms: { fr: 'SMS illimités (MTN/Orange)', en: 'Unlimited SMS (MTN/Orange)' },
        mobileMoney: { fr: 'Intégration Mobile Money', en: 'Mobile Money integration' },
        subdomain: { fr: 'Sous-domaine personnalisé', en: 'Custom subdomain' },
        api: { fr: 'API accès', en: 'API access' },
        training: { fr: 'Formation sur site', en: 'On-site training' },
        manager: { fr: 'Account manager dédié', en: 'Dedicated account manager' },
      },
    },
  },
}

// Helper function to get translation
export function t(
  key: string,
  lang: Language
): string {
  const keys = key.split('.')
  let value: unknown = translations

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key // Return key if translation not found
    }
  }

  if (value && typeof value === 'object' && lang in value) {
    return (value as Record<Language, string>)[lang]
  }

  return key
}