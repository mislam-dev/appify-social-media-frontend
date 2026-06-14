"use client";

import { create } from "zustand";

type DropdownId = "profile" | "notifications" | null;

interface FeedUiState {
  darkMode: boolean;
  openDropdown: DropdownId;
  toggleDarkMode: () => void;

  toggleDropdown: (id: Exclude<DropdownId, null>) => void;
  closeDropdowns: () => void;
}

export const useFeedUiStore = create<FeedUiState>((set) => ({
  darkMode: false,
  openDropdown: null,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  toggleDropdown: (id) =>
    set((s) => ({ openDropdown: s.openDropdown === id ? null : id })),
  closeDropdowns: () => set({ openDropdown: null }),
}));
