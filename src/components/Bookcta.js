import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { decode } from "html-entities";
import BookForm from "./BookForm";

function BookCTA({ bookingCTA, pathname }) {
  const { isLoggedIn } = useSelector((state) => state.loginUser);
  const { lang } = useSelector((state) => state.lang);

  const [open, setOpen] = useState(false);
  const [PositionIndex, setPositionIndex] = useState(0);
  const history = useHistory();
  const handleOpen = (idx) => {
    setPositionIndex(idx);
    setOpen(true);
  };
  useEffect(() => {
    if (pathname === "/appointment") {
      setTimeout(() => {
        setOpen(true);
      }, 3000);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (pathname === "/appointment") {
      history.push("/philosophy");
    }
  };
  const handlePostion = (idx) => {};

  return (
    <div className="BookCTA text-center content-block2 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7">
            <div
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="1000"
              className="text-center"
            >
              <h2>{bookingCTA && bookingCTA.heading}</h2>
              <p
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{
                  __html: `${decode(bookingCTA && bookingCTA.description)}`,
                }}
              ></p>
              {/* <Link to={isLoggedIn ? "/book" : "/login"} className="btn2">
                {lang === "en" ? "Book Now" : "احجز الآن"}
              </Link> */}

              <BookForm
                open={open}
                PositionIndex={PositionIndex}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookCTA;
