import { api } from '../../api/apiSlice';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books',
        method: 'GET',
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['reviews'],
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
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useGetReviewsQuery,
  usePostReviewMutation,
} = booksApi;
