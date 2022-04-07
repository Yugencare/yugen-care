import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactCodeInput from "react-verification-code-input";
import { ChangeStep } from "../../app/Booking/department";
import Phone from "../../images/verifyphone.png";

function PhoneVerification({ PhoneNo, setverifyCode }) {
  const { details } = useSelector((state) => state.loginUser);
  const { ActiveStep } = useSelector((state) => state.departments);
  const dispatch = useDispatch();
  useEffect(() => {
    if (details && details?.patient_phone !== "") {
      dispatch(ChangeStep(ActiveStep + 1));
    }
  }, []);
  const MaskPhone = () => {
    var Phone = PhoneNo?.toString();
    var FirstThree = Phone?.slice(0, 3);
    var LastThree = Phone?.slice(Phone.length - 3, Phone.length);
    return "+" + FirstThree + "·····" + LastThree;
  };

  const [timer, setTimer] = useState(60);

  setTimeout(() => {
    if (timer !== 0) {
      setTimer(timer - 1);
    }
  }, 1000);
  useEffect(() => {
    dispatch(ChangeStep(5));
  }, []);
  return (
    <div className="PhoneVerification">
      <p style={{ width: "70%" }}>
        Please Enter the 6 digit code sent to your mobile number.
      </p>
      <p>Phone Number</p>
      <div className="d-flex align-items-center">
        <img className="pl-3" src={Phone} alt="" />
        <p className="PhoneFormat mb-0 pl-4">{MaskPhone()}</p>
      </div>
      <div className="pl-3 mt-4">
        <p style={{ fontSize: 14, fontWeight: 600 }}>
          Please enter your security code
        </p>
        <ReactCodeInput onComplete={(c) => setverifyCode(c)} />
      </div>
      <div className=" pl-3 d-flex align-items-end mt-4">
        {timer !== 0 ? (
          <>
            <CircularProgress />
            <p className="pl-2 mb-0">
              Resend Possible in <span>{timer} sec</span>
            </p>
          </>
        ) : (
          <button onClick={() => setTimer(60)} className="resendbtn">
            Resend code
          </button>
        )}
      </div>
    </div>
  );
}
export default PhoneVerification;
