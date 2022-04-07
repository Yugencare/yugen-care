import React from "react";
import { decode } from "html-entities";

function About({ about }) {
  return (
    <div className="AboutWellbeing text-center content-block1 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-md-8 col-sm-10">
            <h2
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="2000"
              data-aos-once={false}
            >
              {about.hdr1}
            </h2>
          </div>
        </div>
        <div className="row justify-content-center " id="go-to-treatment">
          <div className="col-xl-8 col-md-8 col-sm-10 mb-4 mb-md-0">
            <p
              data-aos="fade"
              data-aos-delay="500"
              data-aos-duration="1500"
              data-aos-once={false}
              dangerouslySetInnerHTML={{
                __html: `${decode(about.subh1)}`,
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
