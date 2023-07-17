import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IBook } from '../../../components/BookCard';

interface IBookSlice {
  status: boolean;
  priceRange: number;
  books?: IBook[];
  searchTerm: string;
  searchGenre: string;
  searchYear: string;
}
const initialState: IBookSlice = {
  status: false,
  priceRange: 150,
  books: undefined,
  searchTerm: '',
  searchGenre: '',
  searchYear: '',
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchGenre: (state, action: PayloadAction<string>) => {
      state.searchGenre = action.payload;
    },
    setSearchYear: (state, action: PayloadAction<string>) => {
      state.searchYear = action.payload;
    },
  },
});
export const {
  toggleStatus,
  setPriceRange,
  setSearchTerm,
  setSearchGenre,
  setSearchYear,
} = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
