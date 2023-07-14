import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IProductSlice {
  status: boolean;
  priceRange: number;
}
const initialState: IProductSlice = {
  status: false,
  priceRange: 150,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});
export const { toggleStatus, setPriceRange } = productSlice.actions;
export const productReducer = productSlice.reducer;
