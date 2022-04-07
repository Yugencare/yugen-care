import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import ND from "../../images/no-doctor.png";

import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function Doctors({ slug }) {
  const [Data, setData] = useState(null);
  const [MetaData, setMetaData] = useState(null);
  const location = useLocation();
  const { lang } = useSelector((state) => state.lang);
  const history = useHistory();
  const [BAlist, setBAlist] = useState([]);
  const getBlog = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/pages/blogs/page/${slug}`
    );
    const data = await response.data.page.page_fields;
    const meta = await response.data.page;
    setData(data);
    setMetaData(meta);
  };
  useEffect(() => {
    getBlog();
  }, []);
  const img = Data?.MetaData?.find((prop) => prop.property === "og:image");

  const htmlDecode = (content) => {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };
  return Data ? (
    <div className="OptionOne content-block1 position-relative">
      {MetaData && location.pathname.includes(MetaData.tab_slug) && (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{MetaData?.meta?.title}</title>
          <meta name="description" content={MetaData?.meta?.description} />
          {MetaData?.properties && MetaData?.properties?.length !== 0
            ? MetaData.properties.map((prpty, idx) => (
                <meta
                  key={prpty.content}
                  property={prpty.property}
                  content={prpty.content}
                />
              ))
            : null}

          {MetaData?.schema &&
            MetaData?.schema.length &&
            MetaData?.schema.map((s) => (
              <script type="application/ld+json">{JSON.stringify(s)}</script>
            ))}
        </Helmet>
      )}

      <div className="doctor_blog_img">
        <img
          src={
            Data.header?.image_intro &&
            Data.header?.image_intro.length !== 0 &&
            Data.header?.image_intro[0].url
          }
          alt=""
        />
      </div>
      <h1 className="mt-3">
        {lang === "en" ? Data.header?.heading : Data.ar_header?.heading}
      </h1>

      <div
        className="doctor-editor"
        dangerouslySetInnerHTML={{
          __html: htmlDecode(
            lang === "en"
              ? Data.header?.tab_content
              : Data.ar_header?.tab_content
          ),
        }}
      />
      <div className="row mt-4">
        {Data.our_doctors?.doctors &&
          Data.our_doctors?.doctors.length !== 0 &&
          Data.our_doctors?.doctors.map((doct) => (
            <div key={doct.value} className="col-6 col-sm-4">
              <div className="doctor-blogbox">
                <div className="doctor-blogimg">
                  <img
                    src={
                      doct.images && doct.images.length !== 0
                        ? doct.images[0].url
                        : ND
                    }
                    alt=""
                  />
                </div>
                <h2>{lang === "en" ? doct.label : doct.label_ar}</h2>
                <p>
                  {lang === "en"
                    ? doct.description_text1
                    : doct.description_text1_ar}
                </p>
                <Link to={`/professionals/${doct.label}/${doct.value}`}>
                  {lang === "en" ? "Read more" : "اقرأ أكثر"}
                </Link>
              </div>
            </div>
          ))}
      </div>
      <button onClick={() => history.push("/book")} className="my-4 my-sm-5">
        <p>
          {lang === "en"
            ? "Request an appointment at Yugen Care"
            : "اطلب موعدًا في يوجين كير"}
        </p>
      </button>
      <div className="row">
        {Data.before_after?.ba &&
          Data.before_after.ba?.length !== 0 &&
          Data.before_after.ba.map((BA, i) => (
            <div key={BA.id} className="col-sm-6 col-md-4">
              <div className="BA-blogbox">
                <div className="BA-blogimg position-relative">
                  <img
                    src={
                      BA.images && BA.images.length !== 0
                        ? BA.images[0].url
                        : ND
                    }
                    alt=""
                  />
                  {/* <div className="BA-text">
                    <p>
                      {lang === "en"
                        ? BA.title
                        : Data?.ar_before_after?.ba[i].title}
                    </p>
                  </div>
                  <div className="dr_BAname">
                    <p>
                      {lang === "en"
                        ? BA.class
                        : Data?.ar_before_after?.ba[i].class}
                    </p>
                  </div> */}
                </div>
                {/* <div className="BA-blogimg position-relative mt-1">
                      {Data.before_after.ba?.length < [i + 1] && (
                        <>
                          <img
                            src={
                              Data.before_after.ba[i + 1].images &&
                              Data.before_after.ba[i + 1].images.length !== 0
                                ? Data.before_after.ba[i + 1].images[0].url
                                : ND
                            }
                            alt=""
                          />
                          <div className="BA-text">
                            <p>
                              {lang === "en"
                                ? Data.before_after.ba[i + 1] &&
                                  Data.ar_before_after.ba[i + 1].title
                                : Data.ar_before_after.ba[i + 1] &&
                                  Data.ar_before_after.ba[i + 1].title}
                            </p>
                          </div>
                          <div className="dr_BAname">
                            <p>
                              {lang === "en"
                                ? Data.before_after.ba[i + 1] &&
                                  Data.ar_before_after.ba[i + 1].class
                                : Data.ar_before_after.ba[i + 1] &&
                                  Data.ar_before_after.ba[i + 1].class}
                            </p>
                          </div>
                        </>
                      )}
                    </div> */}

                <p className="mt-2">
                  {lang === "en" ? BA.url : Data?.ar_before_after?.ba[i].url}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="share-blog d-flex justify-content-end">
        {lang === "en" ? "Share" : "شارك"}

        <FacebookShareButton
          url={`https://yugen.beuniquegroup.dev/${location.pathname}`}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={22} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={`https://yugen.beuniquegroup.dev/${location.pathname}`}
          className="Demo__some-network__share-button"
          title={MetaData?.page_title}
        >
          <TwitterIcon size={22} round />
        </TwitterShareButton>
        <PinterestShareButton
          url={`https://yugen.beuniquegroup.dev/${location.pathname}`}
          media={`${img}`}
          className="Demo__some-network__share-button"
        >
          <PinterestIcon size={22} round />
        </PinterestShareButton>
        <LinkedinShareButton
          url={`https://yugen.beuniquegroup.dev/${location.pathname}`}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={22} round />
        </LinkedinShareButton>
        <TelegramShareButton
          url={`https://yugen.beuniquegroup.dev/${location.pathname}`}
          title={MetaData?.page_title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={22} round />
        </TelegramShareButton>
        <WhatsappShareButton
          url={`https://yugen.beuniquegroup.dev${location.pathname}`}
          title={MetaData?.page_title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={22} round />
        </WhatsappShareButton>

        <FacebookMessengerShareButton
          url={`https://yugen.beuniquegroup.dev/${location.pathname}`}
          appId="521270401588372"
          className="Demo__some-network__share-button"
        >
          <FacebookMessengerIcon size={22} round />
        </FacebookMessengerShareButton>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

/// OLD BEFORE AND AFTER

// {Data.before_after?.ba &&
//   Data.before_after.ba?.length !== 0 &&
//   Data.before_after.ba.map(
//     (BA, i) =>
//       i % 2 === 0 && (
//         <div key={BA.id} className="col-sm-6 col-md-4">
//           <div className="BA-blogbox">
//             <div className="BA-blogimg position-relative">
//               <img
//                 src={
//                   BA.images && BA.images.length !== 0
//                     ? BA.images[0].url
//                     : ND
//                 }
//                 alt=""
//               />
//               <div className="BA-text">
//                 <p>
//                   {lang === "en"
//                     ? BA.title
//                     : Data?.ar_before_after?.ba[i].title}
//                 </p>
//               </div>
//               <div className="dr_BAname">
//                 <p>
//                   {lang === "en"
//                     ? BA.class
//                     : Data?.ar_before_after?.ba[i].class}
//                 </p>
//               </div>
//             </div>
//             <div className="BA-blogimg position-relative mt-1">
//               {Data.before_after.ba?.length < [i + 1] && (
//                 <>
//                   <img
//                     src={
//                       Data.before_after.ba[i + 1].images &&
//                       Data.before_after.ba[i + 1].images.length !== 0
//                         ? Data.before_after.ba[i + 1].images[0].url
//                         : ND
//                     }
//                     alt=""
//                   />
//                   <div className="BA-text">
//                     <p>
//                       {lang === "en"
//                         ? Data.before_after.ba[i + 1] &&
//                           Data.ar_before_after.ba[i + 1].title
//                         : Data.ar_before_after.ba[i + 1] &&
//                           Data.ar_before_after.ba[i + 1].title}
//                     </p>
//                   </div>
//                   <div className="dr_BAname">
//                     <p>
//                       {lang === "en"
//                         ? Data.before_after.ba[i + 1] &&
//                           Data.ar_before_after.ba[i + 1].class
//                         : Data.ar_before_after.ba[i + 1] &&
//                           Data.ar_before_after.ba[i + 1].class}
//                     </p>
//                   </div>
//                 </>
//               )}
//             </div>

//             <p className="mt-2">
//               {lang === "en"
//                 ? BA.url
//                 : Data?.ar_before_after?.ba[i].url}
//             </p>
//           </div>
//         </div>
//       )
//   )}
