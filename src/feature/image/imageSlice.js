import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// Upload ảnh
export const addImages = createAsyncThunk("image/addImages", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/image/upload", data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Xoá ảnh
export const deleteImage = createAsyncThunk("image/deleteImage", async (publicId, { rejectWithValue }) => {
  try {
    await api.delete(`/image/delete?publicId=${publicId}`);
    return publicId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const imageSlice = createSlice({
  name: "image",
  initialState: {
    imagesDataList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Images
      .addCase(addImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addImages.fulfilled, (state, action) => {
        state.loading = false;
        state.imagesDataList = [...state.imagesDataList, ...action.payload];
      })
      .addCase(addImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Delete Image
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imagesDataList = state.imagesDataList.filter(img => img.publicId !== action.payload);
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const selectImages = (state) => state.image.imagesDataList;
export const selectLoading = (state) => state.image.loading;

export default imageSlice.reducer;
