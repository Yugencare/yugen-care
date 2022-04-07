import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTestimonials = createAsyncThunk(
  "testimonials/getTestimonials",
  async () => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/testiminials"
    );
    const data = await response.data;
    console.log(data);
    return data;
  }
);

const TestimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
    status: null,
  },
  extraReducers: {
    [getTestimonials.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTestimonials.fulfilled]: (state, { payload }) => {
      state.testimonials = payload.testimonials;
      state.status = "success";
    },
    [getTestimonials.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default TestimonialsSlice.reducer;
