import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import TY from "../../images/Thankyou.png";
export default function Thankyou() {
  const { lang } = useSelector((state) => state.lang);
  return (
    <div className="Thankyou content-block2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thank You</title>
        <meta
          name="description"
          content="Thank you for booking an appointment using Yugen Care website. You will receive an email message shortly."
        />
      </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-7 text-center">
            <h2>{lang === "en" ? "Thank You" : "شكرا لك!"}</h2>
            <p>
              {lang === "en"
                ? "Thank you for booking an appointment using Yugen Care website. You will receive an email message shortly."
                : "شكرا لحجز موعد . سوف تتلقى ملفرسالة بريد إلكتروني بعد قليل."}
            </p>
            <p>
              <strong>
                {lang === "en"
                  ? "One of our representatives will contact you soon!"
                  : "سيتصل بك أحد موظفينا قريبًا!"}
              </strong>
            </p>
            <img src={TY} alt="thank-you" />
            <h1>
              {lang === "en" ? "Check your Email" : "تحقق من بريدك الالكتروني"}
            </h1>
            <p>
              <span>
                {lang === "en"
                  ? "If you didn’t receive any mail contact"
                  : "إذا لم تتلق أي بريد ، أرسل رسالة إلى"}{" "}
                <a href="mailto:info@yugencare.com?subject = Booking Feedback = Message">
                  info@yugencare.com
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
