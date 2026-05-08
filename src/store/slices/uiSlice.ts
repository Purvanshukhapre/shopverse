import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  quickViewId: string | null;
}

const initialState: UIState = {
  isSearchOpen: false,
  isMobileMenuOpen: false,
  quickViewId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setQuickViewId: (state, action: PayloadAction<string | null>) => {
      state.quickViewId = action.payload;
    },
  },
});

export const { 
  toggleSearch, 
  setSearchOpen, 
  toggleMobileMenu, 
  setMobileMenuOpen, 
  setQuickViewId 
} = uiSlice.actions;
export default uiSlice.reducer;
