import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { setPatient_phone } from "../../app/Account/loginUser";
import Phone from "../../images/verifyphone.png";

function AddPhone({ setPhoneNo, PhoneNo }) {
  const { details } = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const HasPhoneNo = () => {
    console.log(details);
    if (details && details?.patient_phone !== "") {
      return true;
    } else return false;
  };
  const MaskPhone = () => {
    var Phone = details?.patient_phone.toString();
    setPhoneNo(Phone);
    var FirstThree = Phone?.slice(0, 4);
    var LastThree = Phone?.slice(Phone.length - 3, Phone.length);
    return FirstThree + "·····" + LastThree;
  };
  const [IsPhone, setIsPhone] = useState(HasPhoneNo());

  return (
    <div className="AddPhone">
      <p style={{ width: "70%" }}>
        Please provide your mobile phone number to confirm your appointment
        booking
      </p>
      <form className="pb-2">
        <p>Phone Number</p>
        {IsPhone ? (
          <div className="d-flex align-items-center">
            <img className="pl-3" src={Phone} alt="" />
            <p className="PhoneFormat mb-0 pl-4">{MaskPhone()}</p>
            <button onClick={() => setIsPhone(false)}>
              <p>Change</p>
            </button>
          </div>
        ) : (
          <PhoneInput
            country={"ae"}
            value={PhoneNo}
            onChange={(phone) => {
              setPhoneNo(phone);
              dispatch(setPatient_phone(phone));
            }}
            masks={{ ae: "(..) ...-...." }}
          />
        )}
      </form>
    </div>
  );
}
export default AddPhone;
