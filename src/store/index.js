import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/usersApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";
export * from "./thunks/updateUser";

export {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "./apis/usersApi";
