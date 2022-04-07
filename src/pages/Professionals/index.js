import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getProfessionalpage } from "../../app/professionalpage";
import Errorpage from "../../layout/Errorpage";
import PageHeader from "../../layout/PageHeader";
import PageHeaderSkeleton from "../../layout/PageHeaderSkeleton";
import Specialists from "../About/Specialists";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

function Professionals() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.professional);
  const { status } = useSelector((state) => state.professional);
  const mstatus = useSelector((state) => state.getmenu.status);
  const { lang } = useSelector((state) => state.lang);
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getProfessionalpage({ id: location.pathname.split("/")[1] }));
    }
  }, [dispatch]);

  var header = "";
  var internationally_renowned_specialist = {};
  var specialists = [];
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  if (status === "success") {
    console.log(page);
    header = page.page_fields.heading;
    internationally_renowned_specialist =
      lang === "en"
        ? page.page_fields.internationally_renowned_specialist
        : page.page_fields.ar_internationally_renowned_specialist;
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
  if (status === "success" && mstatus === "success") {
    document.body.style.overflowY = "scroll";
  } else {
    document.body.style.overflow = "hidden";
  }
  return (
    <div className="Professionals">
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
          {/* <PageHeaderSkeleton /> */}
          <PageHeader
            pagename={
              lang === "en" ? header.title : page.page_fields.ar_heading.title
            }
            header={header}
          />
          {/* <SubsServiceHeader header={header} /> */}
          <div className="position-relative">
            {/* <div className="parrallax-container">
              <div className="parallax y-right"></div>
            </div> */}
            <Specialists
              specialists={specialists}
              internationally_renowned_specialist={
                internationally_renowned_specialist
              }
              paragraph={
                lang === "en" ? header?.text : page.page_fields.ar_heading?.text
              }
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
          <PageHeaderSkeleton />
          <SpecialistsSkeleton />
        </>
      )}
    </div>
  );
}
export default Professionals;

function SpecialistsSkeleton() {
  return (
    <div className="Specialists content-block1 position-relative">
      {/* <div className="parrallax-container ">
        <div className="parallax y-right"></div>
      </div> */}
      <div className="container text-center">
        <h2>
          <Skeleton animation="wave" />
        </h2>
        <div className="row justify-content-center">
          <div className="col-6 col-sm-4  mt-5">
            <div className="specialist-img">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="300px"
              />
            </div>
            <p>
              <Skeleton animation="wave" />
            </p>
            <p style={{ marginTop: "-15px" }}>
              <Skeleton animation="wave" />
            </p>
          </div>
          <div className="col-6 col-sm-4  mt-5">
            <div className="specialist-img">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="300px"
              />
            </div>
            <p>
              <Skeleton animation="wave" />
            </p>
            <p style={{ marginTop: "-15px" }}>
              <Skeleton animation="wave" />
            </p>
          </div>
          <div className="col-6 col-sm-4  mt-5">
            <div className="specialist-img">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="300px"
              />
            </div>
            <p>
              <Skeleton animation="wave" />
            </p>
            <p style={{ marginTop: "-15px" }}>
              <Skeleton animation="wave" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
