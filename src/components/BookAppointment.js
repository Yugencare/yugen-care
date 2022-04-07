import React, { useState } from "react";
import HeroBG from "../images/bookappointmentBG.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BookForm from "../components/BookForm";
function BookAppointment({ bookyourappointment }) {
  const { lang } = useSelector((state) => state.lang);
  const [Open, setOpen] = useState(false);
  if (!bookyourappointment.book_your_appointment) {
    return <p></p>;
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    bookyourappointment &&
    bookyourappointment.book_your_appointment && (
      <div
        className="BookAppointment content-block1 position-relative"
        style={{
          backgroundImage: `url(${HeroBG})`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
        }}
      >
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-xl-7 ">
              <h1
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="2000"
                data-aos-once={false}
              >
                {bookyourappointment.book_your_appointment}
              </h1>
            </div>
            <div className="col-xl-5 col-md-12 ">
              <p
                data-aos="fade"
                data-aos-delay="500"
                data-aos-duration="1500"
                data-aos-once={false}
                className={`mb-0 ${lang === "en" ? "ml-4" : "mr-4 text-right"}`}
              >
                <Link onClick={handleOpen} className="btn1">
                  {lang === "en" ? "Book Now" : "احجز الآن"}
                </Link>
                <BookForm
                  open={Open}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  Button={true}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default BookAppointment;
