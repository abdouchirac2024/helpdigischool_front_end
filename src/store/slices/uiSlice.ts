import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  createdAt: number
}

export interface UIState {
  // Sidebar
  sidebarOpen: boolean
  sidebarCollapsed: boolean

  // Modals
  modals: {
    student: boolean
    class: boolean
    payment: boolean
    evaluation: boolean
    settings: boolean
  }

  // Notifications
  notifications: Notification[]

  // Filters (persisted across pages)
  filters: {
    selectedClassId: string | null
    selectedYear: string | null
    searchQuery: string
    statusFilter: string
  }

  // Theme
  theme: 'light' | 'dark' | 'system'

  // Loading states
  globalLoading: boolean
  loadingMessage: string | null
}

const initialState: UIState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  modals: {
    student: false,
    class: false,
    payment: false,
    evaluation: false,
    settings: false,
  },
  notifications: [],
  filters: {
    selectedClassId: null,
    selectedYear: null,
    searchQuery: '',
    statusFilter: 'all',
  },
  theme: 'system',
  globalLoading: false,
  loadingMessage: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebarCollapse: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },

    // Modals
    openModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = false
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key as keyof UIState['modals']] = false
      })
    },

    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },

    // Filters
    setClassFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.selectedClassId = action.payload
    },
    setYearFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.selectedYear = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.statusFilter = action.payload
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },

    // Theme
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },

    // Global Loading
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload
    },
    setLoadingMessage: (state, action: PayloadAction<string | null>) => {
      state.loadingMessage = action.payload
    },

    // Reset UI
    resetUI: () => initialState,
  },
})

// Selectors
export const selectUI = (state: { ui: UIState }) => state.ui
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebarOpen
export const selectSidebarCollapsed = (state: { ui: UIState }) => state.ui.sidebarCollapsed
export const selectModals = (state: { ui: UIState }) => state.ui.modals
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications
export const selectFilters = (state: { ui: UIState }) => state.ui.filters
export const selectTheme = (state: { ui: UIState }) => state.ui.theme
export const selectGlobalLoading = (state: { ui: UIState }) => state.ui.globalLoading
export const selectLoadingMessage = (state: { ui: UIState }) => state.ui.loadingMessage

// Modal selector helper
export const selectModalOpen = (modal: keyof UIState['modals']) => (state: { ui: UIState }) =>
  state.ui.modals[modal]

export const {
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
} = uiSlice.actions

export default uiSlice.reducer
