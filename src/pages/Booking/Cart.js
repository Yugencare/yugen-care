import { Divider, Fade } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Calender from "../../images/CalendarIcon.png";
import DoctorIcon from "../../images/doctorIcon.png";
import LocationIcon from "../../images/LocationCart.png";
import ServiceIcon from "../../images/ServiceIcon.png";

export default function Cart({ chosen, setOpenModal, ClearCart }) {
  const [contactmail, setContactmail] = useState("");
  const handleEmailChange = (event) => {
    setContactmail(event.target.value);
  };

  const { departmentSelected } = useSelector((state) => state.departments);
  const { SelectedDoctor } = useSelector((state) => state.doctors);
  const { Selectedtime } = useSelector((state) => state.timeslots);
  const { ActiveStep } = useSelector((state) => state.departments);

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
      var jsondate = new Date(Selectedtime);
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

  const { HasDetails } = useSelector((state) => state.loginUser);
  return (
    <>
      <div className="BookingCart content-block1 position-relative">
        <a onClick={() => setOpenModal(true)} className="close-drawer"></a>
        <div className="d-flex   mb-3">
          <img src={LocationIcon} alt="" style={{ height: "fit-content" }} />
          <p>{chosen.address}</p>
        </div>
        {departmentSelected === null ||
        Object.values(departmentSelected).length === 0 ? null : (
          <Fade in={true} timeout={1000}>
            <div className="d-flex align-items-center mb-3">
              <img src={ServiceIcon} alt="" />
              <p>
                {departmentSelected.department}
                {/* {departmentSelected.specialisation === ""
                  ? "Unnamed service"
                  : departmentSelected.specialisation} */}
              </p>
            </div>
          </Fade>
        )}
        {/* {SelectedDoctor !== null ? (
          <Fade in={true} timeout={1000}>
            <div className="d-flex align-items-center mb-3">
              <img src={DoctorIcon} alt="" />
              <p>{SelectedDoctor.doctor_name}</p>
            </div>
          </Fade>
        ) : null} */}
        {Selectedtime !== null ? (
          <Fade in={true} timeout={1000}>
            <div className="d-flex align-items-center mb-4">
              <img src={Calender} alt="" />
              <p>{formatDate()}</p>
            </div>
          </Fade>
        ) : null}
      </div>

      <div className="discountCode">
        {/* {SelectedDate.day !== undefined ? (
          <Fade in={true} timeout={1000}>
            <div>
              <div className="d-flex align-items-center mb-3">
                <TextField
                  id="outlined-discount"
                  label="Discount Code"
                  value={contactmail}
                  onChange={handleEmailChange}
                  variant="outlined"
                  size="small"
                  error={contactmail === "c"}
                  helperText={contactmail === "c" ? "Invalid Coupon" : null}
                  InputLabelProps={{
                    style: { fontFamily: "Raleway", fontSize: 14 },
                  }}
                />
                <button
                  onClick={() => setDiscountCode(contactmail)}
                  className="ml-3 applybtn"
                >
                  Apply
                </button>
              </div>
              {DiscountCode.length !== 0 ? (
                <div className=" mb-4">
                  <div className="discountToken d-flex align-items-center">
                    <LocalOfferIcon
                      style={{ transform: "rotate(90deg)", color: "#7d7c7a" }}
                    />
                    <p>{DiscountCode}</p>
                    <a
                      onClick={() => setDiscountCode("")}
                      className="close-drawer"
                    ></a>
                  </div>
                </div>
              ) : null}
            </div>
          </Fade>
        ) : null} */}
        <Divider className="mb-3" />
        <div className="d-flex justify-content-between mb-4">
          {ActiveStep === 5 ? (
            <p style={{ fontStyle: "italic" }}>
              {" "}
              {HasDetails ? "Verify your details" : "Complete your profile"}
            </p>
          ) : null}
          {/* <p>TOTAL</p>
          <p>
            <span>XX AED</span>
          </p> */}
        </div>
      </div>
    </>
  );
}
