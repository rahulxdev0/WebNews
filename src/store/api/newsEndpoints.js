import { baseApi } from "./baseApi";

export const newsEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all news with pagination
    getNewsList: builder.query({
      query: (params = {}) => ({
        url: '/news/',
        method: 'GET',
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'News', id })),
        { type: 'News', id: 'LIST' },
      ],
    }),

    // Get single news by ID
    getNewsDetail: builder.query({
      query: (id) => ({
        url: `/news/${id}/`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'News', id }],
    }),

    // Create new news article
    createNews: builder.mutation({
      query: (newsData) => ({
        url: '/news/',
        method: 'POST',
        body: newsData,
      }),
      invalidatesTags: [{ type: 'News', id: 'LIST' }],
    }),

    // Update entire news article
    updateNews: builder.mutation({
      query: ({ id, ...newsData }) => ({
        url: `/news/${id}/`,
        method: 'PUT',
        body: newsData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'News', id },
        { type: 'News', id: 'LIST' },
      ],
    }),

    // Partial update of news article
    partialUpdateNews: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/news/${id}/`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'News', id },
        { type: 'News', id: 'LIST' },
      ],
    }),

    // Delete news article
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'News', id },
        { type: 'News', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetNewsListQuery,
  useGetNewsDetailQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  usePartialUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsEndpoints;