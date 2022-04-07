import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GetLocalCart } from "../../app/Cart/cart";
import { postOrder } from "../../app/E-commerce/order";
import PageHeader from "../../layout/PageHeader";
import CartPreview from "./CartPreview";
import Details from "./Details";
import CartList from "./CartList";
import { Helmet } from "react-helmet";
const orderid = require("order-id")("WisamAPP");

export default function Checkout() {
  const { details } = useSelector((state) => state.loginUser);
  const { isLoggedIn, profile } = useSelector((state) => state.loginUser);
  const [Email, setEmail] = useState(isLoggedIn ? profile?.email : null);
  const [Fname, setFname] = useState(profile?.first_name);
  const [Lname, setLname] = useState(profile?.last_name);

  const [Phone, setPhone] = useState(details?.patient_phone);
  const [Address, setAddress] = useState(details?.patient_address);
  const [Suite, setSuite] = useState("");
  const [Street, setStreet] = useState("");
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [StateIndex, setStateIndex] = useState(0);
  const [Instructions, setInstructions] = useState("");
  const { cart, total } = useSelector((state) => state.cart);

  const handleChangeInstructions = (event) => {
    const value = event.target.value;
    setInstructions(value);
  };
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleChangeFname = (event) => {
    const value = event.target.value;
    setFname(value);
  };
  const handleChangeLname = (event) => {
    const value = event.target.value;
    setLname(value);
  };
  const handleChangePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
  };
  const handleChangeAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
  };
  const handleChangeSuite = (event) => {
    const value = event.target.value;
    setSuite(value);
  };
  const handleChangeStreet = (event) => {
    const value = event.target.value;
    setStreet(value);
  };
  const handleChangeCity = (event) => {
    const value = event.target.value;
    setCity(value);
  };
  const handleChangeState = (event) => {
    const value = event.target.value;
    setState(value);
  };
  const handleChangeCon = (event) => {
    const value = event.target.value;
    setCountry(value);
    setStateIndex(parseInt(value.split("/")[1]));
  };

  const [Data, setData] = useState(null);

  const getShipping = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/shipping/6d886050-5007-11ec-a792-5fc297d459a0`
    );
    const data = await response.data.shipping;
    console.log(data);
    setData(data);
  };
  useEffect(() => {
    getShipping();
  }, []);
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [Code, setCode] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();
  const PlaceOrder = async (e) => {
    e.preventDefault();
    const transaction_id = orderid.generate();

    //PROCESSING
    let products = [];
    for (let i = 0; i < cart.length; i++) {
      products.push({
        id: cart[i].product.id,
        name: cart[i].product.name,
        name_ar: cart[i].product.name_ar,
        price: cart[i].product.price,
        quantity: cart[i].quantity,
        images: cart[i].product.images,
      });
    }

    //ORDER FORMAT

    const ThisOrder = {
      user_id: isLoggedIn ? profile?.id : "Guest",
      products: products,
      customer: {
        name: `${Fname} ${Lname}`,
        phone: Phone,
      },
      email: Email,
      address: {
        address: Address,
        state: State,
        city: City,
        street: Street,
        suite: Suite,
      },
      payment_method: "COD",
      discount_code: Code,
      delivery_instructions: Instructions,
      total:
        total +
        Data.delivery_fees +
        Data.handling_fees +
        Data.cod_fees +
        discount,
      transaction_id: transaction_id,
      status: "pending",
      order_history: [
        {
          status: "pending",
          date: new Date(),
        },
      ],
    };
    console.log(ThisOrder);
    //DISPATCHING ORDER
    if (Email) {
      dispatch(postOrder(ThisOrder));
      history.push({
        pathname: "/order-completed",
        state: {
          HD_fees: Data.delivery_fees + Data.handling_fees,
          cod_fees: Data.cod_fees,
          discount: discount,
        },
      });
    }
  };

  useEffect(() => {
    const saved_cart = localStorage.getItem("cart");
    if (saved_cart) {
      dispatch(GetLocalCart(saved_cart));
    }
  }, []);

  return (
    <div dir="ltr">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout | Yugen Care</title>
        <meta
          name="description"
          content="Yugen Care, Jumeirah Beach Road, Jumeirah 3, UAE"
        />
        {/* <script type="application/ld+json">{schemaJSON}</script> */}
      </Helmet>
      <PageHeader pagename="Checkout" />
      {cart && cart.length !== 0 ? (
        <form onSubmit={PlaceOrder}>
          <div className="row m-0 Checkout_page position-relative">
            <div className="col-md-7 content-block5 c-white-block">
              <Details
                Data={Data}
                Email={Email}
                Country={Country}
                Fname={Fname}
                Lname={Lname}
                State={State}
                Phone={Phone}
                Suite={Suite}
                Address={Address}
                Street={Street}
                State={State}
                StateIndex={StateIndex}
                City={City}
                value={value}
                Instructions={Instructions}
                handleChangeEmail={handleChangeEmail}
                handleChangeFname={handleChangeFname}
                handleChangeLname={handleChangeLname}
                handleChangePhone={handleChangePhone}
                handleChangeAddress={handleChangeAddress}
                handleChangeSuite={handleChangeSuite}
                handleChangeStreet={handleChangeStreet}
                handleChangeCon={handleChangeCon}
                handleChangeState={handleChangeState}
                handleChangeCity={handleChangeCity}
                handleChange={handleChange}
                handleChangeInstructions={handleChangeInstructions}
              />
            </div>
            <div className="col-md-5 content-block1 c-grey-block">
              <CartPreview
                Data={Data}
                setDiscount={setDiscount}
                discount={discount}
                setCode={setCode}
              />
            </div>
          </div>
        </form>
      ) : (
        <CartList />
      )}
    </div>
  );
}
