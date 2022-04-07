import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Blank from "../../images/doctorfull1.jpg";

export default function OurDoctors({ team_section }) {
  const { page } = useSelector((state) => state.homepage);
  const { lang } = useSelector((state) => state.lang);
  return team_section.team && team_section.team.length !== 0 ? (
    <div className="OurDoctors content-block1 content-block6">
      <div className="container">
        <h1
          data-aos="fade"
          data-aos-delay="0"
          data-aos-duration="1000"
          className="text-center mb-5"
        >
          {lang === "en"
            ? team_section.title
            : page.page_fields.ar_team_section?.title}
        </h1>
        <div className="row mt-3" style={{ justifyContent: "space-evenly" }}>
          {team_section.team &&
            team_section.team.length !== 0 &&
            team_section.team.map((doctor) => (
              <div
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="1000"
                key={doctor.value}
                className="col-sm-4 col-6 mb-4 doctorpromo"
              >
                <div className="dc-img">
                  <Link to={`/professionals/${doctor.slug}/${doctor.value}`}>
                    <img
                      src={
                        doctor.images && doctor.images.length !== 0
                          ? doctor.images[0].url
                          : Blank
                      }
                      alt=""
                    />
                  </Link>
                </div>
                <h1 className="mt-2 mt-sm-4 ">
                  {lang === "en" ? doctor.label : doctor.label_ar}
                </h1>
                <p className="mt-2 mt-sm-4 mb-2">
                  {lang === "en"
                    ? doctor.description_text1
                    : doctor.description_text1_ar}
                </p>
                <Link
                  className="mb-4"
                  to={`/professionals/${doctor.slug}/${doctor.value}`}
                >
                  {lang === "en" ? "Read more" : "اعرف المزيد"}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
