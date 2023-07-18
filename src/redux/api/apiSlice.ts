import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
      // Add the authorization header if the token exists
      if (localStorage.getItem('accessToken')) {
        headers.set('authorization', `${localStorage.getItem('accessToken')}`);
      }

      return headers;
    },
  }),
  tagTypes: ['reviews'],
  endpoints: () => ({}),
});
