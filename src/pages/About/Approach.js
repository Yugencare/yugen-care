import React from "react";
function Approach({ outro_aboutus }) {
  return (
    outro_aboutus.title &&
    outro_aboutus.paragraph && (
      <div className="intro-services">
        <div className="gray_bg2">
          <div className="container h-100 position-relative">
            <div className="row h-100">
              <div className="col-xl-4 col-md-5 col-sm-6 h-100">
                <div className="content-block3 mb-5 mb-md-0">
                  <h2
                    data-aos="fade-right"
                    data-aos-delay="0"
                    data-aos-duration="2000"
                    data-aos-once={true}
                  >
                    {outro_aboutus.title}
                  </h2>
                  <p
                    data-aos="fade"
                    data-aos-delay="500"
                    data-aos-duration="1500"
                    data-aos-once={true}
                  >
                    {outro_aboutus.paragraph}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-7 col-md-6 col-sm-5 h-100 d-flex align-items-center">
                <div className="text-center row">
                  <img
                    data-aos="fade"
                    data-aos-delay="0"
                    data-aos-duration="2000"
                    data-aos-once={false}
                    style={{ zIndex: 2 }}
                    className="img-fluid"
                    src={
                      outro_aboutus.image ? outro_aboutus.image[0].url : null
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Approach;
