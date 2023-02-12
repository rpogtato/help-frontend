import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteUser = createAsyncThunk("users/delete", async (userId) => {
  const response = await fetch(`http://localhost:3001/users/${userId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

export { deleteUser };
