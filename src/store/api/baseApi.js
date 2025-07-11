import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../config";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: 'include',
  }),
  tagTypes: ['Auth', 'Category', 'Post', 'Comment'],
  endpoints: () => ({}),
});
