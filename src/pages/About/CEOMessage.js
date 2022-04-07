import AOS from "aos";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function CEOMessage({ ceoquote }) {
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
  }, []);
  const { page } = useSelector((state) => state.aboutpage);
  var CEOIMAGE = page.page_fields.ceoquote.ceo_img;
  var SIG = page.page_fields.ceoquote.signature_image;
  return (
    <div className="CEOMessage content-block1 position-relative" dir="ltr">
      <div className="container-fluid">
        <div className="ceoBG" />
        <div className="row align-items-center">
          <div className="doctorsOnDesktop col-md-6 positive-relative text-right">
            <img
              data-aos="fade-up"
              data-aos-duration="1500"
              className="img-fluid"
              alt=""
              src={CEOIMAGE && CEOIMAGE.length !== 0 ? CEOIMAGE[0].url : null}
            />
          </div>

          <div className="ceoTranslate col-md-6">
            <div className="col-xl-8 ceoText hero_text">
              <h1>{ceoquote.title}</h1>
              <p className="mb-4">{ceoquote.quote}</p>
              <img
                className="img-fluid mb-4"
                alt=""
                src={SIG && SIG.length !== 0 ? SIG[0].url : null}
              />
              <p>{ceoquote.sign}</p>
            </div>
            <div className="doctorsOnMobile col-md-6 positive-relative text-center">
              <img
                data-aos="fade-up"
                data-aos-delay="0"
                data-aos-duration="1500"
                className="img-fluid"
                alt=""
                src={ceoquote.ceo_img ? ceoquote.ceo_img[0].url : null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CEOMessage;
