import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Organization"],
  endpoints: (builder) => ({
    registerAccount: builder.mutation({
      query: (body: { name: string; email: string; password: string }) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterAccountMutation } = authApi;