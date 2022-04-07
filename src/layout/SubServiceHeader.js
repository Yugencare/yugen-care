import React from "react";
import GradientBar from "../pages/Home/GradientBar";
function SubsServiceHeader({ header }) {
  console.log(header);
  return (
    <>
      <div
        className="PageHeader text-center"
        style={{
          background: `url(${
            header.background ? header.background[0]?.url : null
          })`,
        }}
      >
        <div className="whiteBG h-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-12" style={{ marginTop: "155px" }}>
                <h1 data-aos="fade" data-aos-delay="0" data-aos-duration="600">
                  {header?.title}
                </h1>
                <p
                  data-aos="fade"
                  data-aos-delay="600"
                  data-aos-duration="800"
                  className="mb-4 titleSubservice"
                >
                  {header?.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GradientBar h={5} />
    </>
  );
}

export default SubsServiceHeader;
