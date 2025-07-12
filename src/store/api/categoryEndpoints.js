import { baseApi } from "./baseApi";

export const categoryEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories/",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categories/",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...categoryData }) => ({
        url: `/categories/${id}/`,
        method: "PUT",
        body: categoryData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Categories",
        { type: "Categories", id },
      ],
    }),
    partialUpdateCategory: builder.mutation({
      query: ({ id, ...partialData }) => ({
        url: `/categories/${id}/`,
        method: "PATCH",
        body: partialData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Categories",
        { type: "Categories", id },
      ],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  usePartialUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryEndpoints;