import { Fade } from "@material-ui/core";
import React from "react";
import FB from "../../../svgs/facebook-inline.svg";
import G from "../../../svgs/search.svg";
import Switch from "./ProfileComponents/Switch";
export default function Settings() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <Fade in={true} timeout={700}>
      <div className="Settings content-block">
        <div className="profile-header">
          <h2>Settings</h2>
        </div>
        <div className="settings-container">
          <div className="row m-0">
            <div className="col-xl-8 pl-0 pr-4">
              {/* <div className="payment-block">
                    <h3>Payment Methods</h3>
                </div> */}
              <div className="socials-block">
                <h3>Social Logins</h3>
                <p>
                  <span>
                    Link social profiles for easier access to your account
                  </span>
                </p>
                <div className="social-icons">
                  <div className="d-flex mt-3">
                    <img src={FB} alt="" />
                    <p>Facebook</p>
                    <button
                      style={{ textDecoration: "underline" }}
                      className="ml-auto"
                    >
                      Connect
                    </button>
                  </div>
                  <div className="d-flex mt-3 mb-3">
                    <img src={G} alt="" />
                    <p>Google</p>
                    <button className="ml-auto">Disconnet</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 pl-0 pr-4 mt-2">
              <div className="socials-block mt-2">
                <h3>Notifications</h3>
                <p>
                  <span>
                    Stay up-to-date with alerts and appointment reminders
                  </span>
                </p>
                <div className="d-flex align-items-center">
                  <p>
                    <strong>Push Notification</strong>
                  </p>
                  <Switch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                  />
                </div>
                <div className="d-flex align-items-center">
                  <p>
                    <strong>Email Notification</strong>
                  </p>
                  <Switch
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-xl-4 p-0">
              <div className="notifications-block mt-2">
                <h3>Notifications</h3>
                <p>Stay up-to-date with alerts and appointment reminders</p>
                <p>
                  <span>Push Notification</span>
                </p>
                <p>
                  <span>Email Notification</span>
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Fade>
  );
}
