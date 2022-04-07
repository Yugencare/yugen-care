import {
  Divider,
  Fade,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Zoom,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { Done, SentimentDissatisfied } from "@material-ui/icons";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { withStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ClearCart } from "../../app/Cart/cart";
import LoadingOverlay from "../../components/LoadingOverlay";
import Errorpage from "../../layout/Errorpage";

const styles = (theme) => ({
  listItem: {
    padding: `0px 0`,
  },
  total: {
    fontWeight: "700",
  },
  title: {
    marginTop: 40,
  },
});

function OrderCompleted({ classes }) {
  const dispatch = useDispatch();
  const { order, status } = useSelector((state) => state.order);

  console.log(order);
  const location = useLocation();

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
  const formatDate = () => {
    try {
      var jsondate = new Date();
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

  if (order) {
    dispatch(ClearCart());
  }

  return (
    <Fade in={true} timeout={1000}>
      <div dir="ltr" className="ConfirmApp OrderCompleted">
        {status === "success" ? (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="text-center">
                  <Zoom
                    in={true}
                    timeout={{
                      appear: 1000,
                      enter: 1000,
                      exit: 1000,
                    }}
                  >
                    <Checkbox
                      icon={<CircleUnchecked />}
                      checkedIcon={<CircleCheckedFilled />}
                      checked={true}
                      disabled
                    />
                  </Zoom>
                  <h2>Your order has been recieved!</h2>
                  <Divider className="my-5" />
                </div>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{order.transaction_id}. We have emailed
                  your order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
                <Typography variant="h6" gutterBottom className="mt-3">
                  Order summary
                </Typography>
                <List disablePadding>
                  {order.products.map((product) => (
                    <ListItem className={classes.listItem} key={product.id}>
                      <ListItemText
                        primary={product.name}
                        secondary={`Quantity: ${product.quantity}`}
                      />
                      <Typography variant="body2">
                        {product.price} AED
                      </Typography>
                    </ListItem>
                  ))}

                  <div className="mt-5"></div>

                  {location.state?.discount && location.state.discount !== 0 && (
                    <ListItem className={classes.listItem}>
                      <ListItemText primary="Discount" />
                      <Typography variant="subtitle2">
                        {location.state.discount} AED
                      </Typography>
                    </ListItem>
                  )}
                  {location.state?.HD_fees && location.state.HD_fees !== 0 && (
                    <ListItem className={classes.listItem}>
                      <ListItemText primary="Handling and delivery fees" />
                      <Typography variant="subtitle2">
                        {location.state.HD_fees} AED
                      </Typography>
                    </ListItem>
                  )}
                  {location.state.cod_fees !== 0 && (
                    <ListItem className={classes.listItem}>
                      <ListItemText primary="Cash on delivery" />
                      <Typography variant="subtitle2">
                        {location.state.cod_fees} AED
                      </Typography>
                    </ListItem>
                  )}

                  <ListItem
                    style={{ marginTop: 20 }}
                    className={classes.listItem}
                  >
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                      {order.total} AED
                    </Typography>
                  </ListItem>
                </List>
                <Grid container spacing={16} justify="space-between">
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.title}
                    >
                      Shipping
                    </Typography>
                    <Typography gutterBottom>{order.customer.name}</Typography>
                    <Typography gutterBottom>
                      {order.address.address}
                    </Typography>
                  </Grid>
                  <Grid item container direction="column" xs={12} sm={5}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.title}
                    >
                      Payment details
                    </Typography>
                    <Grid container>
                      {/* {payments.map((payment) => (
                      <React.Fragment key={payment.name}>
                        <Grid item xs={6}>
                          <Typography gutterBottom>{payment.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography gutterBottom>{payment.detail}</Typography>
                        </Grid>
                      </React.Fragment>
                    ))} */}
                      <Grid item xs={8}>
                        <Typography gutterBottom>Payment Method </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography gutterBottom>Cash on delivery</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        ) : status === "failed" ? (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="text-center">
                  <Zoom
                    in={true}
                    timeout={{
                      appear: 1000,
                      enter: 1000,
                      exit: 1000,
                    }}
                  >
                    <Checkbox
                      icon={<SentimentDissatisfied />}
                      checkedIcon={<SentimentDissatisfied />}
                      checked={true}
                      disabled
                    />
                  </Zoom>
                  <h2>Something went wrong</h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingOverlay />
        )}
        <div className="text-center mt-5">
          <Link to="/wellness-land" className="btn2">
            Continue Shopping
          </Link>
        </div>
      </div>
    </Fade>
  );
}
export default withStyles(styles)(OrderCompleted);
