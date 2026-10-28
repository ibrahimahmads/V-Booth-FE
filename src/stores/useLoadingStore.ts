import { create } from 'zustand'

interface InitialLoadingState{
    isLoading:boolean;
    setIsLoading:(isLoading:boolean) => void;
}

export const useLoadingStore = create<InitialLoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}))