// Store
export { store } from './store'
export type { RootState, AppDispatch } from './store'

// Hooks
export { useAppDispatch, useAppSelector, useAppStore } from './hooks'

// Auth slice
export {
  loginAsync,
  logoutAsync,
  registerAsync,
  refreshSessionAsync,
  initializeAuthAsync,
  clearError,
  setUser,
  updateUser,
  resetAuth,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  selectIsInitialized,
  selectUserRole,
  selectHasRole,
} from './slices/authSlice'
export type { AuthState } from './slices/authSlice'

// UI slice
export {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapse,
  setSidebarCollapsed,
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  removeNotification,
  clearNotifications,
  setClassFilter,
  setYearFilter,
  setSearchQuery,
  setStatusFilter,
  resetFilters,
  setTheme,
  setGlobalLoading,
  setLoadingMessage,
  resetUI,
  selectUI,
  selectSidebarOpen,
  selectSidebarCollapsed,
  selectModals,
  selectNotifications,
  selectFilters,
  selectTheme,
  selectGlobalLoading,
  selectLoadingMessage,
  selectModalOpen,
} from './slices/uiSlice'
export type { UIState, Notification } from './slices/uiSlice'
