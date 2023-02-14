import { createAsyncThunk } from "@reduxjs/toolkit";

const updateUser = createAsyncThunk(
  "users/update",
  async ({ userId, values }) => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
    return data;
  }
);

export { updateUser };
