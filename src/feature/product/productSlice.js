// src/redux/categorySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// Fetch Products
export const fetchproducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page, limit }) => {
    const response = await api.get(`/product?page=${page}&limit=${limit}`);
    return response.data;
  }
);

// Add Product
export const addproduct = createAsyncThunk(
  "product/addproduct",
  async (product) => {
    console.log("kêkeke",product)
    const response = await api.post("/product", product);
    return response.data;
  }
);

// Update Product
export const updateproduct = createAsyncThunk(
  "product/updateproduct",
  async (product) => {
    const response = await api.put(`/product/${product._id}`, product);
    return response.data;
  }
);

// Delete Product
export const deleteproduct = createAsyncThunk(
  "product/deleteproduct",
  async (id) => {
    await api.delete(`/product/${id}`);
    return id;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addproduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        const index = state.products.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.products = state.products.products.filter(
          (product) => product._id !== action.payload
        );
      });
  },
});

export const selectproducts = (state) => state.product.products.products;

export default productSlice.reducer;
