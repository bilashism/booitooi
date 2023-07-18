import { api } from '../../api/apiSlice';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books',
        method: 'GET',
      }),
      providesTags: ['books'],
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['reviews', 'books'],
    }),
    getReviews: builder.query({
      query: (id) => `/books/reviews/${id}`,
      providesTags: ['reviews'],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/reviews`,
        method: 'POST',
        body: data,
        invalidatesTags: ['reviews'],
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
        invalidatesTags: ['books'],
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useGetReviewsQuery,
  usePostReviewMutation,
  useUpdateBookMutation,
} = booksApi;
