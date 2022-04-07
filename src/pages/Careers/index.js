import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCareerpage } from "../../app/careerpage";
import LoadingOverlay from "../../components/LoadingOverlay";
import PageHeader from "../../layout/PageHeader";
import Applyfrom from "./Applyform";
import ApplyNow from "./Applynow";
import HomeInstagram from "./Homeinstagram";
import Positions from "./Positions";
import WhyJoin from "./Whyjoin";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

function Careers() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.career);
  const { status } = useSelector((state) => state.career);
  const { lang } = useSelector((state) => state.lang);
  const mstatus = useSelector((state) => state.getmenu.status);
  const location = useLocation();
  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getCareerpage({ id: location.pathname.split("/")[1] }));
    }
  }, [dispatch]);

  var header = "";
  var intro = {};
  var outro = {};
  var positions = {};

  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  if (status === "success") {
    console.log(page);
    header = page.page_fields.heading;
    intro = lang == "en" ? page.page_fields.intro : page.page_fields.ar_intro;
    outro = lang == "en" ? page.page_fields.outro : page.page_fields.ar_outro;
    positions =
      lang == "en" ? page.page_fields.positions : page.page_fields.ar_positions;

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
  const [open, setOpen] = useState(false);
  const [PositionIndex, setPositionIndex] = useState(0);

  const handleOpen = (idx) => {
    setPositionIndex(idx);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePostion = (idx) => {};
  return (
    <div className="Careers">
      {status === "success" && mstatus === "success" ? (
        <>
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
            pagename={lang === "en" ? page.page_title : page.page_title_ara}
            header={header}
            shorten={true}
          />
          <WhyJoin intro={intro} />
          <Positions
            handlePostion={handlePostion}
            positions={positions}
            handleOpen={handleOpen}
          />
          <ApplyNow applynow={outro} />
          <Applyfrom
            applynow={outro}
            positions={positions}
            open={open}
            PositionIndex={PositionIndex}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
          <HomeInstagram />
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
      {/* <div style={{ marginBottom: 100 }} /> */}
    </div>
  );
}
export default Careers;
