import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["User"],
  endpoints(builder) {
    return {
      getUsers: builder.query({
        query: () => {
          return {
            url: "/users",
            method: "GET",
          };
        },
        providesTags: (result, error, arg) =>
          result
            ? [...result.map(({ id }) => ({ type: "User", id })), "User"]
            : ["User"],
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
        invalidatesTags: ["User"],
      }),
      deleteUser: builder.mutation({
        query: (userId) => {
          return {
            url: `/users/${userId}/delete`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["User"],
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
        invalidatesTags: ["User"],
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
