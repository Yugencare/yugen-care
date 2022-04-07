import DateFnsUtils from "@date-io/date-fns";
import {
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loginUser } from "../../../app/Account/loginUser";
import { changeIndex } from "../../../app/Account/menu";
import { registerUser } from "../../../app/Account/registerUser";
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(0.5),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Raleway",
    "&:focus": {
      boxShadow: `${fade("#9b886c", 0.25)} 0 0 0 0.2rem`,
      borderColor: "#9b886c",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  label: {
    fontFamily: "Raleway",
    fontSize: 18,
    width: "100%",
  },
  root: {
    // width: "100%",
    paddingTop: 20,
    padding: 0,
  },
}));
function getSteps() {
  return ["Step 1", "Step 2", "Step 3"];
}
function getStepsAr() {
  return ["الخطوة 1", "الخطوة 2", " الخطوه 3"];
}

export default function SignupForm({ HandleStep }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [PasswordConfirm, setPasswordConfirm] = useState(null);
  const [IsMatching, setIsMatching] = useState(true);
  const [IsRegistered, setIsRegistered] = useState(false);
  const [Fname, setFname] = useState(null);
  const [Lname, setLname] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { status } = useSelector((state) => state.registerUser);
  const loggedInStatus = useSelector((state) => state.loginUser.status);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { lang } = useSelector((state) => state.lang);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [activeStep, setActiveStep] = useState(0);
  const steps = lang === "en" ? getSteps() : getStepsAr();

  const VerifyEmail = async () => {
    try {
      const response = await axios({
        withCredentials: true,
        method: "Post",
        url: `https://api.yugencare.com/v1/check_email/${Email}`,
      });

      const data = await response.data;
      console.log(data);
      if (!data.is_registered) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsRegistered(false);
      } else {
        setIsRegistered(true);
      }
      // return data;
    } catch (e) {
      console.log(e);
    }
  };
  const handleNext = (event) => {
    event.preventDefault();
    // EMAIL VERIFY
    if (activeStep === 0) {
      VerifyEmail();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const HandleLname = (event) => {
    setLname(event.target.value);
  };
  const HandleFname = (event) => {
    setFname(event.target.value);
  };
  const HandlePassword = (event) => {
    setPassword(event.target.value);
  };
  const HandlePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const HandleEmail = (event) => {
    setEmail(event.target.value);
    if (IsRegistered) {
      setIsRegistered(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const HandleSubmit = (event) => {
    event.preventDefault();
    if (Password === PasswordConfirm) {
      setIsMatching(true);
      dispatch(
        registerUser({
          dob: selectedDate,
          email: Email,
          password: Password,
          first_name: Fname,
          last_name: Lname,
          referral_id: params?.id,
        })
      );
    } else {
      setIsMatching(false);
    }
  };

  // const { isLoggedIn, status } = useSelector((state) => state.loginUser);
  // const history = useHistory();

  const StepOption = () => {
    if (activeStep === 0) {
      return lang === "en" ? "Start" : "ابدأ";
    } else if (activeStep === steps.length - 1) {
      return lang === "en" ? "Finish" : "الانتهاء";
    } else {
      return lang === "en" ? "Next" : "التالي";
    }
  };
  const HandleLogin = () => {
    if (status === "loading") {
      return (
        <div className="LoginProgress">
          <CircularProgress />
        </div>
      );
    } else if (status === "success") {
      if (loggedInStatus === "success") {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };
  const { offlineMenuIndex } = useSelector((state) => state.profileIndex);
  useEffect(() => {
    if (status === "success") {
      dispatch(loginUser({ email: Email, password: Password }));
      dispatch(changeIndex(5));
    }
  }, [status]);

  return (
    <div className="LoginForm text-left">
      {activeStep === 0 ? (
        <Fade in={true} timeout={1000}>
          <form onSubmit={handleNext}>
            <div className="">
              <InputLabel
                className={classes.label}
                required
                shrink={lang === "en" ? true : false}
                style={
                  lang === "en" ? { textAlign: "left" } : { textAlign: "right" }
                }
                htmlFor="bootstrap-input10"
              >
                {lang === "en" ? "Email address" : "البريد الإلكتروني"}
              </InputLabel>
              <BootstrapInput
                name="Username"
                type="email"
                onChange={HandleEmail}
                required
                fullWidth
                id="bootstrap-input10"
              />
            </div>
            {IsRegistered ? (
              <FormHelperText
                style={{ color: "#f44336", fontFamily: "Raleway" }}
                id="component-error-text"
              >
                {lang === "en"
                  ? "This email is already registered"
                  : "عنوان البريد الإلكترونى هذا مسجل"}
              </FormHelperText>
            ) : null}
            <div className="w-100 text-center">
              <button type="submit" className="loginbtn mr-auto ml-auto mt-4">
                <p>{StepOption()}</p>
              </button>

              <div
                className="backbtn d-block mt-2 mr-auto ml-auto"
                style={{ marginBottom: 45 }}
              >
                <p style={{ fontSize: 14 }}>
                  {lang === "en" ? (
                    <>
                      {" "}
                      Already have <br />
                      an account?{" "}
                      <span onClick={() => HandleStep(0)}>Login</span>
                    </>
                  ) : (
                    <>
                      {" "}
                      لديك حساب؟
                      <span onClick={() => HandleStep(0)}> تسجيل الدخول </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </form>
        </Fade>
      ) : null}
      {activeStep === 1 ? (
        <Fade in={true} timeout={1000}>
          <form onSubmit={handleNext}>
            <div className="row signupform">
              {lang === "en" ? (
                <>
                  <div className="col-sm-6 pr-sm-1">
                    <InputLabel
                      className={classes.label}
                      required
                      shrink={lang === "en" ? true : false}
                      style={
                        lang === "en"
                          ? { textAlign: "left" }
                          : { textAlign: "right" }
                      }
                      htmlFor="bootstrapfname-input"
                    >
                      {lang === "en" ? "First name" : "الاسم الاول"}
                    </InputLabel>
                    <BootstrapInput
                      onChange={HandleFname}
                      required
                      fullWidth
                      id="bootstrapfname-input"
                    />
                  </div>
                  <div className="col-sm-6 pl-sm-1 mt-3 mt-sm-0">
                    <InputLabel
                      className={classes.label}
                      required
                      shrink={lang === "en" ? true : false}
                      style={
                        lang === "en"
                          ? { textAlign: "left" }
                          : { textAlign: "right" }
                      }
                      htmlFor="bootstraplname-input"
                    >
                      {lang === "en" ? "Last name" : "الاسم الاخير"}
                    </InputLabel>
                    <BootstrapInput
                      onChange={HandleLname}
                      required
                      fullWidth
                      id="bootstraplname-input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-sm-6 pl-sm-1">
                    <InputLabel
                      className={classes.label}
                      required
                      shrink={lang === "en" ? true : false}
                      style={
                        lang === "en"
                          ? { textAlign: "left" }
                          : { textAlign: "right" }
                      }
                      htmlFor="bootstraplname-input"
                    >
                      {lang === "en" ? "Last name" : "الاسم الاخير"}
                    </InputLabel>
                    <BootstrapInput
                      onChange={HandleLname}
                      required
                      fullWidth
                      id="bootstraplname-input"
                    />
                  </div>
                  <div className="col-sm-6 pr-sm-1 mt-3 mt-sm-0">
                    <InputLabel
                      className={classes.label}
                      required
                      shrink={lang === "en" ? true : false}
                      style={
                        lang === "en"
                          ? { textAlign: "left" }
                          : { textAlign: "right" }
                      }
                      htmlFor="bootstrapfname-input"
                    >
                      {lang === "en" ? "First name" : "الاسم الاول"}
                    </InputLabel>
                    <BootstrapInput
                      onChange={HandleFname}
                      required
                      fullWidth
                      id="bootstrapfname-input"
                    />
                  </div>
                </>
              )}
              <div className="col-sm-12 inputdate">
                <div className="mt-4">
                  <InputLabel
                    className={classes.label}
                    required
                    shrink={lang === "en" ? true : false}
                    style={
                      lang === "en"
                        ? { textAlign: "left" }
                        : { textAlign: "right" }
                    }
                    htmlFor="date-input"
                  >
                    {lang === "en" ? "Date of birth" : "تاريخ الميلاد"}
                  </InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="inline"
                      required
                      style={{ width: "100%", marginTop: 0, marginBottom: 0 }}
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-input"
                      value={selectedDate}
                      inputVariant="outlined"
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <div className="w-100 mb-1 text-center">
                <button type="submit" className="loginbtn mr-auto ml-auto mt-4">
                  <p>{StepOption()}</p>
                </button>
              </div>
            </div>
          </form>
        </Fade>
      ) : null}
      {activeStep === 2 ? (
        <Fade in={true} timeout={1000}>
          <form onSubmit={HandleSubmit}>
            <div className="mt-4">
              <InputLabel
                className={classes.label}
                required
                shrink={lang === "en" ? true : false}
                style={
                  lang === "en" ? { textAlign: "left" } : { textAlign: "right" }
                }
                htmlFor="password-input11"
              >
                {lang === "en" ? "Password" : "كلمة السر"}
              </InputLabel>
              <BootstrapInput
                name="password"
                id="password"
                onChange={HandlePassword}
                required
                fullWidth
                id="password-input11"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {!IsMatching ? (
              <FormHelperText
                style={{ color: "#f44336", fontFamily: "Raleway" }}
                id="component-error-text"
              >
                {lang === "en"
                  ? "Passwords must match"
                  : "يجب أن تتطابق كلمات المرور"}
              </FormHelperText>
            ) : null}
            {Password !== "" && Password !== null
              ? Password.length < 6 && (
                  <FormHelperText
                    style={{ color: "#f44336", fontFamily: "Raleway" }}
                    id="component-error-text"
                  >
                    {lang === "en"
                      ? "Password should be more than 6 characters"
                      : "يجب أن تكون كلمة المرور أكثر من 6 أحرف"}
                  </FormHelperText>
                )
              : null}
            <div className="mt-4">
              <InputLabel
                className={classes.label}
                required
                shrink={lang === "en" ? true : false}
                style={
                  lang === "en" ? { textAlign: "left" } : { textAlign: "right" }
                }
                htmlFor="passwordcheck"
              >
                {lang === "en" ? "Confirm password" : "تأكيد كلمة المرور"}
              </InputLabel>
              <BootstrapInput
                name="passwordcheck"
                required
                onChange={HandlePasswordConfirm}
                fullWidth
                type="password"
              />
            </div>
            <div className="w-100 text-center">
              <button type="submit" className="loginbtn mr-auto ml-auto mt-4">
                <p>{StepOption()}</p>
                {HandleLogin()}
              </button>
            </div>
          </form>
        </Fade>
      ) : null}
      {activeStep === 3 ? (
        <Fade in={true} timeout={1000}>
          {lang === "en" ? (
            <div className="signendform">
              <p>Thank you for becoming the newest member, {Fname}!</p>
              <p>
                Let's set up
                <Link to="/profile"> your profile</Link> to complete your to
                customize your experience!
              </p>
              <div className="w-100 text-center">
                <button type="submit" className="loginbtn mr-auto ml-auto">
                  <Link to="/profile">
                    <p>Continue</p>
                  </Link>
                </button>
              </div>{" "}
            </div>
          ) : (
            <div className="signendform" style={{ textAlign: "right" }}>
              <p>شكرا لك لأنك أصبحت أحدث عضو لنا ،{Fname}!</p>
              <p>
                يرجى زيارة
                <Link to="/profile"> ملف التعريف</Link> لاستكمال المعلومات
                الخاصة بك
              </p>
              <div className="w-100 text-center">
                <button type="submit" className="loginbtn mr-auto ml-auto">
                  <Link to="/profile">
                    <p>{lang === "en" ? "Continue" : "كمل"}</p>
                  </Link>
                </button>
              </div>
            </div>
          )}
        </Fade>
      ) : null}
      <div className="Stepper mt-auto">
        {/* STEPPER */}
        <Stepper
          className={classes.root}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label, idx) => (
            <Step style={{ cursor: "default" }} key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* END OF STEPPER */}
      </div>
    </div>
  );
}
