import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints(builder) {
    return {
      getUsers: builder.query({
        query: () => {
          return {
            url: "/users",
            method: "GET",
          };
        },
      }),
      getUser: builder.query({
        query: (userId) => {
          return {
            url: `/users/${userId}`,
            method: "GET",
          };
        },
      }),
      addUser: builder.mutation({
        query: (values) => {
          return {
            url: "/users/register",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          };
        },
      }),
      deleteUser: builder.mutation({
        query: (userId) => {
          return {
            url: `/users/${userId}/delete`,
            method: "DELETE",
          };
        },
      }),
      updateUser: builder.mutation({
        query: ({ userId, values }) => {
          return {
            url: `/users/${userId}/update`,
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          };
        },
      }),
    };
  },
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
