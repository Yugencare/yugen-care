import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import GrayIMG from "../../images/GrayIMG.jpg";
import { useSelector } from "react-redux";

function BlogReviews({ all_blogs }) {
  const [numOFBlogs, setNumOFBlogs] = useState(6);
  const [buttonHide, setButtonHide] = useState("block");
  const params = useParams();
  const ViewMoreBlogs = () => {
    setButtonHide("none");
    setNumOFBlogs(all_blogs?.length);
  };
  const { lang } = useSelector((state) => state.lang);
  return all_blogs?.length !== 0 ? (
    <div
      className="BlogReviews position-relative"
      style={{ marginTop: "100px" }}
    >
      <div className="row " style={{ marginRight: 0, marginLeft: 0 }}>
        {all_blogs?.slice(0, numOFBlogs).map((blog, idx) => (
          <div
            className=" col-sm-6 col-md-4 d-flex justify-content-center"
            key={blog.id + idx}
          >
            <BlogCard
              img={blog.images ? blog.images[0]?.url : GrayIMG}
              date={blog.updatedAt}
              title={lang === "en" ? blog.blog_title : blog.blog_title_ar}
              description={lang === "en" ? blog.blog_text : blog.blog_text_ar}
              link={blog.slug}
            />
          </div>
        ))}
        {all_blogs?.length > 6 ? (
          <div className="loadmore" style={{ display: buttonHide }}>
            <div className="btn-round">
              <a onClick={ViewMoreBlogs}>
                {lang === "en" ? "LOAD MORE" : "تحميل المزيد"}
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <div
      data-aos="slide-up"
      data-aos-duration="800"
      className="BlogReviews position-relative d-flex flex-column justify-content-center align-items-center"
    >
      <img
        src="https://yugencare.com/wp-content/uploads/2022/01/cropped-favicon_yugent-270x270.png"
        alt="yugencare"
      />
      <h1>{lang === "en" ? "Coming Soon!" : "قريبا!"}</h1>
    </div>
  );
}
export default BlogReviews;
