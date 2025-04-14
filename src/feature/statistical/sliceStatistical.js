import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const revenueStatistics = createAsyncThunk(
  "statistical/revenueStatistics",
  async () => {
    const response = await axios.get(
      "https://ecommerce-api-mcqr.onrender.com/order/revenueStatistics"
    );
    return response.data;
  }
);

export const soldProductsStatistics = createAsyncThunk(
  "statistical/soldProductsStatistics",
  async () => {
    const response = await axios.get(
      "https://ecommerce-api-mcqr.onrender.com/order/soldProductsStatistics"
    );
    return response.data;
  }
);

export const soldProductsStatisticsById = createAsyncThunk(
  "statistical/soldProductsStatisticsById",
  async () => {
    const response = await axios.get(
      "https://ecommerce-api-mcqr.onrender.com/order/soldProductsStatisticsById"
    );
    return response.data;
  }
);

export const soldProductsByMonthAndYear = createAsyncThunk(
  "statistical/soldProductsByMonthAndYear",
  async () => {
    const response = await axios.get(
      " http://localhost:5000/oder/soldProductsByMonthAndYear"
    );
    return response.data;
  }
);

const statisticalSlice = createSlice({
    name: "statistical",
    initialState: {
      revenueStatistic: 0,
      soldProductsStatistic: 0,
      soldProductsStatisticsById: [],
      soldProductsByMonthAndYear: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(revenueStatistics.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(revenueStatistics.fulfilled, (state, action) => {
          state.loading = false;
          state.revenueStatistic = action.payload;
        })
        .addCase(revenueStatistics.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(soldProductsStatistics.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(soldProductsStatistics.fulfilled, (state, action) => {
          state.loading = false;
          state.soldProductsStatistic = action.payload;
        })
        .addCase(soldProductsStatistics.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(soldProductsStatisticsById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(soldProductsStatisticsById.fulfilled, (state, action) => {
          state.loading = false;
          state.soldProductsStatisticsById = action.payload.productSales;
        })
        .addCase(soldProductsStatisticsById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(soldProductsByMonthAndYear.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(soldProductsByMonthAndYear.fulfilled, (state, action) => {
          state.loading = false;
          state.soldProductsByMonthAndYear = action.payload;
        })
        .addCase(soldProductsByMonthAndYear.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
    },
  });
  
  export const selectStatistical = (state) => state.statistical;
  
  export default statisticalSlice.reducer;