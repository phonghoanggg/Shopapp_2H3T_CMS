// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../feature/category/sliceCategory";
import productReducer from "../feature/product/productSlice";
import authReducer from "../feature/product/productSlice";
import userReducer from "../feature/user/userSlice";
import orderReducer from "../feature/order/sliceOrder"
import statisticalReduce from "../feature/statistical/sliceStatistical";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    statistical: statisticalReduce,
    order: orderReducer,
  },
});

export default store;
