import {
  CircularProgress,
  fade,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import DoneIcon from "@material-ui/icons/Done";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../app/Blogs/postreview";

// import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#cab891",
    margin: 0,
  },
}));
const BootstrapInput = withStyles((theme) => ({
  root: {},
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    borderBottom: "1px solid #ced4da",
    fontSize: "14px",
    width: "100%",
    padding: "12px 12px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Raleway",

    "&:focus": {
      boxShadow: `${fade("#57bbad", 0.1)} 0 0.3rem 0 0`,
      borderColor: "#57bbad",
    },
  },
}))(InputBase);

export default function ReviewSection({
  blog_title,
  blog_slug,
  blog_id,
  reviews,
}) {
  //   const [value, setValue] = useState(2);
  const classes = useStyles();
  const [applied, setApplied] = useState(false);
  const { isLoggedIn, profile } = useSelector((state) => state.loginUser);
  const { poststatus } = useSelector((state) => state.post);
  const [reviewPayload, setReviewPayload] = useState({
    id: blog_id,
    slug: blog_slug,
    title: blog_title,
    email: isLoggedIn ? profile.email : "",
    name: isLoggedIn ? profile.first_name + " " + profile.last_name : "",
    message: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
  const HandleSubmit = (event) => {
    event.preventDefault();
    setApplied(!applied);
    // console.log(reviewPayload);
    dispatch(postReview(reviewPayload));
  };
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strTime = `${hours}:${minutes} ${ampm}`;

    return strTime;
  };

  const ReviewDate = (date) => {
    var jsondate = new Date(date);
    //Getting Day
    var day = jsondate.getDate();
    // Getting Month
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oc",
      "Nov",
      "Dec",
    ][jsondate.getMonth()];
    //Geting Year
    const year = jsondate.getFullYear();

    const time = formatAMPM(jsondate);
    var parsedDate = `${month} ${day}, ${year} at ${time} `;
    return parsedDate;
  };

  useEffect(() => {
    if (poststatus === "success") {
      setReviewPayload({
        id: blog_id,
        slug: blog_slug,
        title: blog_title,
        email: isLoggedIn ? profile.email : "",
        name: isLoggedIn ? profile.first_name + " " + profile.last_name : "",
        message: "",
      });
    }
  }, [poststatus]);
  const { lang } = useSelector((state) => state.lang);
  return (
    <div className="ReviewSection content-block1 position-relative">
      <h2>{lang === "en" ? "Reviews" : "المراجعات"}</h2>
      {reviews?.length === 0 ? (
        <>
          <p>
            {" "}
            {lang === "en"
              ? "There are no reviews yet."
              : "لا توجد تعليقات حتى الآن"}
          </p>
          <p>
            <big>
              {lang === "en"
                ? `Be the first to review “${blog_title}”`
                : ` كن أول من يعلق على` + `“${blog_title}”`}
            </big>
          </p>
          <p>
            {lang === "en"
              ? "Your email address will not be published."
              : "لن ينشر عنوان بريدك الإلكتروني"}
          </p>
        </>
      ) : (
        <>
          {reviews?.map((review, idx) => (
            <div key={review.id} className="reviewdiv mb-4">
              <div className="d-flex reviewperson">
                <div style={{ paddingTop: 5 }}>
                  <p>
                    <span>{review.from.name}</span>
                  </p>
                  <p>
                    <small>{ReviewDate(review.createdAt)}</small>
                  </p>
                </div>
              </div>
              <div>
                <p className="mt-3">{review.message}</p>
              </div>
            </div>
          ))}
          <p className="mt-5">
            <big>
              {lang === "en"
                ? `Write a review for “${blog_title}”`
                : `اكتب تعليق ل` + `“${blog_title}”`}
            </big>
          </p>
          <p>
            {" "}
            {lang === "en"
              ? "Your email address will not be published."
              : "لن ينشر عنوان بريدك الإلكتروني"}
          </p>
        </>
      )}

      <form className="review-form" onSubmit={HandleSubmit}>
        {/* <p className="mt-2">Your Rating</p>
        <Rating
          name="simple-controlled"
          value={value}
          className={classes.root}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        /> */}

        <div className="row m-0 mt-4">
          <div
            className={`col-md-12 p-0 mt-4 ${lang === "en" ? "mr-4" : "ml-4"}`}
          >
            <InputLabel required htmlFor="bootstrap-input6">
              {lang === "en" ? "Your Review" : "مراجعتك"}
            </InputLabel>
            <BootstrapInput
              name="message"
              onChange={handleChange}
              multiline
              required
              fullWidth
              value={reviewPayload.message}
              id="bootstrap-input6"
            />
          </div>
          {poststatus === "success" && (
            <Alert className="mt-3" severity="success">
              {lang === "en" ? (
                <>
                  {" "}
                  <p>Review submitted - Thank you!</p>
                  <p>
                    <small>
                      We're processing your review. This might take several
                      days, so we appreciate your patience.
                    </small>
                  </p>
                </>
              ) : (
                <>
                  {" "}
                  <p>تم إرسال التقييم - شكراً لك!</p>
                  <p>
                    <small>
                      نقوم الآن بمعالجة مراجعتك. قد يستغرق هذا الأمر عدة أيام،
                      لذلك نقدّر لك صبرك.
                    </small>
                  </p>{" "}
                </>
              )}
            </Alert>
          )}
          <div
            className={`col-xl-4 p-0 mt-4 ${lang === "en" ? "mr-4" : "ml-4"}`}
          >
            <InputLabel required htmlFor="bootstrap-input7">
              {lang === "en" ? "Name" : "اسم"}
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              required
              defaultValue={
                isLoggedIn ? profile.first_name + " " + profile.last_name : ""
              }
              fullWidth
              name="name"
              id="bootstrap-input7"
            />
          </div>
          <div className="col-xl-4 p-0 mr-4 pt-4">
            <InputLabel required htmlFor="bootstrap-input8">
              {lang === "en" ? "Email" : "بريد الالكتروني"}
            </InputLabel>
            <BootstrapInput
              name="email"
              onChange={handleChange}
              required
              defaultValue={isLoggedIn ? profile.email : ""}
              fullWidth
              id="bootstrap-input8"
            />
          </div>
          <div className="col-xl-3 d-flex align-items-end p-0 pt-4">
            {poststatus !== "loading" && (
              <button type="submit" className="btn2 position-relative">
                {lang === "en" ? "Comment" : "علق"}
              </button>
            )}
            <div className="post-submited">
              {poststatus === "loading" && <CircularProgress />}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
