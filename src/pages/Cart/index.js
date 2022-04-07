import React from "react";
//images
import prod1 from "../../images/prod3.jpg";
import PageHeader from "../../layout/PageHeader";
import CartList from "./CartList";

const items = [
  {
    id: 1,
    img: prod1,
    name: "PRODUCT NAME",
    orginal_price: "400",
    price: "362.50",
  },
  {
    id: 2,
    img: prod1,
    name: "PRODUCT NAME",
    orginal_price: "400",
    price: "362.50",
  },
  {
    id: 3,
    img: prod1,
    name: "PRODUCT NAME",
    orginal_price: "400",
    price: "3622.50",
  },
  // {
  //     img: prod1,
  //     name: "PRODUCT NAME",
  //     orginal_price: "400",
  //     price: "362.50"
  // },
  // {
  //     img: prod1,
  //     name: "PRODUCT NAME",
  //     orginal_price: "400",
  //     price: "362.50"
  // },
  // {
  //     img: prod1,
  //     name: "PRODUCT NAME",
  //     orginal_price: "400",
  //     price: "362.50"
  // }
];

function Cart() {
  return (
    <div className="Cart">
      <PageHeader pagename="View Cart" />
      <CartList items={items} />
    </div>
  );
}
export default Cart;
