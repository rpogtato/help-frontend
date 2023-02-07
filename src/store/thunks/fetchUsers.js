import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await fetch("http://localhost:3001/users", {
    method: "GET",
    "Content-Type": "application/json",
  });
  const data = await response.json();
  return data;
});

export { fetchUsers };
