import React from "react";
import insta from "../../images/insta.jpg";
import Insta2 from "../../images/insta2.jpg";
import Insta3 from "../../images/insta3.jpg";
import Insta4 from "../../images/insta4.jpg";
import instagram from "../../svgs/linkedin.svg";

const items = [
  {
    id: "12315332",
    img: "https://media-exp1.licdn.com/dms/image/C4D22AQFpqTqTPFzy6g/feedshare-shrink_800/0/1644849370052?e=1649894400&v=beta&t=pQiiHh3y4oRP7mYW4Wyjs5O-prTY6AT6k9bhOwfRDcM",
  },
  {
    id: "12351232",
    img: "https://media-exp1.licdn.com/dms/image/C4D22AQHVv_uCVxHogA/feedshare-shrink_800/0/1644848669276?e=1649894400&v=beta&t=OY-ty_qVnraIIVkEVUgdMakAS8dDqoULXcbmDQbX7VE",
  },
  // {
  //   id: "12343123",
  //   img: Insta3,
  // },
  // {
  //   id: "12321512",
  //   img: Insta4,
  // },
];

function HomeInstagram({ instaPics }) {
  return (
    <div className="HomeInstagram text-center position-relative">
      <div
        data-aos="fade"
        data-aos-delay="0"
        data-aos-duration="2000"
        className="container"
      >
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="small-heading">
              <h2>
                <a href="https://ae.linkedin.com/company/yugencare">
                  <img src={instagram} alt="" /> Connect with us on LinkedIn
                </a>
              </h2>
            </div>
          </div>
        </div>
        <div className="linkedIn row justify-content-center">
          {items.map((instapic) => (
            <div
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="2000"
              key={instapic.id}
              className="col-3 col-sm-6 col-md-3 mb-4"
            >
              <a href="https://ae.linkedin.com/company/yugencare">
                <img src={instapic.img} alt="" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HomeInstagram;
