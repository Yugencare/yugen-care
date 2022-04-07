import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postRedeem = createAsyncThunk(
  "loyalty/postRedeem",
  async (Thisredeem, { dispatch }) => {
    try {
      const response = await axios({
        // withCredentials: true,
        method: "POST",
        url: "https://server.yugencare.com/api/v1/loyalty/redeemed-rewards",
        data: Thisredeem,
      });
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.log("Error", e.response);
    }
  }
);

const LoyaltySlice = createSlice({
  name: "loyalty",
  initialState: {
    redeem: null,
    status: null,
    loyaltyPoints: 0,
  },
  reducers: {
    SetLoyaltyPoints(state, { payload }) {
      state.loyaltyPoints = payload;
    },
    DeductPoints(state, { payload }) {
      state.loyaltyPoints = state.loyaltyPoints - payload;
    },
  },
  extraReducers: {
    [postRedeem.pending]: (state, action) => {
      state.status = "loading";
    },
    [postRedeem.fulfilled]: (state, { payload }) => {
      state.redeem = payload.redeem;
      state.status = "success";
    },
    [postRedeem.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { SetLoyaltyPoints, DeductPoints } = LoyaltySlice.actions;
export default LoyaltySlice.reducer;
