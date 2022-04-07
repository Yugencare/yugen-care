import React from "react";

export default function HowItWorks({ experience }) {
  return (
    <div className="HowItWorks position-relative">
      <div className="container-xl">
        <div className="row mb-4">
          <div className="col-12 text-center mb-4">
            <h2 data-aos="fade" data-aos-delay="0" data-aos-duration="1000">
              {experience.how_it_works}
            </h2>
          </div>
        </div>
        <div className="row mt-4 justify-content-center">
          {experience?.process_list.slice(0, 4).map(
            (list, index) =>
              list.heading_text !== null && (
                <div
                  data-aos="fade"
                  data-aos-delay={`${index * 100}`}
                  data-aos-duration="1000"
                  className="col-6 col-md-3 text-center d-flex flex-column align-items-center mb-5"
                >
                  <div className={`numberLine numlinefix${index + 1}`} />
                  <div className="numberCircle mb-4">{index + 1}</div>
                  <h3>{list.heading_text}</h3>
                  <p>{list.description_text}</p>
                </div>
              )
          )}
        </div>
        <div className="row mt-4 justify-content-center">
          {experience?.process_list.slice(4, 8).map(
            (list, index) =>
              list.heading_text !== null && (
                <div
                  data-aos="fade"
                  data-aos-delay={`${index * 100}`}
                  data-aos-duration="1000"
                  className="col-6 col-md-3 text-center d-flex flex-column align-items-center mb-5"
                >
                  <div
                    className={`numberLine numlinefix${index + 1} ${
                      index + 5 === experience?.process_list.length - 1
                        ? "numlinefixend"
                        : ""
                    }`}
                  />
                  <div className="numberCircle mb-4">{index + 1 + 4}</div>
                  <h3>{list.heading_text}</h3>
                  <p>{list.description_text}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
