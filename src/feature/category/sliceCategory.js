// src/redux/categorySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://shopapp-2h3t-be.onrender.com/category"
    );
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, image }) => {
    // Use 'image' here instead of 'img'
    const response = await axios.post(
      "https://shopapp-2h3t-be.onrender.com/category",
      { name, image } // Send 'image' instead of 'img'
    );
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ _id, name, image }) => {
    const response = await axios.put(
      `https://shopapp-2h3t-be.onrender.com/category/${_id}`,
      { name, image }
    );
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    await axios.delete(
      `https://shopapp-2h3t-be.onrender.com/category/${id}`
    );
    return id;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      });
  },
});

export const selectCategories = (state) => state.category.categories;

export default categorySlice.reducer;
