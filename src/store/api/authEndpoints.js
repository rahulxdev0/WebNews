import { baseApi } from "./baseApi";

export const userEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: () => ({
        url: "/auth/user/info/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register/user/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    registerAdmin: builder.mutation({
      query: (userData) => ({
        url: "/auth/register/admin/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
    useUserInfoQuery,
  useLoginMutation,
  useRegisterUserMutation,
  useRegisterAdminMutation,
  useLogoutMutation,
} = userEndpoints;
