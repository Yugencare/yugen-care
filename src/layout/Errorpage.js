import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Phone from "../images/phone.png";
import WhatsApp from "../images/whatsapp.png";

export default function Errorpage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Yugen Care | Page Not Found</title>
      </Helmet>
      <div className="ErrorPage text-center">
        <div className="container h-100 ">
          <div className="row h-100 flex-column align-items-center justify-content-center">
            <p>Error! Page not Found</p>
            <h1>404</h1>
            <Link to="/discover">
              <div className="btn3">
                <p>Home</p>
              </div>
            </Link>
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
