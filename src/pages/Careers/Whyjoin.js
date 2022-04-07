import React from "react";

function WhyJoin({ intro }) {
  return (
    <div className="WhyJoin text-center content-block1 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="500"
              className="text-center"
            >
              <h2>{intro.why_join_us}</h2>

              <p>{intro.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhyJoin;
