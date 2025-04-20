import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderByStatus = createAsyncThunk(
  "order/filter",
  async (status) => {
    const response = await axios.get(
      "https://shopapp-2h3t-be.onrender.com/order/filterOrderByStatus?status=" +
        status
    );
    return response.data;
  }
);

export const getOrderDetailById = createAsyncThunk("order/:id", async (id) => {
  const response = await axios.get(
    "https://shopapp-2h3t-be.onrender.com/order/" + id
  );
  return response.data;
});

export const updateStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `https://shopapp-2h3t-be.onrender.com/order/updateStatusorder`,
      { id, status }
    );
    return response.data; // Ensure this returns the updated order data
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    listOrders: [],
    orderDetail: {},
    dataUpdate: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.listOrders = action.payload;
      })
      .addCase(getOrderByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderDetailById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetailById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload;
      })
      .addCase(getOrderDetailById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.dataUpdate = action.payload; // Update state with the response
      })
      .addCase(updateStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectOrder = (state) => state.order;

export default orderSlice.reducer;
