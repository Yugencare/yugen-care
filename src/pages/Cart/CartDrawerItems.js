import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProduct,
  DeleteProduct,
  GetLocalCart,
  RemoveProduct,
} from "../../app/Cart/cart";

function CartDrawerItems(props) {
  // const classes = useStyles();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { lang } = useSelector((state) => state.lang);
  const Remove = (item) => {
    dispatch(RemoveProduct(item));
    console.log(cart);
  };

  const RemoveOne = (item) => {
    dispatch(DeleteProduct(item));
    console.log(cart);
  };

  const AddOne = (payload) => {
    console.log(payload);
    var c = {
      product: payload.product,
      quantity: 1,
    };
    dispatch(AddProduct(c));
    console.log(cart);
  };
  useEffect(() => {
    const saved_cart = localStorage.getItem("cart");
    if (saved_cart) {
      dispatch(GetLocalCart(saved_cart));
    }
  }, []);
  console.log(cart);
  return (
    <div className="CartDrawerItems ">
      {cart.length === 0 ? (
        <p style={{ fontSize: 22 }}>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <>
            <div className="cart-item position-relative d-flex align-items-center mt-3 mt-md-0">
              <div className="item-img">
                <img
                  src={
                    item.product.images &&
                    item.product.images.length !== 0 &&
                    item.product.images[0].url
                  }
                  atl=""
                />
              </div>

              <div className="item-info ">
                <h2>
                  {lang === "en" ? item.product.name : item.product.name_ar}
                </h2>
                <div className="d-none d-sm-block">
                  <p>
                    <small>
                      {lang === "en" ? "AED" : "د.إ"}{" "}
                      {item.product.original_price * item.quantity}
                    </small>
                    <span>
                      {"  "}
                      {lang === "en" ? "AED" : "د.إ"}{" "}
                      {item.product.price * item.quantity}
                    </span>
                  </p>
                </div>

                <div className="d-block d-sm-none text-center">
                  <p>
                    <small>
                      {lang === "en" ? "AED" : "د.إ"}{" "}
                      {item.product.orginal_price * item.quantity}
                    </small>
                  </p>
                  <p>
                    <span>
                      {" "}
                      {lang === "en" ? "AED" : "د.إ"}{" "}
                      {item.product.price * item.quantity}
                    </span>
                  </p>
                </div>

                <div className="deleteItem">
                  <div className="close-drawer" onClick={() => Remove(item)} />
                </div>
              </div>
            </div>

            <div className="add-remove-item d-flex">
              <RemoveIcon
                className="additem"
                fontSize="small"
                onClick={() => RemoveOne(item)}
              />
              <p>{item.quantity}</p>
              <AddIcon
                className="additem"
                fontSize="small"
                onClick={() => AddOne(item)}
              />
            </div>
          </>
        ))
      )}
    </div>
  );
}

export default CartDrawerItems;
