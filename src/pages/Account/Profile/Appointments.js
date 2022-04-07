import { Divider, Fade } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAppointments } from "../../../app/Booking/appointments";
import LoadingCircle from "../../Booking/LoadingCircle";

export default function Appointments() {
  const { appointments } = useSelector((state) => state.appointments);
  const { status } = useSelector((state) => state.appointments);
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointments());
    console.log(appointments);
  }, [dispatch]);

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
  const formatDate = (date) => {
    try {
      var jsondate = new Date(date);
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
      const month_ar = [
        "يناير",
        "فبراير",
        "مارس",
        "إبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ][jsondate.getMonth()];
      //Geting Year
      const year = jsondate.getFullYear();
      //Getting time
      const time = formatAMPM(jsondate);
      var parsedDate = `${day} ${
        lang === "en" ? month : month_ar
      } ${year} at ${time}`;
      return parsedDate;
    } catch (e) {
      console.log(e);
    }
  };
  const isOngoing = (date) => {
    const today = new Date();
    const appDate = new Date(date);
    return appDate > today;
  };

  return status === "success" ? (
    <Fade in={true} timeout={700}>
      <div
        className={`Appointments content-block1 ${
          lang === "en" ? "" : "text-right"
        }`}
      >
        <h2>{lang === "en" ? "My Appointments" : "المواعيد الخاصة"} </h2>
        <Divider />
        <div className="appointments-container" id="style-3">
          {!appointments || appointments?.length === 0 ? (
            <>
              <div
                className="row m-0 my-5 finishedOrder justify-content-center align-items-center"
                style={{ flexDirection: "column" }}
              >
                <p>
                  {lang === "en"
                    ? "You have no appointments"
                    : "ليس لديك مواعيد"}{" "}
                </p>
                <Link to="/book">
                  {" "}
                  {lang === "en" ? "book now!" : "احجز الآن!"}
                </Link>
              </div>
              <Divider />
            </>
          ) : (
            appointments
              ?.slice(0)
              .reverse()
              .map((apps, idx) => (
                <div className="" key={apps.id}>
                  <div
                    className={
                      isOngoing(apps.appointment_time)
                        ? "row m-0 my-5"
                        : "row m-0 my-5 finishedOrder"
                    }
                  >
                    <div className="col-sm-6 col-md-4 col-5 pr-0">
                      <p>{apps.department_name}</p>
                    </div>
                    <div className="col-sm-6 col-md-4 col-7">
                      <p>{formatDate(apps.appointment_time)}</p>
                      <p>
                        <span>
                          {apps.duration} {lang === "en" ? "mins" : "الدقيقة"}
                        </span>
                      </p>
                      {/* {isOngoing(apps.appointment_time) ? (
                        <p style={{ marginTop: 15 }}>
                          <Link to="#">Reschedule</Link>
                        </p>
                      ) : null} */}
                    </div>
                    <div className="col-sm-12 col-md-4">
                      <p>{apps.doctor_name}</p>
                    </div>
                  </div>
                  <Divider />
                </div>
              ))
          )}
        </div>
      </div>
    </Fade>
  ) : (
    <LoadingCircle
      step={
        lang === "en"
          ? "Getting your appointments..."
          : "الحصول على مواعيدك ..."
      }
    />
  );
}
