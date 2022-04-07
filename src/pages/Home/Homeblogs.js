import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import blog1 from "../../images/blog1.jpg";

function HomeBlogs({ latestBlogs, headline }) {
  const { lang } = useSelector((state) => state.lang);
  const formatDate = (date) => {
    var jsondate = new Date(date);
    //Getting Day
    var day = jsondate.getDate();
    // Getting Month
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][jsondate.getMonth()];

    const month_ar = [
      "يناير",
      "فبراير",
      "مارس",
      "إبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ][jsondate.getMonth()];
    //Geting Year
    var parsedDate = `${day} ${lang === "en" ? month : month_ar}`;
    return parsedDate;
  };

  return (
    <div className="HomeBlogs content-block1 position-relative">
      <div
        data-aos="fade"
        data-aos-delay="500"
        data-aos-duration="1000"
        className="container"
      >
        {latestBlogs?.length === 0 ? null : (
          <>
            <div className="row justify-content-center">
              <div className="col-xl-8 text-center">
                <h2>{headline}</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              {latestBlogs.map((blog) => (
                <div
                  key={blog.value}
                  className="col-xl-4 col-md-4 col-sm-4 mb-4 mb-md-0"
                >
                  <div className="blogbox">
                    <div style={{ overflow: "hidden" }}>
                      <Link
                        to={`/research/${blog.slug}`}
                        className="d-block d-block-img"
                        style={{
                          background: `url(${
                            blog.images ? blog.images[0]?.url : null
                          })`,
                        }}
                      >
                        <img src={`${blog1}`} style={{ opacity: 0 }} alt="" />
                      </Link>
                    </div>
                    <span className="blog_date d-block">
                      {formatDate(blog.date)}
                    </span>
                    <Link
                      to={`/research/${blog.slug}`}
                      className="blog_title d-block"
                    >
                      {lang === "en" ? blog.label : blog.label_ar}
                    </Link>
                    <Link
                      to={`/research/${blog.slug}`}
                      className="read_more d-block"
                    >
                      {lang === "en" ? "Read more" : "اقرأ أكثر"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="text-center mt-4 pt-4 mt-lg-5 pt-lg-5">
          <Link to="/research" className="btn2">
            {lang === "en" ? "View Research" : "عرض الأبحاث"}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HomeBlogs;
