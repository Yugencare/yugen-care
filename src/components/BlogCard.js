import { Skeleton } from "@material-ui/lab";
import { decode } from "html-entities";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlogCard(props) {
  const { lang } = useSelector((state) => state.lang);
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
    var parsedDate =
      lang === "en"
        ? `${convertDay[jsondate.getDay()]}, ${day} ${month} ${year}`
        : `${year} ${month_ar} ${jsondate.getDate()}, ${
            convertDay_ar[jsondate.getDay()]
          }`;
    return parsedDate;
  };
  decode("&lt; &gt; &quot; &apos; &amp; &#169; &#8710;");
  const removeTags = (str) => {
    if (str === null) return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  };
  const [loaded, setLoaded] = useState(false);

  return (
    <div data-aos="fade-up" data-aos-duration="800">
      <div key={props.key} className="blog-card mt-4">
        <Link to={"/research/" + props.link}>
          <div className="blog-imgwrapper mb-4">
            {!loaded && <Skeleton animation="wave" width="100%" />}
            <img
              className="blog-imgcard"
              src={props.img}
              alt="blog-imgcard"
              style={loaded ? { display: "block" } : { display: "none" }}
              onLoad={() => setLoaded(true)}
            />
          </div>
        </Link>
        <p>{formatDate(props.date)}</p>
        <Link to={"/research/" + props.link}>
          <h2>{props.title}</h2>
        </Link>
        <p
          dangerouslySetInnerHTML={{
            __html: `${removeTags(decode(props.description))}`,
          }}
        />

        <div className="btn7">
          <Link to={"/research/" + props.link}>
            {lang === "en" ? "READ MORE" : "اقرأ أكثر"}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default BlogCard;
