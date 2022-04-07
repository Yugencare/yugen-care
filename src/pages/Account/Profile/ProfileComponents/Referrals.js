import Snackbar from "@material-ui/core/Snackbar";
import { FileCopy } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Em from "../../../../svgs/email.svg";
import FB from "../../../../svgs/facebook.svg";
import FixedAmount from "../../../../svgs/fixed-amount.svg";
import Tw from "../../../../svgs/twitter.svg";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Referrals() {
  const [openalert, setOpen] = useState(false);
  const { loyalty } = useSelector((state) => state.loginUser);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const CopyToClipboard = (e) => {
    navigator.clipboard.writeText(e);
    setOpen(true);
  };

  const [Data, setData] = useState([]);
  const getReferal = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/loyalty/strategy/a6db2160-504f-11ec-b8b7-69adf38135b7`
    );
    const data = await response.data.loyaltyStrategy;
    // console.log(data);
    setData(data);
  };

  useEffect(() => {
    getReferal();
  }, []);
  return (
    <div className="Referrals">
      <p>{loyalty?.referred} Refferals completed</p>
      <span>
        Give your friends a reward and claim your own when they make a purchase
        a book a service
      </span>
      <div className="row m-0 mb-5">
        <div className="col-sm-4 p-0 pt-5 fixed-amounts">
          <img src={FixedAmount} alt="" />
          <div className="pl-4">
            <p>You Get</p>
            <p>
              <span>{Data?.loyalty_value} points</span>
            </p>
          </div>
        </div>
        <div className="col-sm-4 p-0 pt-5 fixed-amounts">
          <img src={FixedAmount} alt="" />
          <div className="pl-4">
            <p>They Get</p>
            <p>
              <span>{Data?.loyalty_value} points</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="row m-0 mb-5 p-4"
        style={{ background: "#f6f6f6", borderRadius: 7 }}
      >
        <div className="col-md-6">
          <p>
            <strong>Your referral code</strong>
          </p>
          <div
            className="Redeem_code pl-2"
            style={{ justifyContent: "space-between" }}
          >
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              id="style-hide"
            >
              https://yugen.beuniquegroup.dev/signup/{loyalty?.id}
            </p>
            <FileCopy
              onClick={() =>
                CopyToClipboard(
                  `https://yugen.beuniquegroup.dev/signup/${loyalty?.id}`
                )
              }
            />
          </div>
        </div>
        <div className="col-md-6 d-flex referral-icons pt-4">
          <div className="text-center mr-3">
            <img src={FB} alt="" />
            <p>Facebook</p>
          </div>
          <div className="text-center mr-3">
            <img src={Tw} alt="" />
            <p>Twitter</p>
          </div>
          <div className="text-center mr-3">
            <img src={Em} alt="" />
            <p>Email</p>
          </div>
        </div>
      </div>
      <Snackbar
        open={openalert}
        autoHideDuration={1200}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}
