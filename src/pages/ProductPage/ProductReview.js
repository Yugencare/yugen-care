import {
  CircularProgress,
  fade,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import DoneIcon from "@material-ui/icons/Done";
import { Alert, Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../app/E-commerce/postreview";

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

export default function ReviewSection({ blog_title, blog_slug, blog_id }) {
  //   const [value, setValue] = useState(2);
  const classes = useStyles();
  const [applied, setApplied] = useState(false);
  const [value, setValue] = useState(5);
  const { isLoggedIn, profile } = useSelector((state) => state.loginUser);
  const { reviews } = useSelector((state) => state.products);
  const { poststatus } = useSelector((state) => state.productpost);
  const [reviewPayload, setReviewPayload] = useState({
    id: blog_id,
    slug: blog_slug,
    title: blog_title,
    rating: value,
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
  const { lang } = useSelector((state) => state.lang);

  // console.log(poststatus);
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

  return (
    <div className="ReviewSection content-block1 position-relative">
      <h2>{lang === "en" ? "Reviews" : "مراجعات المستخدمين"}</h2>
      {reviews?.length === 0 ? (
        <>
          <p>
            {lang === "en"
              ? "There are no reviews yet."
              : "لا توجد تعليقات حتى الآن"}
          </p>
          <p>
            <big>
              {lang === "en"
                ? `Be the first to review “${blog_title}”`
                : ` كن أول من يراجع ` + `“${blog_title}”`}
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
                  <Rating
                    dir="ltr"
                    readOnly
                    size="small"
                    name="half-rating2"
                    precision={0.5}
                    value={review.rating}
                  />
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
                : `اكتب مراجعة ل` + `“${blog_title}”`}
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
        <p className="mt-2"> {lang === "en" ? "Your Rating" : "تقييم عام"}</p>
        <Rating
          dir="ltr"
          name="half-rating"
          precision={0.5}
          value={value}
          onClick={(event) => setValue(event.target.value)}
        />
        <div className="row m-0 mt-4">
          <div
            className={`col-md-12 p-0 mt-4 ${lang === "en" ? "mr-4" : "ml-4"}`}
          >
            <InputLabel required htmlFor="bootstrap-input6">
              {lang === "en" ? "Your Review" : "إضافة مراجعة"}
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
          </div>

          <div
            className={`col-xl-4 p-0 mt-4 ${lang === "en" ? "mr-4" : "ml-4"}`}
          >
            <InputLabel required htmlFor="bootstrap-input7">
              {lang === "en" ? "Name" : "اسم"}
            </InputLabel>
            <BootstrapInput
              onChange={handleChange}
              required
              fullWidth
              // inputProps={style={{height: "auto"}}}
              name="name"
              defaultValue={
                isLoggedIn ? profile.first_name + " " + profile.last_name : ""
              }
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
                {lang === "en" ? "Post Review" : "نشر التقييم"}
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
