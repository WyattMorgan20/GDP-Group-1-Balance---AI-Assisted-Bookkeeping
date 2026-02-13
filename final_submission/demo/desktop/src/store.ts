import { create } from 'zustand';
import { User } from './types';

export type AppState = 'login' | 'sign-up' | 'role-selection' | 'activation' | 'dashboard';

interface AppStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  
  // App navigation state
  appState: AppState;
  setAppState: (state: AppState) => void;
  
  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Error state
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
  
  // App navigation state
  appState: 'login',
  setAppState: (appState) => set({ appState }),
  
  // Loading state
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  // Error state
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}));
