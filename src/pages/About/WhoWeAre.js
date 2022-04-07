import React from "react";
import { useSelector } from "react-redux";

function WhoWeAre({ intro }) {
  const { page } = useSelector((state) => state.aboutpage);
  var IMAGE = page.page_fields.intro.intro_image;

  return (
    <div className="WhoWeAre content-block1 position-relative pt-5">
      <div className="container">
        <div className="row">
          <div
            data-aos="fade"
            data-aos-duration="1000"
            className="col-xl-6 align-self-center"
          >
            <h2>{intro.who_we_are}</h2>
            <p>{intro.paragraph1}</p>
            <p>{intro.paragraph2}</p>
            <p>{intro.paragraph3}</p>
          </div>
          <div
            className="col-xl-6"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="1500"
          >
            <img
              className="img-fluid"
              src={IMAGE && IMAGE.length !== 0 && IMAGE[0]?.url}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhoWeAre;
