// src/redux/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// Fetch Users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await api.get("/user");
  return response.data;
});

// Add User
export const addUser = createAsyncThunk("user/addUser", async (user) => {
  const response = await api.post("/user", user);
  return response.data;
});

// Update User
export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const response = await api.put(`/user/${user._id}`, user);
  return response.data;
});

// Delete User
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await api.delete(`/user/${id}`);
  return id;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
