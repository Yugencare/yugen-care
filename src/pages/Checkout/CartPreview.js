import {
  CircularProgress,
  Divider,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import { ArrowBackIos, Code, LocalOffer } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetLocalCart } from "../../app/Cart/cart";
import Prod from "../../images/prod3.jpg";

const cartSample = [
  {
    name: "Product Name1",
    img: Prod,
    price: "362.50",
  },
];

export default function CartPreview({
  PlaceOrder,
  Data,
  setDiscount,
  discount,
  setCode,
}) {
  const [DiscountCode, setDiscountCode] = useState("");
  const [contactmail, setContactmail] = useState("");
  const [Load, setLoad] = useState(false);
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const handleEmailChange = (event) => {
    setContactmail(event.target.value);
  };
  const { cart, total } = useSelector((state) => state.cart);
  // const [Code, setCode] = useState(null);

  const getCode = async (code) => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/loyalty/discounts/${code}`
    );
    const data = await response.data;
    return data;
  };
  const HandleCode = async (code) => {
    setLoad(true);
    const Code = await getCode(code).then(setLoad(false));
    setDiscountCode(Code);
    setCode(Code.points?.discount_code);
    if (Code?.points?.discount_type === "percent") {
      let discount_price = -(Code.points.loyalty_product_value / 100) * total;
      setDiscount(discount_price);
    } else if (Code?.points?.discount_type === "aed") {
      let discount_price = -Code.points.loyalty_product_value;
      setDiscount(discount_price);
    }
  };

  const HandleDiscountType = (Code) => {
    if (Code?.discount_type === "percent") {
      return "% OFF";
    } else if (Code?.discount_type === "aed") {
      return "AED OFF";
    } else if (Code?.discount_type === "points") {
      return "POINTS";
    }
  };
  return (
    <div className="CartPreview px-3 ">
      {cart.map((item) => (
        <div key={item.product.id} className="row m-0 my-4 align-items-center">
          <div className="col-3 pl-0">
            <img
              src={
                item.product.images &&
                item.product.images.length !== 0 &&
                item.product.images[0].url
              }
              alt=""
            />
          </div>
          <div className="col-5 pr-0 pl-0">
            <p>
              {item.product.name} x{item.quantity}
            </p>
          </div>
          <div className="col-4 pr-0 text-right ">
            <p>
              <span>AED {item.product.price}</span>
            </p>
          </div>
        </div>
      ))}
      <Divider />
      <div className="discount-grid">
        <TextField
          id="outlined-discount"
          label="Discount Code"
          value={contactmail}
          onChange={handleEmailChange}
          variant="outlined"
          size="small"
          error={DiscountCode?.status === "fail"}
          helperText={
            DiscountCode?.status === "fail"
              ? lang === "en"
                ? "Invalid Coupon"
                : "قسيمة غير صالحة"
              : null
          }
          InputLabelProps={{
            style: { fontFamily: "Raleway", fontSize: 14 },
          }}
        />
        {Load ? (
          <CircularProgress />
        ) : (
          <div onClick={() => HandleCode(contactmail)} className="applybtn">
            Apply
          </div>
        )}
      </div>
      {DiscountCode.status === "success" ? (
        <div className=" my-3">
          <div className="discountToken d-flex align-items-center">
            <LocalOffer
              style={{ transform: "rotate(90deg)", color: "#7d7c7a" }}
            />
            <p>
              {DiscountCode.points?.loyalty_product_value}{" "}
              {HandleDiscountType(DiscountCode.points)}
            </p>
            <a
              onClick={() => {
                setDiscountCode("");
                setDiscount(0);
              }}
              className="close-drawer"
            ></a>
          </div>
        </div>
      ) : null}

      <Divider style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }} />
      {Data && (
        <div className="total-reciept">
          <div className="d-flex justify-content-between">
            <p>Subtotal</p>
            <p>AED {total}</p>
          </div>

          {discount && discount !== 0 ? (
            <div className="d-flex justify-content-between">
              <p>Discount</p>
              <p>AED {discount}</p>
            </div>
          ) : null}
          <div className="d-flex justify-content-between">
            <p>Handling and delivery fees</p>
            <p>
              AED{" "}
              {Data.delivery_fees + Data.handling_fees === 0 ? (
                <span>FREE</span>
              ) : (
                Data.delivery_fees + Data.handling_fees
              )}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Cash on delivery</p>
            <p>AED {Data.cod_fees}</p>
          </div>
          <Divider style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} />
          <div className="d-flex justify-content-between">
            <p>
              <strong>Total</strong>
            </p>
            <p>
              <strong>
                AED{" "}
                {total +
                  Data.delivery_fees +
                  Data.handling_fees +
                  Data.cod_fees +
                  discount}
              </strong>
            </p>
          </div>
          <div className="checkout_nav my-5">
            <Link
              to="/wellness-land"
              className="d-flex align-items-center"
              // style={{ cursor: "pointer" }}
            >
              <ArrowBackIos />
              <p>Return to shop</p>
            </Link>

            <button type="submit" className="btn11" to="#">
              {/* <p>Proceed to Payment </p> */}
              <p>Place Order </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
