import { Skeleton } from "@material-ui/lab";
import { decode } from "html-entities";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getAboutpage } from "../../app/aboutpage";
import PageHeader from "../../layout/PageHeader";
import PageHeaderSkeleton from "../../layout/PageHeaderSkeleton";
import AboutGallery from "./AboutGallery";
import Approach from "./Approach";
import CEOMessage from "./CEOMessage";
import WhoWeAre from "./WhoWeAre";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

function About() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.aboutpage);
  const { status } = useSelector((state) => state.aboutpage);
  const mstatus = useSelector((state) => state.getmenu.status);
  const { lang } = useSelector((state) => state.lang);
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getAboutpage({ id: location.pathname.split("/")[1] }));
    }
  }, [dispatch]);
  var header = "";
  var intro = {};
  var gallery = [];
  var ceoquote = [];
  var internationally_renowned_specialist = {};
  var specialists = [];
  var outro_aboutus = {};
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  if (status === "success") {
    console.log(page);
    header = page.page_fields.header;
    intro = lang === "en" ? page.page_fields.intro : page.page_fields.ar_intro;
    gallery = page.page_fields.slides.gallery;
    ceoquote =
      lang === "en" ? page.page_fields.ceoquote : page.page_fields.ar_ceoquote;
    internationally_renowned_specialist =
      page.page_fields.internationally_renowned_specialist;
    specialists = page.page_fields.specialists.specialists;
    outro_aboutus = page.page_fields.outro_aboutus;

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
  var doc = new DOMParser().parseFromString(
    page.scripts && decode(page.scripts),
    "text/xml"
  );
  return (
    <div className="About">
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
            pagename={lang === "en" ? header.heading : page.page_title_ara}
            header={header}
          />
          <div className="position-relative">
            {/* <div className="parrallax-container ">
              <div className="parallax"></div>
            </div> */}
            <WhoWeAre intro={intro} />
            <AboutGallery gallery={gallery} />

            <CEOMessage ceoquote={ceoquote} />
            {/* <Specialists
              specialists={specialists}
              internationally_renowned_specialist={
                internationally_renowned_specialist
              }
            /> */}
            <Approach outro_aboutus={outro_aboutus} />
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
      ) : (
        <>
          <PageHeaderSkeleton />
          <WhoWeAreSkeleton />
          <AboutGallerySkeleton />
        </>
      )}
    </div>
  );
}

export default About;

function WhoWeAreSkeleton() {
  return (
    <div className="WhoWeAre content-block1 position-relative pt-5">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 align-self-center">
            <h2>
              <Skeleton animation="wave" />
            </h2>
            <p>
              <Skeleton animation="wave" />
            </p>
            <p>
              <Skeleton animation="wave" />
            </p>
            <p>
              <Skeleton animation="wave" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function AboutGallerySkeleton() {
  return (
    <div className="WhoWeAre content-block1 position-relative pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 align-self-center">
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="200px"
            />
          </div>
          <div className="col-md-4 align-self-center">
            <Skeleton
              animation="wave"
              variant="rect"
              width="200px"
              height="200px"
            />
          </div>
          <div className="col-md-4 align-self-center">
            <Skeleton
              animation="wave"
              variant="rect"
              width="200px"
              height="200px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
