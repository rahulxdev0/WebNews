import { baseApi } from "./baseApi";

export const districtEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDistricts: builder.query({
      query: () => ({
        url: "/districts/",
        method: "GET",
      }),
      providesTags: ["Districts"],
    }),
    getDistrict: builder.query({
      query: (id) => ({
        url: `/districts/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Districts", id }],
    }),
    createDistrict: builder.mutation({
      query: (districtData) => ({
        url: "/districts/",
        method: "POST",
        body: districtData,
      }),
      invalidatesTags: ["Districts"],
    }),
    updateDistrict: builder.mutation({
      query: ({ id, ...districtData }) => ({
        url: `/districts/${id}/`,
        method: "PUT",
        body: districtData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Districts",
        { type: "Districts", id },
      ],
    }),
    partialUpdateDistrict: builder.mutation({
      query: ({ id, ...partialData }) => ({
        url: `/districts/${id}/`,
        method: "PATCH",
        body: partialData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Districts",
        { type: "Districts", id },
      ],
    }),
    deleteDistrict: builder.mutation({
      query: (id) => ({
        url: `/districts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Districts"],
    }),
  }),
});

export const {
  useGetDistrictsQuery,
  useGetDistrictQuery,
  useCreateDistrictMutation,
  useUpdateDistrictMutation,
  usePartialUpdateDistrictMutation,
  useDeleteDistrictMutation,
} = districtEndpoints;