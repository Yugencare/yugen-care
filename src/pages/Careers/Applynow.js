import React from "react";

function ApplyNow({ applynow }) {
  return (
    applynow?.apply_now && (
      <div className="ApplyNow content-block2 position relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="1000"
                className="text-center"
              >
                <h2>{applynow.apply_now}</h2>

                <p>{applynow.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default ApplyNow;
