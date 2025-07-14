import { baseApi } from "./baseApi";

export const commentEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({
        url: "/comments/",
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
    getComment: builder.query({
      query: (id) => ({
        url: `/comments/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Comments", id }],
    }),
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments/",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query: ({ id, ...commentData }) => ({
        url: `/comments/${id}/`,
        method: "PUT",
        body: commentData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Comments",
        { type: "Comments", id },
      ],
    }),
    partialUpdateComment: builder.mutation({
      query: ({ id, ...partialData }) => ({
        url: `/comments/${id}/`,
        method: "PATCH",
        body: partialData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Comments",
        { type: "Comments", id },
      ],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  usePartialUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentEndpoints;