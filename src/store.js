import { createSlice, configureStore } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    }
  }
});

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export const { toggleSidebar } = sidebarSlice.actions;

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    sidebar: sidebarSlice.reducer
  }
});
