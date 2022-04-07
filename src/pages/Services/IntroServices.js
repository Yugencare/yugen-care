import React from "react";
import { useSelector } from "react-redux";
function IntroServices({ intro }) {
  const { page } = useSelector((state) => state.servicespage);
  var IMAGE = page.page_fields.intro?.image;
  return (
    <div className="intro-services" dir="ltr">
      <div className="gray_bg2">
        <div className="container h-100 position-relative">
          <div className="row h-100">
            <div className="col-xl-4 col-md-5 col-sm-6 h-100">
              <div className="content-block3 mb-5 mb-md-0">
                <h2
                  data-aos="fade-right"
                  data-aos-delay="0"
                  data-aos-duration="800"
                  data-aos-once={true}
                >
                  {intro.title}
                </h2>
                <p
                  data-aos="fade"
                  data-aos-delay="600"
                  data-aos-duration="800"
                  data-aos-once={true}
                >
                  {intro.text}
                </p>
              </div>
            </div>
            <div className=" col-xl-6 col-lg-7 col-md-6 col-sm-5 h-100 d-flex align-items-center">
              <div className="text-center row">
                <img
                  data-aos="fade-up"
                  data-aos-delay="400"
                  data-aos-duration="1000"
                  style={{ zIndex: 2 }}
                  className="img-fluid"
                  src={IMAGE && IMAGE.length !== 0 ? IMAGE[0]?.url : null}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroServices;
