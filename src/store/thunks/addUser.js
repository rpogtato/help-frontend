import { createAsyncThunk } from "@reduxjs/toolkit";

const addUser = createAsyncThunk("users/add", async (firstName, lastName) => {
  const response = await fetch("http://localhost:3001/users/register", {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify({ firstName, lastName }),
  });
  const data = await response.json();
  return data;
});

export { addUser };
