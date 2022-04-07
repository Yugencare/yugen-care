import React from "react";

function BlogHeader({ blogheader }) {
  return (
    <div className="BlogHeader position-relative">
      <div className="row" style={{ marginRight: 0 }}>
        <div className="col-xl-6 col-md-6 col-sm-8">
          <div className="blog_text">
            <h1
              data-aos="fade-right"
              data-aos-delay="0"
              data-aos-duration="1000"
              data-aos-once={true}
            >
              {blogheader.title1} <span>{blogheader.title2}</span>
            </h1>
            <p
              data-aos="fade"
              data-aos-delay="400"
              data-aos-duration="1000"
              data-aos-once={true}
            >
              {blogheader.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogHeader;
