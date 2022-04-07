import React from "react";
import { Link } from "react-router-dom";

function BookCTA({ name }) {
  return (
    <div className="BookCTA text-center content-block2 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7">
            <div
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="500"
              className="text-center"
            >
              <h2>Book an appointment</h2>

              <p>
                Should you have any questions prior to your appointment date,
                please feel free to contact our office at +971 434 98000. We
                look forward to seeing you here!
              </p>
              <Link to="/book" className="btn2">
                Book now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookCTA;
