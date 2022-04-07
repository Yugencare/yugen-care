import AOS from "aos";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeroBG from "../../images/hero3.jpg";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

function Hero({ heading }) {
  // const [resetAOS, setresetAOS] = useState([]);

  useEffect(() => {
    // AOS TRIGGER FIX
    // var init = [];
    // var x = setInterval(function () {
    //   init.push(AOS.init());
    //   if (init.length >= 2) {
    //     clearInterval(x);
    //     // setresetAOS([]);
    //   }
    // }, 1000);
  }, []);
  const { lang } = useSelector((state) => state.lang);
  const { page } = useSelector((state) => state.homepage);
  return (
    <>
      <div
        className="hero position-relative"
        style={{
          backgroundImage: `url(${HeroBG})`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
        }}
      >
        <div className="container-fluid h-100">
          <div className="row align-items-center h-100">
            <div className="col-xl-6 col-md-6 col-sm-8 hero-content">
              <div className="hero_text">
                <h1
                  data-aos="fade-down"
                  data-aos-delay="0"
                  data-aos-duration="2000"
                >
                  {lang === "en" ? (
                    <>
                      {heading?.title1}
                      <span>{heading?.title2}</span>
                    </>
                  ) : (
                    <>
                      {page.page_fields.ar_heading?.title1}
                      <span>{page.page_fields.ar_heading?.title2}</span>
                    </>
                  )}
                </h1>
                <p
                  data-aos="fade-right"
                  data-aos-delay="500"
                  data-aos-duration="2000"
                  className="mb-0"
                >
                  <span className="byname">
                    <i>{heading?.author.split(" ")[0]} </i>
                    {heading?.author.substr(heading.author.indexOf(" ") + 1)}
                  </span>
                </p>
                <p
                  data-aos="fade"
                  data-aos-delay="500"
                  data-aos-duration="2000"
                  className="mb-0"
                >
                  <Link to="/7-pillars" className="btn1">
                    {lang === "en" ? "Learn More" : "اعرف المزيد"}
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 hero-person">
              <Suspense>
                <img
                  data-aos="fade-up"
                  data-aos-delay="600"
                  data-aos-duration="1300"
                  data-aos-once={true}
                  alt=""
                  src={heading?.hero ? heading?.hero[0]?.url : null}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="intro-icons">
        <a href="tel:+971 434 98000">
          <img className="mb-2 hero-img" src={WhatsApp} alt="" />
        </a>
        <a href="https://api.whatsapp.com/send?phone=+97143498000">
          <img className="mt-2 hero-img" src={Phone} alt="" />
        </a>
      </div>
    </>
  );
}
export default Hero;
