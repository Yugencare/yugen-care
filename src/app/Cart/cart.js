import { createSlice } from "@reduxjs/toolkit";

// export const getProducts = createAsyncThunk(
//   "products/getProducts",
//   async () => {
//     const response = await axios.get(
//       "https://server.yugencare.com/api/v1/service-intro"
//     );
//     const data = await response.data;
//     return data;
//   }
// );

const CartSlice = createSlice({
  //   products: [
  //     {
  // id: 2,
  // img: productItem1,
  // name: "PRODUCT NAME",
  // orginal_price: "400",
  // price: "362.50",
  // quantity: 1,
  //     },
  //   ],
  name: "cart",
  initialState: {
    product: [],
    cart: [],
    total: 0,
    OpenCart: false,
    status: null,
  },
  reducers: {
    CloseDrawer(state, { payload }) {
      state.OpenCart = false;
    },
    OpenDrawer(state, { payload }) {
      state.OpenCart = true;
    },
    AddProduct(state, { payload }) {
      // const { id, images, name, original_price, price, quantity } = payload;
      const { product, quantity } = payload;
      const inCart = state.cart.find((item) => item.product?.id === product.id);
      if (inCart) {
        const qtyInx = state.cart.findIndex(
          (item) => item.product?.id === product.id
        );
        if (qtyInx > -1) {
          if (quantity > 1) {
            if (
              state.cart[qtyInx].quantity + parseInt(quantity) <=
              product.quantity
            ) {
              state.cart[qtyInx].quantity =
                state.cart[qtyInx].quantity + parseInt(quantity);
            }
          } else {
            if (state.cart[qtyInx].quantity + 1 <= product.quantity) {
              state.cart[qtyInx].quantity = state.cart[qtyInx].quantity + 1;
            }
          }
        }
      } else {
        state.cart.push({
          product,
          quantity: parseInt(quantity),
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    RemoveProduct(state, { payload }) {
      state.cart = state.cart.filter(
        (item) => item.product?.id !== payload.product.id
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    DeleteProduct(state, { payload }) {
      const qtyInx = state.cart.findIndex(
        (item) => item.product?.id === payload.product.id
      );
      if (state.cart[qtyInx].quantity !== 1) {
        state.cart[qtyInx].quantity = payload.quantity - 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    TotalCartPrice(state, { payload }) {
      state.total = state.cart.reduce(function (value, item) {
        return value + item.product.price * item.quantity;
      }, 0);
    },
    Quantity: (state, { payload }) => {
      const inCart = state.cart.find(
        (item) => item.product?.id === payload.product.id
      );
      if (inCart) {
        const qtyInx = state.cart.findIndex(
          (item) => item.product?.id === payload.product.id
        );
        state.cart[qtyInx].quantity = payload.quantity;
        state.cart[qtyInx].price = payload.quantity * payload.price;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    GetLocalCart(state, { payload }) {
      console.log(payload);
      state.cart = JSON.parse(payload);
    },
    ClearCart(state, { payload }) {
      state.cart = [];
      localStorage.setItem("cart", []);
      state.total = 0;
    },
  },
  // extraReducers: {
  //   [getProducts.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [getProducts.fulfilled]: (state, { payload }) => {
  //     state.products = payload.products;
  //     state.status = "success";
  //   },
  //   [getProducts.rejected]: (state, action) => {
  //     state.status = "failed";
  //   },
  // },
});
export const {
  CloseDrawer,
  OpenDrawer,
  AddProduct,
  DeleteProduct,
  Quantity,
  RemoveProduct,
  TotalCartPrice,
  GetLocalCart,
  ClearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
