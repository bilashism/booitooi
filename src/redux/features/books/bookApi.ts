import useAccessToken from '../../../hooks/useAccessToken';
import { api } from '../../api/apiSlice';
import { useAppSelector } from '../../hooks';

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
    }),
    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comment'],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetSingleBookQuery,
  useGetBooksQuery,
  usePostCommentMutation,
} = booksApi;
