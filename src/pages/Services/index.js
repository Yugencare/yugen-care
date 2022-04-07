import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getServicesPage } from "../../app/servicespage";
import LoadingOverlay from "../../components/LoadingOverlay";
import Errorpage from "../../layout/Errorpage";
import PageHeader from "../../layout/PageHeader";
import ServicesList from "./Homeservices";
import ServicesListMobile from "./HomeservicesMobile";
import IntroServices from "./IntroServices";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

function Services() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.servicespage);
  const { status } = useSelector((state) => state.servicespage);
  const mstatus = useSelector((state) => state.getmenu.status);
  const { lang } = useSelector((state) => state.lang);
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    ////Passing page ID reference
    console.log(location.pathname.split("/")[1]);
    if (status !== "success") {
      dispatch(getServicesPage({ id: location.pathname.split("/")[1] }));
    }
  }, [dispatch]);

  var header = "";
  var intro = {};
  var services = [];
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  var headline;
  if (status === "success") {
    console.log(page);
    header = page.page_fields.header;
    intro = lang === "en" ? page.page_fields.intro : page.page_fields.ar_intro;
    services = page.page_fields.services?.services;
    headline =
      lang === "en"
        ? page.page_fields.services?.headline
        : page.page_fields.ar_services?.headline;

    //HELMET
    helmet_meta = page.meta;
    console.log(helmet_meta);
    properties = page.properties;
    try {
      schemaJSON = page.schema?.map((object) => {
        return JSON.stringify(object);
      });
    } catch (e) {
      console.log("Could Not Parse JSON");
    }
  }

  return (
    <div className="Services">
      {status === "success" && mstatus === "success" ? (
        <>
          {/* {window.scrollTo(0, 0)}*/}
          <Helmet>
            <meta charSet="utf-8" />
            <title>{helmet_meta?.title}</title>
            <meta name="description" content={helmet_meta?.description} />
            {properties?.length !== 0 && properties !== null
              ? properties.map((prpty, idx) => (
                  <meta
                    key={prpty.property}
                    property={prpty.property}
                    content={prpty.content}
                  />
                ))
              : null}
            {schemaJSON &&
              schemaJSON.length !== 0 &&
              schemaJSON.map((s) => (
                <script type="application/ld+json">{s}</script>
              ))}
          </Helmet>
          <PageHeader
            pagename={
              lang === "en"
                ? header.heading
                : page.page_fields.ar_header.heading
            }
            header={header}
          />
          <div className="position-relative">
            {/* <div className="parrallax-container ">
              <div className="parallax y-right"></div>
            </div> */}
            <IntroServices intro={intro} />
            <ServicesList services={services} lang={lang} headline={headline} />
            <ServicesListMobile
              services={services}
              lang={lang}
              headline={headline}
            />
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
      ) : status === "failed" ? (
        <Errorpage />
      ) : (
        <>
          <LoadingOverlay />
        </>
      )}
    </div>
  );
}
export default Services;
