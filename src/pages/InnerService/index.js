import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInnerservicepage } from "../../app/innerservicepage";
import FAQ from "../../components/FAQ";
import LoadingOverlay from "../../components/LoadingOverlay";
import QuoteSlider from "../../components/QuoteSlider";
import SubServiceList from "../../components/SubServiceList";
import Errorpage from "../../layout/Errorpage";
import SubServiceHeader from "../../layout/SubServiceHeader";

function InnerService() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.innerservice);
  const { status } = useSelector((state) => state.innerservice);
  const mstatus = useSelector((state) => state.getmenu.status);
  const params = useParams();

  useEffect(() => {
    ////Passing page ID reference
    dispatch(getInnerservicepage({ id: params.slug }));
  }, [dispatch, params.slug]);

  var heading = {};
  var treatments = [];
  var testimonials = [];
  var faq = [];
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  if (status === "success") {
    console.log(page);
    heading = page.page_fields.heading;
    treatments = page.page_fields.services?.treatments;
    // testimonials = page.page_fields.testimonials?.testimonials;
    faq = page.page_fields.faq;
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
    <div className="InnerService position-relative">
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
          <SubServiceHeader header={heading} />
          <SubServiceList servicelist={treatments} />
          <div style={{ marginTop: 70 }}>
            <QuoteSlider testimonials={testimonials} />
          </div>
          <FAQ faq={faq} />
        </>
      ) : status === "failed" ? (
        <Errorpage />
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}

export default InnerService;
