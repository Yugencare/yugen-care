import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/products/"
    );
    const data = await response.data;
    console.log(data);
    return data;
  }
);
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async ({ slug }) => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/products/" + slug
    );
    const data = await response.data;
    console.log(data);
    return data;
  }
);

export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/categories/"
    );
    const data = await response.data;
    console.log(data);
    return data;
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: null,
    categories: [],
    product: {},
    productStatus: null,
    reviews: [],
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.status = "success";
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getProduct.pending]: (state, action) => {
      state.productStatus = "loading";
    },
    [getProduct.fulfilled]: (state, { payload }) => {
      state.productStatus = "success";
      state.product = payload.product;
      state.reviews = payload.reviews;
    },
    [getProduct.rejected]: (state, action) => {
      state.productStatus = "failed";
    },
    [getCategories.pending]: (state, action) => {},
    [getCategories.fulfilled]: (state, { payload }) => {
      state.categories = payload.categories;
    },
    [getCategories.rejected]: (state, action) => {},
  },
});
export default ProductsSlice.reducer;
