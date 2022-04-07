import {
  Checkbox,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../app/Account/loginUser";
import { clearSignup } from "../../../app/Account/registerUser";
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
  },
}));

export default function LoginForm({ HandleStep }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);

  const HandlePassword = (event) => {
    setPassword(event.target.value);
  };
  const HandleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const HandleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: Email, password: Password }));
  };

  const dispatch = useDispatch();
  const { isLoggedIn, status } = useSelector((state) => state.loginUser);
  const isRegistered = useSelector((state) => state.registerUser.status);
  const { lang } = useSelector((state) => state.lang);
  const history = useHistory();
  useEffect(() => {
    if (isLoggedIn && isRegistered === "success") {
      dispatch(clearSignup());
    } else if (isLoggedIn) {
      // dispatch(getPatientData());
      history.push("/profile");
    }
  }, [isLoggedIn]);

  return (
    <form
      dir={lang === "en" ? "ltr" : "rtl"}
      onSubmit={HandleSubmit}
      className="LoginForm text-left"
    >
      <div className="">
        <InputLabel
          className={classes.label}
          required
          shrink={lang === "en" ? true : false}
          style={lang === "en" ? { textAlign: "left" } : { textAlign: "right" }}
          htmlFor="bootstrap-input1"
        >
          {lang === "en" ? "Email address" : "البريد الإلكتروني"}
        </InputLabel>
        <BootstrapInput
          name="Username"
          type="email"
          onChange={HandleEmail}
          required
          fullWidth
          id="bootstrap-input1"
          aria-describedby="component-error-text"
        />
        {status === "wrong" ? (
          <FormHelperText
            style={{ color: "#f44336", fontFamily: "Raleway" }}
            id="component-error-text"
          >
            {lang === "en"
              ? "Email or password is wrong"
              : "البريد الإلكتروني أو كلمة المرور خاطئة"}
          </FormHelperText>
        ) : null}
        {status === "failed" ? (
          <FormHelperText
            style={{ color: "#f44336", fontFamily: "Raleway" }}
            id="component-error-text"
          >
            {lang === "en" ? "Something went wrong" : "حدث شيء خطأ"}
          </FormHelperText>
        ) : null}
      </div>
      <div className="mt-4">
        <InputLabel
          className={classes.label}
          required
          shrink={lang === "en" ? true : false}
          style={lang === "en" ? { textAlign: "left" } : { textAlign: "right" }}
          htmlFor="password"
        >
          {lang === "en" ? "Password" : "كلمه السر"}
        </InputLabel>
        <BootstrapInput
          id="password"
          onChange={HandlePassword}
          required
          fullWidth
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
      <div className="d-flex align-items-center mt-3">
        <Checkbox style={{ paddingLeft: 0 }} />
        <p className="mb-0 mt-1" style={{ fontFamily: "Raleway" }}>
          {lang === "en" ? "Remember me" : "تذكرنى"}
        </p>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-4">
        <div
          onClick={() => HandleStep(0)}
          className="backbtn d-flex ml-1"
          style={{ marginRight: 50, cursor: "pointer" }}
        >
          <p> {lang === "en" ? "Back" : "ارجع"}</p>
        </div>

        <button type="submit" className="loginbtn">
          <p>{lang === "en" ? "Login" : "تسجيل الدخول"}</p>
          {status === "loading" ? (
            <div className="LoginProgress">
              <CircularProgress />
            </div>
          ) : null}
        </button>
      </div>
    </form>
  );
}
