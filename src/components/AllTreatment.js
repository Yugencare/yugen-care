import React from "react";
import { Link } from "react-router-dom";

function AllTreatment({ bookTreatment }) {
  return (
    bookTreatment.treatment_heading && (
      <div className="AllTreatment position-relative">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-4 mt-5">
              <h1
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="2000"
                data-aos-once={false}
              >
                {bookTreatment.treatment_heading}
              </h1>
              <p
                data-aos="fade"
                data-aos-delay="500"
                data-aos-duration="1500"
                data-aos-once={false}
                className="mt-4"
              >
                {bookTreatment.text1}
              </p>
              <p
                data-aos="fade"
                data-aos-delay="1000"
                data-aos-duration="1000"
                data-aos-once={false}
                className="mt-4"
              >
                {bookTreatment.text2}
              </p>
              <div className="btn7 mt-5">
                <Link to="#">book now</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="2000"
                data-aos-once={false}
                className="mt-4"
              >
                <img
                  className="img-fluid"
                  src={
                    bookTreatment.explore_image
                      ? bookTreatment.explore_image[0].url
                      : null
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default AllTreatment;
