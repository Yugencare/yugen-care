import { decode } from "html-entities";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { OfflineMenuIndex } from "../../app/Account/menu";

function BookCTA({ bookingCTA }) {
  const { isLoggedIn } = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.lang);
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
                  __html: `${decode(bookingCTA?.description)}`,
                }}
              ></p>
              <Link
                to={isLoggedIn ? "/book" : "/login"}
                onClick={() => dispatch(OfflineMenuIndex(2))}
                className="btn2"
              >
                {lang === "en" ? "Sign Up" : "سجل"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookCTA;
