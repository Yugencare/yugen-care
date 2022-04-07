import React from "react";

export default function MembershipIntro({ membership_intro, grey_box }) {
  return (
    <div className="MembershipIntro content-block1 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div
            data-aos="fade"
            data-aos-delay="0"
            data-aos-duration="700"
            className="col-md-7 col-xl-8 text-center"
          >
            <h2 className="mb-3 mb-md-5">{membership_intro?.title}</h2>
            <p>{membership_intro?.text}</p>
          </div>
        </div>
        <div
          data-aos="fade"
          data-aos-delay="0"
          data-aos-duration="700"
          className="row justify-content-center px-3"
        >
          <div className="col-md-7 col-xl-8 text-center grey_membership_box">
            <h2 className="mb-2">{grey_box?.title}</h2>
            <h2>
              <strong>{grey_box?.bold_text}</strong>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
