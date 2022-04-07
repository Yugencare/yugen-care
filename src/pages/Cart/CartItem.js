import { Fade } from "@material-ui/core";
import { DeleteOutlineOutlined } from "@material-ui/icons";
//images
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddProduct, DeleteProduct, RemoveProduct } from "../../app/Cart/cart";

export default function CartItem({ item }) {
  const [Exists, setExists] = useState(true);
  const dispatch = useDispatch();
  const handleAddItem = (event, item) => {
    if (event === "add") {
      var c = {
        id: item.id,
        img: item.img,
        name: item.name,
        orginal_price: item.orginal_price,
        price: item.price,
        quantity: 1,
      };
      dispatch(AddProduct(c));
    }
    if (event === "remove") {
      dispatch(DeleteProduct(item));
    }
  };
  const HandleDelete = (item) => {
    setExists(false);
    setTimeout(() => {
      dispatch(RemoveProduct(item));
    }, 500);
  };
  return (
    <Fade in={Exists} timeout={500}>
      <div className="row w-100">
        <div className="col-sm-6 d-flex justify-content-between align-items-center mt-4">
          <div className="item-img">
            <img src={item.img} atl="" />
          </div>

          <div className="item-info ">
            <p>
              <small>AED {item.orginal_price} </small>
              <span> AED {item.price} </span>
            </p>
            <div className="deleteItem">
              <DeleteOutlineOutlined onClick={() => HandleDelete(item)} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 d-flex justify-content-between align-items-center mt-4">
          <div className="add-remove-item d-flex ml-0 ml-md-5">
            <ArrowLeftIcon
              className="additem"
              fontSize="small"
              onClick={() => handleAddItem("remove", item)}
            />
            <p>{item.quantity}</p>
            <ArrowRightIcon
              className="additem"
              fontSize="small"
              onClick={() => handleAddItem("add", item)}
            />
          </div>
          <div className="item-info">
            <p>AED {item.price * item.quantity}</p>
          </div>
        </div>
      </div>
    </Fade>
  );
}
