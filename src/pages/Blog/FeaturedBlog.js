import { Skeleton } from "@material-ui/lab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import yicon from "../../images/y-icon.png";

function FeaturedBlog({ featuredBlogs, header }) {
  const { lang } = useSelector((state) => state.lang);
  const slugify = (string) => {
    const slug = string
      .toString() // Cast to string
      .toLowerCase() // Convert the string to lowercase letters
      .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim() // Remove whitespace from both sides of a string
      .replace("&", "and") // Replace spaces with -
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -
    return slug;
  };
  const params = useParams();
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div className="container text-center" style={{ marginTop: 80 }}>
        <div className="WhyJoin text-center content-block1 position-relative m-0">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div
                data-aos="fade"
                data-aos-delay="0"
                data-aos-duration="500"
                className="text-center mb-5 pb-3"
              >
                <h2>{header?.text}</h2>
                <p>{header?.text2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {featuredBlogs.featured && featuredBlogs.featured.length !== 0 && (
        <div className="FeaturedBlog position-relative">
          {!loaded && <FeaturedBlogSkeleton />}
          <div
            // data-aos="fade"
            // data-aos-delay="500"
            // data-aos-duration="1000"
            // data-aos-once={true}
            className="row justify-content-center"
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            {featuredBlogs.featured?.map((blog, idx) => (
              <div
                key={blog.value + "/" + idx}
                className="col-sm-4"
                style={
                  idx === 0
                    ? { paddingRight: 15, paddingLeft: 0 }
                    : idx === 2
                    ? { paddingLeft: 15, paddingRight: 0 }
                    : null
                }
              >
                <div className="fill-blog">
                  <img
                    src={blog.images ? blog.images[0]?.url : null}
                    alt=""
                    style={loaded ? { display: "block" } : { display: "none" }}
                    onLoad={() => setLoaded(true)}
                  />
                  <div className="black-fill"></div>
                  <div className="fill-blog-content">
                    <p>{lang === "en" ? blog.label : blog.label_ar}</p>
                    <Link to={`/research/${blog.slug}`} className="btn6">
                      <span> {lang === "en" ? "Read More" : "اقرأ أكثر"}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <img className="y-icon-blog img-fluid" src={yicon} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
export default FeaturedBlog;

function FeaturedBlogSkeleton() {
  return (
    <div className="FeaturedBlog position-relative">
      <div className="row" style={{ marginRight: 0, marginLeft: 0 }}>
        <div className="col-sm-4 fill-blog" style={{ padding: 0 }}>
          <Skeleton
            animation="wave"
            variant="rect"
            width="100%"
            height="400px"
          />
        </div>
        <div className="col-sm-4 fill-blog" style={{ padding: 0 }}>
          <Skeleton
            animation="wave"
            variant="rect"
            width="100%"
            height="400px"
          />
        </div>
        <div className="col-sm-4 fill-blog" style={{ padding: 0 }}>
          <Skeleton
            animation="wave"
            variant="rect"
            width="100%"
            height="400px"
          />
        </div>
      </div>
    </div>
  );
}
