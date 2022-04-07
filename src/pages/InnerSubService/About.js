import { decode } from "html-entities";
import React from "react";

function About({ pagename }) {
  const isEmpty = Object.values(pagename).every((x) => x === null || x === "");
  return isEmpty ? null : (
    <div className="ServicesSlider content-block1 position-relative">
      {/* <div className="parrallax-container ">
        <div className="parallax"></div>
      </div> */}
      <div className="smile-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5">
              <h1>{pagename.about}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: `${decode(pagename.text1)}`,
                }}
              ></p>
            </div>
            <div className="col-lg-6 mb-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: `${decode(pagename.text2)}`,
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
