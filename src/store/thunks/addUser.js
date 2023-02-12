import { createAsyncThunk } from "@reduxjs/toolkit";

const addUser = createAsyncThunk("users/add", async (formData) => {
  const response = await fetch("http://localhost:3001/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
});

export { addUser };
