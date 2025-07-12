import { baseApi } from "./baseApi";

export const areaEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all areas
    getAreas: builder.query({
      query: () => ({
        url: "/area/",
        method: "GET",
      }),
      providesTags: ["Areas"],
    }),

    // Get single area by ID
    getArea: builder.query({
      query: (id) => ({
        url: `/area/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Areas", id }],
    }),

    // Create new area
    createArea: builder.mutation({
      query: (areaData) => ({
        url: "/area/",
        method: "POST",
        body: areaData,
      }),
      invalidatesTags: ["Areas"],
    }),

    // Full update of area
    updateArea: builder.mutation({
      query: ({ id, ...areaData }) => ({
        url: `/area/${id}/`,
        method: "PUT",
        body: areaData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Areas",
        { type: "Areas", id },
      ],
    }),

    // Partial update of area
    partialUpdateArea: builder.mutation({
      query: ({ id, ...partialData }) => ({
        url: `/area/${id}/`,
        method: "PATCH",
        body: partialData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Areas",
        { type: "Areas", id },
      ],
    }),

    // Delete area
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `/area/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Areas"],
    }),

    // Additional endpoints can be added here as needed
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAreasQuery,
  useGetAreaQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  usePartialUpdateAreaMutation,
  useDeleteAreaMutation,
} = areaEndpoints;