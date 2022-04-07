import { Divider, Fade } from "@material-ui/core";
//images
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddProduct, DeleteProduct, RemoveProduct } from "../../app/Cart/cart";

export default function MobileCartItems({ item }) {
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
        <div className="col-8 d-flex align-items-between mt-4">
          <div className="item-img">
            <img src={item.img} atl="" />
          </div>
          <div className="item-info pl-4 pt-2">
            <p>{item.name}</p>

            <div className="add-remove-item d-flex align-items-end ml-0 pb-2">
              <ArrowLeftIcon
                fontSize="small"
                onClick={() => handleAddItem("remove", item)}
              />
              <p>{item.quantity}</p>
              <ArrowRightIcon
                fontSize="small"
                onClick={() => handleAddItem("add", item)}
              />
            </div>
          </div>
          <Divider />
        </div>
        <div className="col-4 d-flex justify-content-end align-items-end mt-4">
          <div className="item-info">
            <p>
              <small>AED {item.orginal_price} </small>
            </p>
            <p>
              <span> AED {item.price} </span>
            </p>
          </div>
          <div className="deleteItem">
            <div className="close-drawer" onClick={() => HandleDelete(item)} />
          </div>
        </div>
        <Divider />
      </div>
    </Fade>
  );
}
