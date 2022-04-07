import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Steps({ section_three }) {
  const { lang } = useSelector((state) => state.lang);
  const { page } = useSelector((state) => state.homepage);
  return (
    <div className="HowItWorks position-relative SectionThree">
      <div className="container-xl">
        <div className="row mb-4">
          <div className="col-12 text-center mb-4">
            <h2
              className="mb-5"
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="1000"
            >
              {lang === "en"
                ? section_three.title
                : page.page_fields.ar_section_three.title}
            </h2>
          </div>
        </div>
        <div className="row mt-4">
          {section_three.tiles &&
            section_three.tiles.length !== 0 &&
            section_three.tiles.map((list, index) => (
              <div
                data-aos="fade"
                data-aos-delay={`${index * 100}`}
                data-aos-duration="1000"
                className="col-6 col-md-3 text-center d-flex flex-column align-items-center mb-5"
              >
                <div className={`numberLine numlinefix${index + 1}`} />
                <div className="numberCircle mb-4">
                  {list.url && list.url !== "" && list.url.length !== 0 ? (
                    <a href={list.url}>
                      <img
                        src={
                          list.images &&
                          list.images.length !== 0 &&
                          list.images[0].url
                        }
                      />
                    </a>
                  ) : (
                    <img
                      src={
                        list.images &&
                        list.images.length !== 0 &&
                        list.images[0].url
                      }
                    />
                  )}
                </div>
                <h3 className="mt-3">
                  {lang === "en"
                    ? list.title
                    : page.page_fields.ar_section_three.tiles[index].title}
                </h3>
                <p>
                  {lang === "en"
                    ? list.class
                    : page.page_fields.ar_section_three.tiles[index].class}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
