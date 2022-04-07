import { Checkbox } from "@material-ui/core";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import AOS from "aos";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeroBG from "../../images/hero3.jpg";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";
import BookForm from "../../components/BookForm";
function Hero({ heading }) {
  // const [resetAOS, setresetAOS] = useState([]);
  const page = useSelector((state) => state.homepage.promo);
  const { lang } = useSelector((state) => state.lang);
  const [Open, setOpen] = useState(false);

  const handleOpen = (idx) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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

  return (
    <>
      <div
        className="hero position-relative "
        style={{
          backgroundImage: `url(${HeroBG})`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
        }}
      >
        <div className="container-xl">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-6 col-sm-8 hero-content">
              <div className="hero_text hero_texttt content-block1">
                <h1
                  data-aos="fade-down"
                  data-aos-delay="0"
                  data-aos-duration="2000"
                  className={`mb-2 mb-md-3`}
                >
                  {heading?.title_normal} <span>{heading?.title_blue}</span>
                </h1>
                {heading?.bulletedlist.split(",")?.map((list, i) => (
                  <p
                    data-aos="fade"
                    data-aos-delay={`${200 + 150 * i}`}
                    data-aos-duration="1500"
                    className="mb-0"
                  >
                    <Checkbox
                      icon={<CircleUnchecked />}
                      checkedIcon={<CircleCheckedFilled />}
                      checked={true}
                      readOnly
                      disabled
                      style={
                        lang === "en" ? { paddingLeft: 0 } : { paddingRight: 0 }
                      }
                    />
                    {list.trim()}
                  </p>
                ))}
                <p
                  data-aos="fade"
                  data-aos-delay="500"
                  data-aos-duration="2000"
                  className="my-2 my-md-4"
                >
                  <button onClick={handleOpen} className="btn1">
                    {" "}
                    {lang === "en" ? "BOOK NOW" : "حجز موعد"}
                  </button>

                  <BookForm
                    open={Open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    Button={true}
                  />
                </p>
                <p
                  data-aos="fade"
                  data-aos-delay="500"
                  data-aos-duration="2000"
                  className="mb-0 pl-4 pl-xl-5"
                >
                  {heading?.offer_text}
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 hero-person">
              <Suspense>
                <img
                  data-aos="fade-up"
                  data-aos-delay="1200"
                  data-aos-duration="1300"
                  data-aos-once={true}
                  alt=""
                  src={
                    page.page_fields.heading?.hero &&
                    page.page_fields.heading.hero.length !== 0
                      ? page.page_fields.heading?.hero[0]?.url
                      : null
                  }
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
          <img className="mt-2 hero-imgMobile" src={Phone} alt="" />
        </a>
      </div>
    </>
  );
}
export default Hero;
