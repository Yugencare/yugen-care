import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getContactpage } from "../../app/contactus";
import LoadingOverlay from "../../components/LoadingOverlay";
import GradientBar from "../Home/GradientBar";
import ContactHeading from "./ContactHeading";
import LocationMap from "./LocationMap";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

function ContactUs() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.contact);
  const { status } = useSelector((state) => state.contact);
  const { lang } = useSelector((state) => state.lang);
  const mstatus = useSelector((state) => state.getmenu.status);
  const params = useParams();

  const location = useLocation();
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      console.log(params.slug);
      dispatch(getContactpage({ id: location.pathname.split("/")[1] }));
    }
  }, [dispatch]);

  var contactdetails = {};
  var address = {};

  if (status === "success") {
    console.log(page);
    contactdetails =
      lang === "en"
        ? page.page_fields.contactdetails
        : page.page_fields.ar_contactdetails;
    // address = page.page_fields.address;

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
    <div className="ContactUs">
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
          <ContactHeading contactdetails={contactdetails} />
          <GradientBar h={5} />
          <LocationMap />
          <div className="intro-icons">
            <a href="tel:+971 434 98000">
              <img className="mb-2 hero-img" src={WhatsApp} alt="" />
            </a>
            <a href="https://api.whatsapp.com/send?phone=+97143498000">
              <img className="mt-2 hero-img" src={Phone} alt="" />
            </a>
          </div>
        </>
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}

export default ContactUs;
