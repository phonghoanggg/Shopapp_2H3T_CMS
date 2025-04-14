// src/redux/categorySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchproducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page, limit }) => {
    const response = await axios.get(
      `https://ecommerce-api-mcqr.onrender.com/product?page=${page}&limit=${limit}`
    );
    return response.data;
  }
);

export const addproduct = createAsyncThunk(
  "product/addproduct",
  async (product) => {
    const response = await axios.post(
      "https://ecommerce-api-mcqr.onrender.com/product",
      product
    );
    return response.data;
  }
);

export const updateproduct = createAsyncThunk(
  "product/updateproduct",
  async (product) => {
    const response = await axios.put(
      `https://ecommerce-api-mcqr.onrender.com/product/${product._id}`,
      product
    );
    return response.data;
  }
);

export const deleteproduct = createAsyncThunk(
  "product/deleteproduct",
  async (id) => {
    await axios.delete(`https://ecommerce-api-mcqr.onrender.com/product/${id}`);
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
