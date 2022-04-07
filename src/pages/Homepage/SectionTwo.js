import { decode } from "html-entities";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Blank from "../../images/doctorfull1.jpg";

export default function SectionTwo({ section_two }) {
  const page = useSelector((state) => state.homepage.promo);
  const [Ht, setHt] = useState("auto");
  const ref = useRef();
  const handleImageLoad = (event) => {
    // Do whatever you want here
    const imageWidth = event.target.clientWidth;

    setHt(imageWidth);
  };
  return (
    <div className="SectionOne content-block6 content-block6">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-6">
            <div className="d-flex align-items-center h-100">
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="1000"
              >
                {section_two.section_content &&
                  section_two.section_content.length !== 0 &&
                  section_two.section_content.map((content) => (
                    <>
                      <h1 className="mb-2 mb-md-5">{content.heading_text}</h1>
                      <p
                        style={{ whiteSpace: "pre-wrap" }}
                        dangerouslySetInnerHTML={{
                          __html: `${decode(content.description_text)}`,
                        }}
                      ></p>
                    </>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <img
              data-aos="fade-left"
              data-aos-delay="0"
              className="mt-5 mt-md-0"
              data-aos-duration="1000"
              ref={ref}
              onLoad={handleImageLoad}
              src={
                page.page_fields.section_two.image &&
                page.page_fields.section_two.image.length !== 0
                  ? page.page_fields.section_two.image[0].url
                  : Blank
              }
              height={Ht}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
