import { Fade } from "@material-ui/core";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { loginFBUser, loginGoogleUser } from "../../../app/Account/loginUser";
import { OfflineMenuIndex } from "../../../app/Account/menu";
import LoginForm from "./LoginForm";
import SignInOption from "./SignInOption";
import SignupForm from "./SignupForm";

export default function LoginAndSignup() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const { offlineMenuIndex } = useSelector((state) => state.profileIndex);
  const { isLoggedIn } = useSelector((state) => state.loginUser);
  const { lang } = useSelector((state) => state.lang);
  useEffect(() => {
    if (params?.id) {
      dispatch(OfflineMenuIndex(2));
    }
    if (location?.pathname === "/signup") {
      dispatch(OfflineMenuIndex(2));
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      history.replace("/profile");
    }
  }, []);
  const HandleStep = (s) => {
    dispatch(OfflineMenuIndex(s));
  };

  const ResponseFacebook = (response) => {
    if (response.accessToken) {
      dispatch(
        loginFBUser({
          token: response.accessToken,
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          fb_id: response.userID,
        })
      );
    } else {
      // TODO: handle failures
    }
  };
  const ResponseGoogle = (response) => {
    // FIXME: needs error handling
    // console.log(response.profileObj);
    try {
      if (response) {
        dispatch(
          loginGoogleUser({
            token: response.accessToken,
            first_name: response.profileObj.givenName,
            last_name: response.profileObj.familyName,
            email: response.profileObj.email,
            g_id: response.profileObj.googleId,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Yugen Login or Signup</title>
        <meta name="description" content="Login to your Account" />
      </Helmet>
      <div
        dir="ltr"
        className="LoginAndSignup content-block3 position-relative"
      >
        <div className="container h-100">
          <div className="row h-100 justify-content-end align-items-center">
            <div className="col-md-6" style={{ paddingTop: 140 }}>
              <Fade timeout={1300} in={offlineMenuIndex === 0}>
                <div
                  style={offlineMenuIndex === 0 ? null : { display: "none" }}
                  className="login-paper text-center"
                >
                  <h2 style={{ textAlign: "center" }}>
                    {lang === "en" ? (
                      <>
                        <span>Login </span>To Your Account
                      </>
                    ) : (
                      <>
                        الدخول <span>تسجيل</span>
                      </>
                    )}
                  </h2>
                  {offlineMenuIndex === 0 && (
                    <SignInOption
                      HandleStep={HandleStep}
                      ResponseFacebook={ResponseFacebook}
                      ResponseGoogle={ResponseGoogle}
                    />
                  )}
                </div>
              </Fade>
              <Fade timeout={1300} in={offlineMenuIndex === 1}>
                <div
                  style={offlineMenuIndex === 1 ? null : { display: "none" }}
                  className="login-paper text-center"
                >
                  <h2>
                    {lang === "en" ? (
                      <>
                        <span>Login </span>To Your Account
                      </>
                    ) : (
                      <>
                        الدخول <span>تسجيل</span>
                      </>
                    )}
                  </h2>
                  {offlineMenuIndex === 1 && (
                    <LoginForm HandleStep={HandleStep} />
                  )}
                </div>
              </Fade>
              <Fade timeout={1300} in={offlineMenuIndex === 2}>
                <div
                  style={offlineMenuIndex === 2 ? null : { display: "none" }}
                  className="login-paper text-center"
                >
                  <h2>
                    {lang === "en" ? (
                      <>
                        <span>Sign up</span> Your Account
                      </>
                    ) : (
                      <>
                        <span>حساب </span>جديد
                      </>
                    )}
                  </h2>
                  {offlineMenuIndex === 2 && (
                    <SignupForm HandleStep={HandleStep} />
                  )}
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
