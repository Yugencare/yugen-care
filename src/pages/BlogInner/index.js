import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  matchPath,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { getBlogs } from "../../app/Blogs/allblogs";
import { getInnerblog } from "../../app/Blogs/innerblogpage";
import LoadingOverlay from "../../components/LoadingOverlay";
import Errorpage from "../../layout/Errorpage";
import LT from "../../svgs/left-t.svg";
import RT from "../../svgs/right-t.svg";
import BlogInnerHeader from "./BlogInnerHeader";
import BlogPageAdapter from "./BlogPageAdapter";
import LatestBlogs from "./LatestBlogs";
import ReviewSection from "./ReviewSection";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`s-tabpanel-${index}`}
      aria-labelledby={`s-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `s-tab-${index}`,
    "aria-controls": `s-tabpanel-${index}`,
  };
}

const styles = {
  tabs: {
    background: "transparent",
  },
};
const convertDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const convertDay_ar = [
  "اﻷحد",
  "اﻷثنين",
  "الثلاثاء",
  "اﻷربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const nth = (d) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

function custom_sort(a, b) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

function BlogInner() {
  const dispatch = useDispatch();
  const { blog, reviews } = useSelector((state) => state.innerblog);
  const { status } = useSelector((state) => state.innerblog);
  const { blogs } = useSelector((state) => state.blogs);
  const { blogsstatus } = useSelector((state) => state.blogs);
  const mstatus = useSelector((state) => state.getmenu.status);
  const params = useParams();
  const history = useHistory();
  const location = history.location.pathname;
  const { pathname } = useLocation();
  const { lang } = useSelector((state) => state.lang);

  // const [BlogsData, setBlogData] = useState([]);
  const formatDate = (date) => {
    var jsondate = new Date(date);
    //Getting Day
    var day = jsondate.getDate();
    var ordinal = nth(day);
    day = day + ordinal;
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
    const year = jsondate.getFullYear();
    var parsedDate = `${
      convertDay[jsondate.getDay()]
    }, ${day} ${month} ${year}`;
    var parsedDate =
      lang === "en"
        ? `${convertDay[jsondate.getDay()]}, ${day} ${month} ${year}`
        : `${year} ${month_ar} ${jsondate.getDate()}, ${
            convertDay_ar[jsondate.getDay()]
          }`;
    return parsedDate;
  };
  var L = location
    .split("/")
    .filter((e) => e)
    .reverse();
  var R = L.pop();
  var B = L.pop();

  var blog_title = "";
  var updatedAt = "";
  var blog_text;
  var blog_slug;
  var blog_id;
  var blog_pages = [];

  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  if (status === "success") {
    if (blog) {
      blog_title = lang === "en" ? blog.blog_title : blog.blog_title_ar;
      updatedAt = formatDate(blog.updatedAt);
      blog_text = blog.blog_text;
      blog_slug = blog.slug;
      blog_id = blog.id;
      blog_pages = blog.blog_pages;

      //HELMET
      helmet_meta = blog.meta;

      properties = blog.properties;
      try {
        schemaJSON = blog.schema?.map((object) => {
          return JSON.stringify(object);
        });
      } catch (e) {
        console.log("Could Not Parse JSON");
      }
    }
  }

  const BlogsData = blog_pages?.map((option) => ({
    id: option.value,
    path: `/${R}/${B}/${option.tab_slug}`,
    slug: option.tab_slug,
    text: option.tab_title,
    text_ar: option.tab_title_ar,
    template: option.page_template?.label,
  }));

  var all_blogs = [];
  if (blogsstatus === "success") {
    all_blogs = blogs;
    var latestBlogs = all_blogs.slice().sort(custom_sort);
    var idToDelete = params.title;
    latestBlogs = latestBlogs.filter((item) => item.slug !== idToDelete);
  }

  const handleChange = (event, newValue) => {
    setOptionIndex(BlogsData?.findIndex((item) => item.id === newValue));
  };

  const activeItem = BlogsData?.find(
    (item) => !!matchPath(pathname, { path: item.path }),
  );
  const [OptionIndex, setOptionIndex] = useState(0);

  useEffect(() => {
    dispatch(getInnerblog({ id: B }));
    dispatch(getBlogs());
  }, [dispatch, B]);
  useEffect(() => {
    setOptionIndex(
      BlogsData?.findIndex(
        (item) => !!matchPath(pathname, { path: item.path }),
      ),
    );
  }, [blog]);

  if (activeItem === undefined) {
    if (BlogsData?.length !== 0) {
      return <Redirect to={BlogsData[0].path} />;
    }
  }

  const handleNext = () => {
    const index = BlogsData?.findIndex(
      (item) => !!matchPath(pathname, { path: item.path }),
    );

    setOptionIndex(index + 1);
    if (index < BlogsData?.length - 1) {
      history.push(BlogsData[index + 1].path);
    }
  };

  const handlePrev = () => {
    const index = BlogsData?.findIndex(
      (item) => !!matchPath(pathname, { path: item.path }),
    );
    setOptionIndex(index - 1);
    if (index > 0) {
      history.push(BlogsData[index - 1].path);
    }
  };

  return (
    <>
      {!blog && <Errorpage />}
      <div className="BlogInner">
        {status === "success" &&
        blogsstatus === "success" &&
        mstatus === "success" ? (
          <div className="container-lg">
            {/* {window.scrollTo(0, 0)} */}
            <div className="row">
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
              <div className="col-md-8 col-sm-12">
                <BlogInnerHeader
                  blog_title={blog_title}
                  updatedAt={updatedAt}
                />
              </div>
              <div className="col-md-8 col-sm-12">
                <Tabs
                  value={
                    activeItem
                      ? activeItem.id
                      : BlogsData.length !== 0 && BlogsData[0].id
                  }
                  style={styles.tabs}
                  variant="scrollable"
                  scrollButtons="on"
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: { background: "#91d3ca", height: 3 },
                  }}
                >
                  {BlogsData?.map((option) => (
                    <Tab
                      value={option.id}
                      label={lang === "en" ? option.text : option.text_ar}
                      component={Link}
                      to={option.path}
                    />
                  ))}
                </Tabs>
              </div>
              <div className="col-md-8 col-sm-12 mt-4">
                {BlogsData?.map((b) => (
                  <div className={activeItem.id === b.id ? "" : "d-none"}>
                    <BlogPageAdapter template={b.template} slug={b.slug} />
                  </div>
                ))}
                {/* <Switch>
                  {BlogsData?.map((b) => (
                    <Route
                      exact
                      path={b.path}
                      render={(props) => (
                        <BlogPageAdapter
                          {...props}
                          template={b.template}
                          slug={b.slug}
                        />
                      )}
                      key={b.id}
                    />
                  ))}
                </Switch> */}
                {console.log(OptionIndex)}
                {BlogsData?.length > 1 && (
                  <>
                    <div className="TabArrows d-flex justify-content-between mt-3">
                      {OptionIndex > 0 && (
                        <div
                          className="d-flex align-items-center"
                          style={{ cursor: "pointer" }}
                          onClick={handlePrev}
                        >
                          <img src={lang === "en" ? LT : RT} alt="" />
                          <p>{lang == "en" ? "Previous" : "السابق"}</p>
                        </div>
                      )}
                      {OptionIndex < BlogsData?.length - 1 && (
                        <div
                          className={`d-flex align-items-center ${
                            lang == "en" ? "ml-auto" : "mr-auto"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={handleNext}
                        >
                          <p>{lang == "en" ? "Next" : "التالي"}</p>
                          <img src={lang === "en" ? RT : LT} alt="" />
                        </div>
                      )}
                    </div>
                  </>
                )}
                {blog && (
                  <ReviewSection
                    blog_title={blog_title}
                    blog_slug={blog_slug}
                    blog_id={blog_id}
                    reviews={reviews}
                  />
                )}
              </div>
              {blog && (
                <div className="col-sm-12 col-md-4 mt-4">
                  <LatestBlogs latestBlogs={latestBlogs} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <LoadingOverlay />
        )}
      </div>
    </>
  );
}

export default BlogInner;
