import React from "react";

export default function WaysToEarn({ steps }) {
  return (
    <div className="SignUpAndStart content-block1 position-relative">
      <div className="container text-center">
        <h2
          style={{
            textTransform: "capitalize",
            fontWeight: 500,
            marginBottom: "2rem",
          }}
        >
          {steps?.title}
        </h2>
        <div className="row justify-content-center text-center">
          {steps?.ways_to_earn?.map((step, idx) => (
            <div
              data-aos="fade"
              data-aos-delay={`${100 * idx}`}
              data-aos-duration="700"
              key={step.id}
              className="col-10 col-md-3 text-center"
            >
              <img src={step.images ? step.images[0]?.url : null} alt="" />
              <h2 className="mb-3">{step?.title}</h2>
              <p>{step?.class}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
