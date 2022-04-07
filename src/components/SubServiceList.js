import React from "react";
import { Link } from "react-router-dom";
import GrayImg from "../images/GrayIMG.jpg";
function SubServiceList({ servicelist }) {
  return (
    <div className="SubServiceList text-center content-block1 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          {servicelist.map((service, idx) => (
            <div
              data-aos="fade"
              data-aos-delay={(idx * 150) % 600}
              data-aos-duration="1000"
              className="col-xl-3 col-md-6 p-1"
              key={service.label + idx}
            >
              <Link to={`/treatment/${service.slug}`} key={service.label + idx}>
                <div className="overflow-hidden">
                  <div
                    className="treatment-images"
                    style={
                      service.images
                        ? {
                            background: `url(${
                              service.images ? service.images[0]?.url : null
                            }`,
                          }
                        : null
                    }
                  >
                    <img className="img-fluid" alt="" src={`${GrayImg}`} />
                  </div>
                </div>
                <p>{service.label}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SubServiceList;
