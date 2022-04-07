import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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

function BlogContent({ slug }) {
  const [Data, setData] = useState(null);
  const location = useLocation();
  const getBlog = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/pages/blogs/page/${slug}`
    );
    const data = await response.data.page;

    setData(data);
  };
  // console.log(Data);
  const htmlDecode = (content) => {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };
  useEffect(() => {
    getBlog();
  }, []);

  const img = Data?.properties?.find((prop) => prop.property === "og:image");
  const { lang } = useSelector((state) => state.lang);
  return (
    <div className="blog-content">
      {Data && location.pathname.includes(Data.tab_slug) && (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{Data.meta?.title}</title>
          <meta name="description" content={Data?.meta?.description} />
          {Data?.properties && Data?.properties.length !== 0
            ? Data.properties.map((prpty, idx) => (
                <meta
                  key={prpty.content}
                  property={prpty.property}
                  content={prpty.content}
                />
              ))
            : null}

          {Data?.schema &&
            Data.schema.length &&
            Data.schema.map((s) => (
              <script type="application/ld+json">{JSON.stringify(s)}</script>
            ))}
        </Helmet>
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: Data?.page_fields
            ? htmlDecode(
                lang === "en"
                  ? Data.page_fields.editor?.blog_content
                  : Data.page_fields.ar_editor?.blog_content
              )
            : "loading...",
        }}
      />

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
          title={Data?.page_title}
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
          title={Data?.page_title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={22} round />
        </TelegramShareButton>
        <WhatsappShareButton
          url={`https://yugen.beuniquegroup.dev${location.pathname}`}
          title={Data?.page_title}
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
  );
}
export default BlogContent;
