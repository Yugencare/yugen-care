import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { getBlogs } from "../../app/Blogs/allblogs";
import { getBlogpage } from "../../app/Blogs/blogpage";
import PageHeader from "../../layout/PageHeader";
import PageHeaderSkeleton from "../../layout/PageHeaderSkeleton";
import BlogReviews from "./BlogReviews";
import FeaturedBlog from "./FeaturedBlog";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

function Blog() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.blogpage);
  const { status } = useSelector((state) => state.blogpage);
  const { blogs } = useSelector((state) => state.blogs);
  const { lang } = useSelector((state) => state.lang);
  const { blogsstatus } = useSelector((state) => state.blogs);
  const mstatus = useSelector((state) => state.getmenu.status);
  const params = useParams();
  const location = useLocation();
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getBlogpage({ id: location.pathname.split("/")[1] }));
    }
    if (blogsstatus !== "success") {
      dispatch(getBlogs());
    }
  }, [dispatch]);

  var blogheader = {};
  var featuredBlogs = {};
  var all_blogs = [];
  var header = {};
  if (status === "success") {
    blogheader = page.page_fields.blogheader;
    featuredBlogs = page.page_fields.featuredblogs;
    header = {
      background: blogheader.backgound,
      text:
        lang === "en"
          ? blogheader.subtitle
          : page.page_fields.ar_blogheader?.subtitle,
      title:
        lang === "en"
          ? blogheader.title1
          : page.page_fields.ar_blogheader.title1,
      text2:
        lang === "en"
          ? blogheader?.subtext
          : page.page_fields.ar_blogheader?.subtext,
    };

    //HELMET
    helmet_meta = page.meta;

    properties = page.properties;
    try {
      schemaJSON = page.schema?.map((object) => {
        return JSON.stringify(object);
      });
    } catch (e) {
      console.log("Could Not Parse JSON");
    }
  }

  console.log(blogs);
  if (status === "success") {
    all_blogs = blogs.filter(
      (blog) =>
        !featuredBlogs.featured?.some((featured) => blog.id === featured.value)
    );
    if (blogsstatus === "success") {
      if (featuredBlogs?.featured && featuredBlogs?.featured.length !== 0) {
        all_blogs = blogs.filter(
          (blog) =>
            !featuredBlogs.featured?.some(
              (featured) => blog.id === featured.value
            )
        );
      }
    }
  }

  var renderpage =
    blogsstatus === "success" && status === "success" && mstatus === "success";
  if (renderpage) {
    document.body.style.overflowY = "scroll";
  } else {
    document.body.style.overflow = "hidden";
  }

  return (
    <div className="Blog">
      {renderpage && (
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
      )}

      {renderpage ? (
        <>
          {/* <SubsServiceHeader header={header} /> */}
          <PageHeader
            pagename={lang === "en" ? header.title : page.page_title_ara}
            header={header}
          />
          <FeaturedBlog featuredBlogs={featuredBlogs} header={header} />
          <BlogReviews all_blogs={all_blogs} />
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
          <FeaturedBlogSkeleton />
          <BlogReviewsSkeleton />
        </>
      )}
    </div>
  );
}
export default Blog;

function BlogHeaderSkeleton() {
  return (
    <div className="BlogHeader position-relative">
      <div className="row" style={{ marginRight: 0 }}>
        <div className="col-xl-6 col-md-6 col-sm-8">
          <div className="blog_text">
            <h1>
              <Skeleton animation="wave" />
            </h1>
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

function BlogReviewsSkeleton() {
  return (
    <div
      className="BlogReviews position-relative"
      style={{ marginTop: "100px" }}
    >
      <div className="row " style={{ marginRight: 0, marginLeft: 0 }}>
        {[1, 2, 3, 4, 5, 6].map((blog, idx) => (
          <div className=" col-sm-6 col-md-4 d-flex justify-content-center">
            <div className="blog-card mt-4">
              <Link>
                <div className="blog-imgwrapper mb-4">
                  <Skeleton variant="rect" width="100%" height="300px" />
                </div>
              </Link>
              <p>
                <Skeleton />
              </p>
              <Link>
                <h2>
                  <Skeleton />
                </h2>
              </Link>
              <p>
                <Skeleton />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
