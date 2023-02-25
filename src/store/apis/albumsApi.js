import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints(builder) {
    return {
      getAlbum: builder.query({
        query: (userId) => {
          return {
            url: `/albums/${userId}`,
            method: "GET",
          };
        },
      }),
      deleteAlbum: builder.mutation({
        query: (albumId) => {
          return {
            url: `/albums/${albumId}/delete`,
            method: "DELETE",
          };
        },
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
      }),
    };
  },
});

export const { useGetAlbumQuery, useDeleteAlbumMutation, useAddAlbumMutation } =
  albumsApi;
