import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ClearCart } from "../Cart/cart";

export const postOrder = createAsyncThunk(
  "orders/postOrder",
  async (ThisOrder, { dispatch }) => {
    try {
      const response = await axios({
        // withCredentials: true,
        method: "POST",
        url: "https://server.yugencare.com/api/v1/orders",
        data: ThisOrder,
      });
      const data = await response.data;
      console.log(data);
      if (response.status === 201) {
        // store the user in localStorage
        return data;
      }
    } catch (e) {
      console.log("Error", e.response);
    }
  }
);

const OrdersSlice = createSlice({
  name: "orders",
  initialState: {
    order: null,
    status: null,
  },
  reducers: {
    ClearOrder(state, { payload }) {
      state.order = null;
    },
  },
  extraReducers: {
    [postOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [postOrder.fulfilled]: (state, { payload }) => {
      state.order = payload.order;
      state.status = "success";
    },
    [postOrder.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { CloseDrawer } = OrdersSlice.actions;
export default OrdersSlice.reducer;
