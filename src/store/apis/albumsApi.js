import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Album"],
  endpoints(builder) {
    return {
      getAlbum: builder.query({
        query: (userId) => {
          return {
            url: `/albums/${userId}`,
            method: "GET",
          };
        },
        providesTags: (result, error, args) =>
          result
            ? [...result.map(({ id }) => ({ type: "Album", id })), "Album"]
            : ["Album"],
      }),
      deleteAlbum: builder.mutation({
        query: (albumId) => {
          return {
            url: `/albums/${albumId}/delete`,
            method: "DELETE",
            params: {
              albumId,
            },
          };
        },
        invalidatesTags: ["Album"],
      }),
      addAlbum: builder.mutation({
        query: ({ values, userId }) => {
          return {
            url: `/albums/post/${userId}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: values,
          };
        },
        invalidatesTags: ["Album"],
      }),
    };
  },
});

export const { useGetAlbumQuery, useDeleteAlbumMutation, useAddAlbumMutation } =
  albumsApi;
