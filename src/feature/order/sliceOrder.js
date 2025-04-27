import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";
// Lọc đơn hàng theo status
export const getOrderByStatus = createAsyncThunk(
  "order/filter",
  async (status) => {
    const response = await api.get(`/order/filterOrderByStatus?status=${status}`);
    return response.data;
  }
);

// Lấy chi tiết đơn hàng theo id
export const getOrderDetailById = createAsyncThunk(
  "order/getOrderDetailById",
  async (id) => {
    const response = await api.get(`/order/${id}`);
    return response.data;
  }
);

// Cập nhật trạng thái đơn hàng
export const updateStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ id, status }) => {
    const response = await api.put(`/order/updateStatusorder`, { id, status });
    return response.data;
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
