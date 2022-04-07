import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CloseDrawer, TotalCartPrice } from "../../app/Cart/cart";
import paymentmethods from "../../images/paymentmethods.jpg";
import CartDrawerItems from "./CartDrawerItems";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    width: 600,
    padding: "10%",
    [theme.breakpoints.down("1399.98")]: {
      width: "400px",
    },
    [theme.breakpoints.down("575.98")]: {
      width: "300px",
    },
  },
}));
function CartDrawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { OpenCart, cart, total } = useSelector((state) => state.cart);
  const { lang } = useSelector((state) => state.lang);

  const CloseCart = () => {
    props.handleCloseDrawer();
    dispatch(CloseDrawer());
  };
  useEffect(() => {
    dispatch(TotalCartPrice());
  }, [cart]);

  return (
    <Drawer
      transitionDuration={600}
      variant="temporary"
      open={OpenCart ? true : props.drawer}
      anchor="right"
      dir="ltr"
      onClose={CloseCart}
    >
      <div
        className={
          classes.backdrop +
          ` CartDrawer content-block1 ${lang === "en" ? "" : "Local-arabic"}`
        }
      >
        <div className="drawer-heading  ">
          <h2> {lang === "en" ? "Shopping bag" : "عربة تسوق"}</h2>
          <a onClick={CloseCart} className="close-drawer"></a>
          <Divider className="mt-4" />
        </div>

        <CartDrawerItems />
        {lang === "en" && (
          <p>if you have a special code, you apply it at the checkout!</p>
        )}

        <div className="drawer-footer">
          <div className="total-price d-flex mb-3">
            <p className="mr-auto p-2">{lang === "en" ? "Total" : "المجموع"}</p>
            <p className="p-2">
              {parseFloat(total)} {lang === "en" ? "AED" : "د.إ"}
            </p>
          </div>
          <Link to="/checkout">
            <div onClick={CloseCart} className="cartbtn checkout">
              <Link to="/checkout">
                {lang === "en" ? "CHECKOUT" : "تابع عملية الشراء"}
              </Link>
            </div>
          </Link>
          <div className="paymentmethods text-center">
            <img src={paymentmethods} alt="" />
            <p>
              {lang === "en"
                ? "We guarantee security of every transaction"
                : "نحن نضمن أمن كل المعاملات"}
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default CartDrawer;
