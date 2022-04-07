import React from "react";
import { Link } from "react-router-dom";
import SliderDoctor from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function SpecialistSlider(props) {
  const ProductSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="ProductSlider position-relative ">
      <div className="container-md">
        <SliderDoctor
          {...ProductSettings}
          className="row custom_round_dots"
          style={{ margin: 0 }}
        >
          {props.doctors.map((doctor, idx) => (
            <Link
              key={doctor.label + idx}
              to={`/professionals/${doctor.slug}/${doctor.value}`}
            >
              <div
                key={doctor.label + idx}
                className="spec-img"
                style={{ margin: "0 auto" }}
              >
                <img className="img-fluid" src={doctor.images[0]?.url} alt="" />
              </div>
              <p>{doctor.label}</p>
              <p style={{ marginTop: "-15px" }}>
                <small>{doctor.designation}</small>
              </p>
            </Link>
          ))}
        </SliderDoctor>
      </div>
    </div>
  );
}

export default SpecialistSlider;
