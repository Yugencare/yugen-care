import { Divider } from "@material-ui/core";
import { LinkedIn, Twitter, YouTube } from "@material-ui/icons";
import Facebook from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import { decode } from "html-entities";
import React from "react";
import { useSelector } from "react-redux";
import ND from "../../images/no-doctor.png";
import Snapchat from "../../svgs/snapchat1.svg";

function DoctorDetails(props) {
  const { doctor } = props;
  const processSocials = (link) => {
    if (link?.includes("https")) {
      return link;
    } else {
      return "https://" + link;
    }
  };
  const { lang } = useSelector((state) => state.lang);
  return (
    <div className="DoctorDetails content-block1">
      <div className="container">
        <div className="row">
          <div
            data-aos="fade"
            data-aos-delay="0"
            data-aos-duration="700"
            data-aos-once={true}
            className="col-md-6 order-2 order-md-1"
          >
            <div class="reveal-holder imgMagnify" data-aos="reveal-item">
              <div
                class="reveal-block gradient right"
                data-aos="reveal-right"
              ></div>
              <img
                src={
                  doctor.images && doctor.images.length !== 0
                    ? doctor.images[0].url
                    : ND
                }
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-md-5 col-sm-12  addp d-block d-md-none order-2">
            <div
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="700"
              data-aos-once={true}
              className="detail-section"
            >
              <p>
                {lang === "en" ? (
                  <span>
                    {doctor.certification !== "" && doctor.certification}
                  </span>
                ) : (
                  <span>
                    {doctor.certification_ar !== "" && doctor.certification_ar}
                  </span>
                )}
              </p>

              <p
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{
                  __html: `${decode(
                    lang === "en"
                      ? doctor.certification_text
                      : doctor.certification_text_ar
                  )}`,
                }}
              ></p>
            </div>
            <div
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="700"
              data-aos-once={true}
              className="detail-section"
            >
              <p>
                {lang === "en" ? (
                  <span>
                    {doctor.description_title !== "" &&
                      doctor.description_title}
                  </span>
                ) : (
                  <span>
                    {doctor.description_title_ar !== "" &&
                      doctor.description_title_ar}
                  </span>
                )}
              </p>
              <p
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{
                  __html: `${decode(
                    lang === "en"
                      ? doctor.description_text1
                      : doctor.description_text1_ar
                  )}`,
                }}
              ></p>
            </div>
            {lang === "en"
              ? doctor.awardlist !== "" && (
                  <div
                    data-aos="fade"
                    data-aos-delay="0"
                    data-aos-duration="700"
                    data-aos-once={true}
                    className="detail-section"
                  >
                    <p>
                      <span> Awards</span>
                    </p>
                    <ol>
                      {doctor.awardlist?.split(",").map((list) => (
                        <li>{list.trim()}</li>
                      ))}
                    </ol>
                  </div>
                )
              : doctor.awardlist_ar !== "" && (
                  <div
                    data-aos="fade"
                    data-aos-delay="0"
                    data-aos-duration="700"
                    data-aos-once={true}
                    className="detail-section"
                  >
                    <p>
                      <span> الجوائز</span>
                    </p>
                    <ol>
                      {doctor.awardlist_ar?.split(",").map((list) => (
                        <li>{list.trim()}</li>
                      ))}
                    </ol>
                  </div>
                )}
            {lang === "en" ? (
              doctor.languages !== "" && (
                <div
                  data-aos="fade"
                  data-aos-delay="0"
                  data-aos-duration="700"
                  className="detail-section"
                >
                  <p>
                    <span>Languages</span>
                  </p>
                  <p>{doctor.languages}</p>
                </div>
              )
            ) : (
              <div
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="700"
                className="detail-section"
              >
                <p>
                  <span>اللغات</span>
                </p>
                <p>{doctor.languages_ar}</p>
              </div>
            )}
          </div>
          <div className="col-md-5 col-sm-12  addp order-1 order-md-2">
            <div
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="700"
              data-aos-once={true}
              className="detail-section"
            >
              {lang === "en" ? (
                <h2>
                  {doctor.title} {doctor.firstname} {doctor.lastname}
                </h2>
              ) : (
                <h2>
                  {doctor.title_ar} {doctor.firstname_ar} {doctor.lastname_ar}
                </h2>
              )}
              <p className="mb-0 mb-md-3">
                {lang === "en" ? (
                  <small>{doctor.designation}</small>
                ) : (
                  <small>{doctor.designation_ar}</small>
                )}
              </p>
              <div className="d-flex mb-4 mt-2">
                {doctor.social && doctor.social.facebook && (
                  <a
                    href={processSocials(doctor.social.facebook)}
                    className={lang === "en" ? "mr-3" : "ml-3"}
                  >
                    <Facebook />
                  </a>
                )}
                {doctor.social && doctor.social.instagram && (
                  <a
                    href={processSocials(doctor.social.instagram)}
                    className={lang === "en" ? "mr-3" : "ml-3"}
                  >
                    <Instagram />
                  </a>
                )}
                {doctor.social && doctor.social.twitter && (
                  <a
                    href={processSocials(doctor.social.twitter)}
                    className={lang === "en" ? "mr-3" : "ml-3"}
                  >
                    <Twitter />
                  </a>
                )}
                {doctor.social && doctor.social.lnkedin && (
                  <a
                    href={processSocials(doctor.social.lnkedin)}
                    className={lang === "en" ? "mr-3" : "ml-3"}
                  >
                    <LinkedIn />
                  </a>
                )}
                {doctor.social && doctor.social.youtube && (
                  <a
                    href={processSocials(doctor.social.youtube)}
                    className={lang === "en" ? "mr-3" : "ml-3"}
                  >
                    <YouTube />
                  </a>
                )}
                {doctor.social && doctor.social.snapchat && (
                  <a
                    href={processSocials(doctor.social.snapchat)}
                    className={lang === "en" ? "mr-3" : "ml-3"}
                  >
                    <img
                      classname="snapchat"
                      src={Snapchat}
                      alt={doctor.social.snapchat}
                    />
                  </a>
                )}
              </div>
              <Divider />
            </div>

            {/* d-none  d-md-block */}
            <div className="d-none d-md-block">
              <div
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="700"
                data-aos-once={true}
                className="detail-section"
              >
                <p>
                  {lang === "en" ? (
                    <span>
                      {doctor.certification !== "" && doctor.certification}
                    </span>
                  ) : (
                    <span>
                      {doctor.certification_ar !== "" &&
                        doctor.certification_ar}
                    </span>
                  )}
                </p>

                <p
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: `${decode(
                      lang === "en"
                        ? doctor.certification_text
                        : doctor.certification_text_ar
                    )}`,
                  }}
                ></p>
              </div>
              <div
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="700"
                data-aos-once={true}
                className="detail-section"
              >
                <p>
                  {lang === "en" ? (
                    <span>
                      {doctor.description_title !== "" &&
                        doctor.description_title}
                    </span>
                  ) : (
                    <span>
                      {doctor.description_title_ar !== "" &&
                        doctor.description_title_ar}
                    </span>
                  )}
                </p>
                <p
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: `${decode(
                      lang === "en"
                        ? doctor.description_text1
                        : doctor.description_text1_ar
                    )}`,
                  }}
                ></p>
              </div>
              {lang === "en"
                ? doctor.awardlist !== "" && (
                    <div
                      data-aos="fade"
                      data-aos-delay="0"
                      data-aos-duration="700"
                      data-aos-once={true}
                      className="detail-section"
                    >
                      <p>
                        <span> Awards</span>
                      </p>
                      <ol>
                        {doctor.awardlist?.split(",").map((list) => (
                          <li>{list.trim()}</li>
                        ))}
                      </ol>
                    </div>
                  )
                : doctor.awardlist_ar !== "" && (
                    <div
                      data-aos="fade"
                      data-aos-delay="0"
                      data-aos-duration="700"
                      data-aos-once={true}
                      className="detail-section"
                    >
                      <p>
                        <span> الجوائز</span>
                      </p>
                      <ol>
                        {doctor.awardlist_ar?.split(",").map((list) => (
                          <li>{list.trim()}</li>
                        ))}
                      </ol>
                    </div>
                  )}

              {lang === "en" ? (
                doctor.languages !== "" && (
                  <div
                    data-aos="fade"
                    data-aos-delay="0"
                    data-aos-duration="700"
                    className="detail-section"
                  >
                    <p>
                      <span>Languages</span>
                    </p>
                    <p>{doctor.languages}</p>
                  </div>
                )
              ) : (
                <div
                  data-aos="fade"
                  data-aos-delay="0"
                  data-aos-duration="700"
                  className="detail-section"
                >
                  <p>
                    <span>اللغات</span>
                  </p>
                  <p>{doctor.languages_ar}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DoctorDetails;
