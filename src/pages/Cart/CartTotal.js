import Divider from "@material-ui/core/Divider";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TotalCartPrice } from "../../app/Cart/cart";

function CartTotal() {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(TotalCartPrice());
  }, [cart]);

  return (
    <div className="CartTotal position-relative">
      <div className="container">
        <div className="row">
          <h2>Cart Total</h2>
        </div>
        <div className="row">
          <div className="col-sm-7 d-flex justify-content-between">
            <p>SUB TOTAL</p>
            <p>AED {total}</p>
          </div>
        </div>
        <Divider />
        <div className="row">
          <div className="col-sm-7 d-flex justify-content-between">
            <p>SHIPPING</p>
            <p className="shippingcost">FREE</p>
          </div>
        </div>
        <Divider />

        <div className="row">
          <div className="col-sm-7 d-flex justify-content-between">
            <p>TOTAL</p>
            <p>AED {total}</p>
          </div>
        </div>
        <Divider />
        {cart.length !== 0 ? (
          <Link to="/checkout">
            <div className="cartbtn co ">CHECKOUT</div>
          </Link>
        ) : (
          <>
            <Link to="#">
              <div className="cartbtn co ">CHECKOUT</div>
            </Link>
            <p style={{ color: "red" }}>Your Cart is Empty</p>
          </>
        )}
      </div>
    </div>
  );
}
export default CartTotal;
