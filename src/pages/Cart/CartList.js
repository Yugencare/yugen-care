import Divider from "@material-ui/core/Divider";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//images
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import MobileCartItems from "./MobileCartItems";

function CartList(props) {
  const [displayQ, setDisplayQ] = useState("block");

  useEffect(() => {
    window.addEventListener("resize", handleDisplayQ);
    return () => window.removeEventListener("resize", handleDisplayQ);
  }, []);

  const handleDisplayQ = () => {
    console.log(displayQ);

    if (window.innerWidth < 576) setDisplayQ("none");
    else setDisplayQ("block");
  };

  const { cart } = useSelector((state) => state.cart);

  return (
    <>
      <div className="CartList content-block1 position-relative">
        <div className="container">
          <div className="productOnDesktop">
            <div className="row">
              <div className="col-6 d-flex justify-content-between">
                <p>Product</p>
                <p className="addpricepadding">Price</p>
              </div>
              <div className="col-6 d-flex justify-content-between align-items-center">
                <p className="ml-5">Quantity</p>
                <p>TOTAL</p>
              </div>
            </div>
            <Divider />
            <div className="row">
              {cart.length === 0 ? (
                <div className="d-flex justify-content-center w-100 pt-5 pb-2">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))
              )}
            </div>
          </div>

          <div className="productOnMobile">
            <div className="row">
              <div className="col-7 d-flex justify-content-between">
                <p>Product</p>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <p className="pr-2">Price</p>
              </div>
            </div>
            <Divider />
            <div className="row">
              {cart.length === 0 ? (
                <div className="d-flex justify-content-center w-100 pt-5 pb-2">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <MobileCartItems key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
          <Divider className="my-4" />

          <div className="row justify-content-end">
            <div className="continuebtn">
              <Link to="/wellness-land/browse">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
      <CartTotal />
    </>
  );
}
export default CartList;
