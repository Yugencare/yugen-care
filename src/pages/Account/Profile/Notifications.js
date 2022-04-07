import { Divider, Fade } from "@material-ui/core";
import React from "react";
import Img from "../../../images/AA1.jpg";

const notifs = [
  {
    image: Img,
    type: "Rewards",
    title: "Pay & Earn 100 Yugen Points",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    image: Img,
    type: "Doctor",
    title: "Meet Our New Doctor",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    image: Img,
    type: "Special Offer",
    title: "10% OFF on Laser Hair Removal",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    image: Img,
    type: "Special Offer",
    title: "20% OFF on Laser Hair Removal",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    image: Img,
    type: "Special Offer",
    title: "10% OFF on Laser Hair Removal",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    image: Img,
    type: "Special Offer",
    title: "10% OFF on Laser Hair Removal",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

export default function Notifications() {
  return (
    <Fade in={true} timeout={700}>
      <div className="Appointments content-block1">
        <h2>My Notifications</h2>
        <Divider />
        <div className="content-block1 d-flex justify-content-center w-100 pt-5 pb-2">
          <p>You have no new notifications.</p>
        </div>
        {/* <div className="notifications-container " id="style-3">
          {notifs.map((not, idx) => (
            <div className="" key={not.id}>
              <div className="row m-0 py-4">
                <div className="col-md-2 col-sm-3">
                  <img src={not.image} alt="" />
                </div>
                <div className="col-md-10 col-sm-9">
                  <p>{not.type}</p>
                  <h2>{not.title}</h2>
                  <p>
                    <span>{not.details}</span>
                  </p>
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div> */}
      </div>
    </Fade>
  );
}
