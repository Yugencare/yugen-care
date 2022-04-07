import { Skeleton } from "@material-ui/lab";
import AOS from "aos";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTeams } from "../../app/Teams/getteams";
import ND from "../../images/no-doctor.png";

function Specialists({
  specialists,
  internationally_renowned_specialist,
  paragraph,
}) {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teams);
  const { lang } = useSelector((state) => state.lang);
  const { status } = useSelector((state) => state.teams);

  useEffect(() => {
    // AOS TRIGGER FIX
    var init = [];
    var x = setInterval(function () {
      init.push(AOS.init());
      if (init.length >= 2) {
        clearInterval(x);
        // setresetAOS([]);
      }
    }, 1000);
    if (status !== "success") {
      dispatch(getTeams());
    }
    console.log(teams);
  }, [dispatch]);
  console.log(teams);
  return (
    <>
      {/* <div className="parrallax-container ">
        <div className="parallax y-right"></div>
      </div> */}
      <div className="container text-center" style={{ marginTop: 80 }}>
        <div className="WhyJoin text-center content-block1 position-relative m-0">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="500"
                className="text-center"
              >
                <h2>
                  {
                    internationally_renowned_specialist.internationally_renowned_specialist
                  }
                </h2>
                <p>{paragraph}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Specialists content-block1 position-relative">
          <div className="row justify-content-center">
            {teams &&
              teams.length !== 0 &&
              teams?.map((doctor, idx) => (
                <div
                  data-aos="fade"
                  data-aos-delay={(idx * 150) % 450}
                  data-aos-duration="1000"
                  data-aos-once={false}
                  key={doctor.label + idx}
                  className="col-6 col-sm-4  mt-5"
                >
                  <Link
                    key={doctor.label + idx}
                    to={`/professionals/${doctor.slug}/${doctor.id}`}
                  >
                    <div className="specialist-img">
                      <img
                        src={
                          doctor.images && doctor.images.length !== 0
                            ? doctor.images[0]?.url
                            : ND
                        }
                        alt=""
                      />
                    </div>
                    {lang === "en" ? (
                      <>
                        <p>
                          {doctor.title?.trim() + " "}
                          {doctor.firstname} {doctor.lastname}
                        </p>
                        <p style={{ lineHeight: 1 }}>
                          <small>{doctor.designation}</small>
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          {doctor.title_ar} {doctor.firstname_ar}
                          {doctor.lastname_ar}
                        </p>
                        <p style={{ lineHeight: 1 }}>
                          <small>{doctor.designation_ar}</small>
                        </p>
                      </>
                    )}
                  </Link>
                </div>
              ))}
            {teams.length === 0 &&
              [1, 2, 3].map((doctor, idx) => (
                <div className="col-6 col-sm-4  mt-5">
                  <div className="specialist-img">
                    <Skeleton variant="rect" width="100%" height="200px" />
                  </div>
                  <p>
                    <Skeleton />
                  </p>
                  <p>
                    <Skeleton />
                  </p>
                </div>
              ))}
          </div>
          {/* <div className="doctorsOnMobile">
          <SpecialistSlider doctors={specialists} />
        </div> */}
        </div>
      </div>
    </>
  );
}
export default Specialists;
