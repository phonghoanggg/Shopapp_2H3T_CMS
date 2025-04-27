// src/redux/categorySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// Lấy danh sách category
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await api.get("/category");
    return response.data;
  }
);

// Thêm mới category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, image }) => {
    const response = await api.post("/category", { name, image });
    return response.data;
  }
);

// Cập nhật category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ _id, name, image }) => {
    const response = await api.put(`/category/${_id}`, { name, image });
    return response.data;
  }
);

// Xóa category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    await api.delete(`/category/${id}`);
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
