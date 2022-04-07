import { Divider, Fade } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingOverlay from "../../../components/LoadingOverlay";
import LoadingCircle from "../../Booking/LoadingCircle";
import OrderDetails from "./OrderDetails";
import { Zoom } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //   border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5),
    maxWidth: 650,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

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
    var parsedDate = `${day} ${month} ${year}`;
    return parsedDate;
  } catch (e) {
    console.log(e);
  }
};
const formatTime = (data) => {
  try {
    var jsondate = new Date(data);
    //Getting time
    const time = formatAMPM(jsondate);
    var parsedDate = `at ${time}`;
    return parsedDate;
  } catch (e) {
    console.log(e);
  }
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { profile } = useSelector((state) => state.loginUser);
  const [loader, setLoader] = useState(false);

  const getOrders = async () => {
    setLoader(true);
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/orders/user/${profile?.id}`
    );
    const data = await response.data.orders;
    setLoader(false);
    console.log(data);
    setOrders(data);
  };
  useEffect(() => {
    getOrders();
  }, []);

  const [open, setOpen] = useState(false);

  function CancelModel({ id }) {
    const [openCancel, setOpenCancel] = useState(false);

    const classes = useStyles();

    const CancelOrder = async () => {
      const response = await axios.get(
        `https://server.yugencare.com/api/v1/orders/cancel-order/${id}`
      );
      const data = await response.data.order;
      getOrders();
    };
    const HandleCancel = () => {
      setOpenCancel(false);
      CancelOrder();
    };
    return (
      <>
        <p style={{ marginTop: 15 }}>
          <button onClick={() => setOpenCancel(true)}>Cancel order</button>
        </p>
        <div className="text-center">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openCancel}
            onClose={() => setOpenCancel(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Zoom in={openCancel}>
              <div
                className={
                  classes.paper + " Applyform content-block1 position-relative"
                }
              >
                <div
                  onClick={() => setOpenCancel(false)}
                  className="close-drawer"
                />
                <h2 id="transition-modal-title">Cancel this order?</h2>
                <div id="transition-modal-description">
                  <div className="container-fluid cancelcartform">
                    <div className="row mt-2">
                      <div className="col-md-8 mt-3 pl-0 d-flex align-items-center">
                        <button
                          onClick={() => setOpenCancel(false)}
                          className="btn2 mr-2"
                          style={{ background: "#968888", minWidth: 130 }}
                        >
                          No
                        </button>
                        <button onClick={HandleCancel} className="btn2">
                          Yes
                        </button>
                        {/* {applied ? <CircularProgress /> : null} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        </div>
      </>
    );
  }

  return (
    <Fade in={true} timeout={700}>
      <div className="Appointments content-block1">
        <h2>My Orders</h2>
        <Divider />
        <div className="appointments-container" id="style-3">
          {!loader ? (
            orders && orders.length !== 0 ? (
              orders.map((apps, idx) => (
                <div className="" key={apps.id}>
                  <div
                    className={
                      apps.status !== "delivered" &&
                      apps.status !== "canceled" &&
                      apps.status !== "refunded"
                        ? "row m-0 my-5"
                        : "row m-0 my-5 finishedOrder"
                    }
                  >
                    <div className="col-3">
                      <p>Order #{apps.transaction_id}</p>
                      {apps.status !== "delivered" ? (
                        <OrderDetailsModel apps={apps} />
                      ) : null}
                    </div>
                    <div className="col-3">
                      <p>{formatDate(apps.createdAt)}</p>
                      <p>{formatTime(apps.createdAt)}</p>
                    </div>
                    <div className="col-2">
                      <p>{apps.customer?.name}</p>
                    </div>
                    <div className="col-2">
                      <p>AED {apps.total}</p>
                    </div>
                    <div className="col-2">
                      <p style={{ textTransform: "capitalize" }}>
                        {apps.status}
                      </p>
                      {apps.status !== "delivered" &&
                      apps.status !== "canceled" &&
                      apps.status !== "refunded" ? (
                        <CancelModel id={apps.id} />
                      ) : null}
                    </div>
                  </div>
                  <Divider />
                </div>
              ))
            ) : (
              <div className="content-block1 d-flex justify-content-center w-100 pt-5 pb-2">
                <h3>You Have No Orders</h3>
              </div>
            )
          ) : (
            <LoadingCircle />
          )}
        </div>
      </div>
    </Fade>
  );
}

function OrderDetailsModel({ apps }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <p style={{ marginTop: 15 }}>
        <button onClick={() => setOpen(true)}>View details</button>
      </p>{" "}
      <OrderDetails order={apps} open={open} setOpen={setOpen} />{" "}
    </>
  );
}
