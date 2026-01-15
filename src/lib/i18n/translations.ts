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