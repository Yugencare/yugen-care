import React from "react";

export default function Journeyheading({ heading }) {
  return (
    <div className="Journeyheading position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-xl-8 text-center">
            <h2 data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
              {heading}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
