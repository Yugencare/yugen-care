import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import GradientBar from "../pages/Home/GradientBar";
import pageBG from "../images/pageheaderBG.jpg";
import { useSelector } from "react-redux";

function PageHeader(props) {
  const { header } = props;
  console.log(header);
  const location = useLocation();
  const { lang } = useSelector((state) => state.lang);

  return (
    <>
      <div
        className="PageHeader text-center"
        style={
          props.pagename === "View Cart"
            ? { background: "#f5f5f5" }
            : {
                background: `url(${
                  header?.background ? header?.background[0]?.url : null
                })`,
              }
        }
      >
        <div className="whiteBG h-100">
          <div className="container h-100">
            <div
              className="row h-100 align-items-center"
              style={{ paddingTop: 100 }}
            >
              <div className="col-xl-12">
                <h1 data-aos="fade" data-aos-delay="0" data-aos-duration="600">
                  {props.pagename}
                </h1>
                <ul className="list-inline mb-0 breadcrumbs">
                  <li className="list-inline-item">
                    <Link to="/discover">
                      {lang === "en" ? "Home" : "الصفحة الرئيسية"}
                    </Link>
                  </li>
                  <i> / </i>
                  {props.pagename === "Product Catergory Name" ? (
                    <li className="list-inline-item">
                      <span>Category</span>
                    </li>
                  ) : props.pagename === "Checkout" ? (
                    <li className="list-inline-item">
                      <span> {lang === "en" ? "Checkout" : "الدفع"}</span>
                    </li>
                  ) : (
                    <li className="list-inline-item">
                      <span>{props.pagename} </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GradientBar h={5} />
    </>
  );
}

export default PageHeader;
