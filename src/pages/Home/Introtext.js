import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Introtext({ intro }) {
  const { page } = useSelector((state) => state.homepage);
  const { lang } = useSelector((state) => state.lang);

  return (
    <div className="introText text-center content-block1 position-relative">
      {/* <img className="y-icon img-fluid" src={yicon} alt="" /> */}
      <div className="container">
        <div className="row justify-content-center">
          <div
            data-aos="fade"
            data-aos-delay="0"
            data-aos-duration="2000"
            className="col-xl-8 col-md-8 col-sm-10"
          >
            {lang === "en" ? (
              <>
                <h2>{intro?.title}</h2>
                <p>{intro?.text1}</p>
                <p>{intro?.text2}</p>
              </>
            ) : (
              <>
                <h2>{page.page_fields.ar_intro?.title}</h2>
                <p>{page.page_fields.ar_intro?.text1}</p>
                <p>{page.page_fields.ar_intro?.text2}</p>
              </>
            )}
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          {intro.introicons &&
            intro.introicons.length !== 0 &&
            intro.introicons.map(
              (icon, i) =>
                icon.images &&
                icon.images.length !== 0 && (
                  <div className="col-3 mb-4 mb-md-5">
                    <div
                      data-aos="fade-up"
                      data-aos-delay={`${(i * 100) % 400}`}
                      data-aos-duration="1000"
                      className="introInner"
                    >
                      {icon.url && icon.url.includes("/") ? (
                        <a href={icon.url}>
                          <figure>
                            <img src={icon.images[0].url} alt="" />
                          </figure>
                        </a>
                      ) : (
                        <figure>
                          <img src={icon.images[0].url} alt="" />
                        </figure>
                      )}

                      <span>
                        {lang === "en"
                          ? icon.title
                          : page.page_fields.ar_intro.introicons[i].title}
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}
export default Introtext;
