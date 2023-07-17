import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IBook } from '../../../components/BookCard';

interface IBookSlice {
  status: boolean;
  priceRange: number;
  books?: IBook[];
}
const initialState: IBookSlice = {
  status: false,
  priceRange: 150,
  books: undefined,
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
    setBooks: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
    },
  },
});
export const { toggleStatus, setPriceRange, setBooks } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
