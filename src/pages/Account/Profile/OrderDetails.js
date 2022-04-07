import {
  Divider,
  Fade,
  makeStyles,
  Modal,
  Paper,
  Slide,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import product from "../../../images/pro2.jpg";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
}));

const orders = [
  {
    img: product,
    name: "Product Name",
    brand: "Brand",
    size: "200 ml",
    qty: 1,
    price: "AED XX",
    status: "In transit",
    dod: "25 April 2021",
  },
  {
    img: product,
    brand: "Brand",
    name: "Product Name",
    size: "200 ml",
    qty: 1,
    price: "AED XX",
    status: "In transit",
    dod: "25 April 2021",
  },
  {
    img: product,
    brand: "Brand",
    name: "Product Name",
    size: "200 ml",
    qty: 1,
    price: "AED XX",
    status: "In transit",
    dod: "25 April 2021",
  },
  {
    img: product,
    brand: "Brand",
    name: "Product Name",
    size: "200 ml",
    qty: 1,
    price: "AED XX",
    status: "In transit",
    dod: "25 April 2021",
  },
  {
    img: product,
    brand: "Brand",
    name: "Product Name",
    size: "200 ml",
    qty: 1,
    price: "AED XX",
    status: "In transit",
    dod: "25 April 2021",
  },
];

const nth = (d) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};
const formatDate = (data) => {
  try {
    var jsondate = new Date(data);
    //Getting Day
    var day = jsondate.getDate();
    var ordinal = nth(day);
    day = day + ordinal;
    // Getting Month
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][jsondate.getMonth()];
    //Geting Year
    const year = jsondate.getFullYear();
    //Getting time
    const time = formatAMPM(jsondate);
    var parsedDate = `${day} ${month} ${year} at ${time}`;
    return parsedDate;
  } catch (e) {
    console.log(e);
  }
};

export default function OrderDetails({ open, setOpen, order }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Slide direction="up" in={open} timeout={200}>
        <Paper className="OrderDetails content-block5 position-relative">
          <div onClick={handleClose} className="close-drawer" />
          <div className="d-flex align-items-center mt-5">
            <h2 className="mr-auto mb-0">Order #{order.transaction_id}</h2>
            <p className="pr-4 mb-0">{formatDate(order.createdAt)}</p>
            {/* <Link>Track Order</Link> */}
          </div>
          <Divider className="my-4" />
          <div className="orderlist-container" id="style-3">
            {order.products &&
              order.products.length !== 0 &&
              order.products.map((pro, idx) => (
                <div key={pro.id}>
                  <div className="row m-0 ">
                    <div className="col-sm-6 col-md-3">
                      <img
                        src={
                          pro.images && pro.images.length !== 0
                            ? pro.images[0].url
                            : product
                        }
                        alt=""
                      />
                    </div>
                    <div className="col-sm-6 col-md-5">
                      <p className="mt-3">{pro.name}</p>
                      {/* <p>
                      <sub>{pro.brand}</sub>
                    </p> */}
                      <p className="mt-2">
                        <small>
                          {/* Size: {pro.size} &nbsp; &nbsp; */}
                          QTY: {pro.quantity}
                        </small>
                      </p>
                      <p>
                        <span>AED {pro.price}</span>
                      </p>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <p className="mt-4">
                        <sub>Status</sub>
                      </p>
                      <p>
                        {order.status === "pending" ? "Pending" : "In transit"}
                      </p>
                    </div>
                    {/* <div className="col-sm-6 col-md-3">
                    <p className="mt-4">
                      <sub>Expected Delivery</sub>
                    </p>
                    <p>{pro.dod}</p>
                  </div> */}
                  </div>
                  <Divider className="my-4" />
                </div>
              ))}
          </div>
        </Paper>
      </Slide>
    </Modal>
  );
}
