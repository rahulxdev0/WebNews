import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../config";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
    // For debugging
     console.log('Cookies being sent:', document.cookie);
    return headers;
  },
  }),
  tagTypes: ['Auth', 'Categories', 'Post', 'Comment'],
  endpoints: () => ({}),
});
