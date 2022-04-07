import { TextField, withStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import BD from "../../images/doctor1.jpg";

const RequestField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#6c9e97",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#95d5cc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#95d5cc",
      },
    },
  },
})(TextField);

function LatestBlogs({ latestBlogs }) {
  const { blogsstatus } = useSelector((state) => state.blogs);
  const { blog, status } = useSelector((state) => state.innerblog);
  const { isLoggedIn } = useSelector((state) => state.loginUser);
  const { lang } = useSelector((state) => state.lang);

  const [Cat, setCat] = useState(null);
  const [Rblog, setRblog] = useState(null);

  const getCat = async () => {
    let id = blog?.categories?.value;
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/services/${id}`
    );
    const data = await response.data.services;

    setCat(data);
  };

  const getRblog = async () => {
    let id = blog?.author?.value;
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/blogs/${id}`
    );
    const data = await response.data.blogs;

    setRblog(data);
  };

  useEffect(() => {
    // if (status !== "success") {
    getCat();
    getRblog();
    // }
  }, []);
  const history = useHistory();
  const HandleSubmit = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      history.push("/book");
    } else {
      history.push("/login");
    }
  };
  return (
    <div className="latestblog_container">
      {Cat && (
        <div className="category_blog mt-5 mt-md-0">
          <Link to={`/7-pillars/${Cat.slug}`}>
            <img
              className="mb-3"
              src={
                Cat.images && Cat.images.length !== 0 ? Cat.images[0].url : BD
              }
              alt=""
            />
          </Link>

          <div className="blog-card text-center">
            <Link to={`/7-pillars/${Cat.slug}`}>
              <h2 style={{ textTransform: "capitalize" }}>
                {lang === "en" ? Cat.name?.toLowerCase() : Cat.name_ar}
              </h2>
            </Link>

            <p>{lang === "en" ? Cat.description : Cat.description_ar}</p>
          </div>
        </div>
      )}

      <form className="request-booking" onSubmit={HandleSubmit}>
        <h2>{lang === "en" ? "Request an appointment" : "طلب موعد"} </h2>
        <div className="requestfields">
          <RequestField
            size="small"
            variant="outlined"
            required
            fullWidth
            label={lang === "en" ? "Name" : "اسم"}
          />
          <RequestField
            variant="outlined"
            required
            type="number"
            className="mt-2 no-arrow"
            size="small"
            fullWidth
            style={{ textAlign: "right" }}
            label={lang === "en" ? "Mobile Number" : "رقم الهاتف"}
          />
        </div>
        <div className="text-center">
          <button type="submit">
            <h2>{lang === "en" ? "Send Request" : "ارسل طلب"}</h2>
          </button>
        </div>
      </form>
      {Rblog && (
        <>
          <div className="Latestblog-heading">
            <h1>{lang === "en" ? "Recommended to you" : "موصى به لك"}</h1>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-12">
              <BlogCard
                img={
                  Rblog.images && Rblog.images.length !== 0
                    ? Rblog.images[0]?.url
                    : BD
                }
                date={Rblog.updatedAt}
                title={lang === "en" ? Rblog.blog_title : Rblog.blog_title_ar}
                description={
                  lang === "en" ? Rblog.blog_text : Rblog.blog_text_ar
                }
                link={Rblog.slug}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default LatestBlogs;
