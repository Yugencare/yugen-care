import React from "react";
import { useSelector } from "react-redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";

export default function SignInOption({
  HandleStep,
  ResponseFacebook,
  ResponseGoogle,
}) {
  const { lang } = useSelector((state) => state.lang);
  return (
    <div className="login-method">
      <div onClick={() => HandleStep(1)} className="loginbtn">
        <p>
          {lang === "en" ? "login with email" : "الدخول بالبريد الإلكتروني"}
        </p>
      </div>
      <div className="loginbtn2 g-icon">
        <GoogleLogin
          clientId="262338656850-c3ak1d6cvg22n5lok07tqctv9ukmdphm.apps.googleusercontent.com"
          onSuccess={ResponseGoogle}
          onFailure={ResponseGoogle}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {lang === "en" ? "continue with google" : "الدخول مع جوجل"}
            </button>
          )}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <div className="loginbtn2 f-icon">
        <FacebookLogin
          appId="1046143845952871"
          fields="first_name,last_name,email"
          callback={ResponseFacebook}
          render={(renderProps) => (
            <button onClick={renderProps.onClick}>
              {lang === "en" ? "continue with facebook" : "الدخول مع الفيسبوك"}
            </button>
          )}
        />
      </div>
      <div className="formlogin-end">
        <p>{lang === "en" ? "Don't have an account?" : "ليس لديك حساب؟"}</p>
        <button onClick={() => HandleStep(2)}>
          {lang === "en" ? "Sign up here" : "سجل هنا"}
        </button>
      </div>
    </div>
  );
}
