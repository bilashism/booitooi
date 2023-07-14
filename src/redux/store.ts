import { configureStore } from '@reduxjs/toolkit';

import { api } from './api/apiSlice';
import { cartReducer } from './features/cart/cartSlice';
import { productReducer } from './features/products/productSlice';
import { userReducer } from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
