import { Divider, Fade, Zoom } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { Done } from "@material-ui/icons";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeIndex } from "../../app/Account/menu";
import { saveAppointment } from "../../app/Booking/appointments";
import { ChangeStep, DeSelectDepartment } from "../../app/Booking/department";
import { DeselectDoctor } from "../../app/Booking/doctors";
import { DeselectTime } from "../../app/Booking/timeslots";
import Calender from "../../images/CalendarIcon.png";
import DoctorIcon from "../../images/doctorIcon.png";
import LocationIcon from "../../images/LocationCart.png";
import ServiceIcon from "../../images/ServiceIcon.png";
import LoadingCircle from "./LoadingCircle";

function ConfirmApp({
  ServiceSelected,
  DoctorSelected,
  SelectedDate,
  PaymentMethod,
  chosen,
}) {
  const dispatch = useDispatch();
  const { departmentSelected } = useSelector((state) => state.departments);
  const { SelectedDoctor } = useSelector((state) => state.doctors);
  const { Selectedtime } = useSelector((state) => state.timeslots);
  const { details, isLoggedIn } = useSelector((state) => state.loginUser);
  const { isSaved, appointdata } = useSelector((state) => state.appointments);
  const { registeration_data } = useSelector((state) => state.saveprofile);
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
  const Payment = () => {
    if (PaymentMethod === "PAY LATER") {
      return (
        <div className="d-flex justify-content-between my-3">
          <p>Pending Payment</p>
        </div>
      );
    } else if (PaymentMethod === "PAY NOW") {
      return (
        <div className="d-flex justify-content-between my-3">
          <p>Payment Recieved</p>
        </div>
      );
    }
  };
  const HandleConfirm = () => {
    dispatch(changeIndex(0));
    dispatch(ChangeStep(0));
    dispatch(DeselectTime());
    dispatch(DeselectDoctor());
    dispatch(DeSelectDepartment());
  };

  useEffect(() => {
    console.log(registeration_data);
    console.log(details);
    const currentData = {
      resource_id: SelectedDoctor.doctor_id,
      center_id: 0,
      appointment_date: Selectedtime,
      mr_no: details?.mr_no ? details.mr_no : registeration_data?.mr_no,
      patient_phone: details?.patient_phone,
      patient_name: details?.patient_name + " " + details?.last_name,
    };
    dispatch(saveAppointment({ NewApp: currentData }));
    return () => {
      HandleConfirm();
    };
  }, []);
  console.log(departmentSelected);
  return isSaved === "success" ? (
    <Fade in={true} timeout={1000}>
      <div className="ConfirmApp text-center">
        <div className="container">
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
          <h2>Appointment Confirmed </h2>
          <Divider className="my-5" />

          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-5 col-xl-4">
              <div className="BookingCart content-block1 position-relative text-left">
                {Selectedtime !== null ? (
                  <div className="d-flex align-items-center mb-3">
                    <img src={Calender} alt="" />

                    <p>{formatDate()}</p>
                  </div>
                ) : null}
                {/* {ServiceSelected.map((service) => ( */}
                {departmentSelected === null ||
                Object.values(departmentSelected).length === 0 ? null : (
                  <div className="d-flex align-items-center mb-3">
                    <img src={ServiceIcon} alt="" />
                    <p>
                      {departmentSelected.department === ""
                        ? "Unnamed service"
                        : departmentSelected.department}
                    </p>
                  </div>
                )}
                {/* ))} */}
                {/* {SelectedDoctor !== null ? (
                  <div className="d-flex align-items-center mb-3">
                    <img src={DoctorIcon} alt="" />
                    <p>{SelectedDoctor.doctor_name}</p>
                  </div>
                ) : null} */}

                <div className="d-flex  mb-3">
                  <img
                    src={LocationIcon}
                    alt=""
                    style={{ height: "fit-content" }}
                  />
                  <p>{chosen.address}</p>
                </div>
              </div>
              <div className="discountCode py-3 mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <p style={{ fontStyle: "italic" }}>Profile verified</p>
                  <Done />
                  {/* <p>TOTAL</p>
                <p>
                  <span>XX AED</span>
                </p> */}
                </div>
              </div>
              <div className="loginbtn mr-auto ml-auto" style={{ width: 200 }}>
                <Link onClick={HandleConfirm} to="/profile">
                  <p>Appointments</p>
                </Link>
              </div>
              <p>
                Your Appointment ID is #{appointdata?.appointment_id}. We have
                emailed your appointment confirmation.
              </p>
              {/* <div className="payment_type_format">{Payment()}</div> */}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  ) : (
    <LoadingCircle step="Booking your appointment.." />
  );
}
export default ConfirmApp;
