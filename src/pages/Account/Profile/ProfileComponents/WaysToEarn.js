import { Divider, Fade } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Birthday from "../../../../svgs/birthday.svg";
import Gift from "../../../../svgs/custom.svg";
import Like from "../../../../svgs/facebook-like.svg";
import Instagram from "../../../../svgs/instagram-follow.svg";
import Order from "../../../../svgs/order-online.svg";
import Twitter from "../../../../svgs/twitter-follow.svg";

const icons = [
  {
    id: "shopping_basket",
    name: Order,
    button: null,
  },
  {
    id: "gift",
    name: Gift,
    button: null,
  },
  {
    id: "twitter",
    name: Twitter,
    button: "Follow",
  },
  {
    id: "instagram",
    name: Instagram,
    button: "Follow",
  },
  {
    id: "birthday",
    name: Birthday,
    button: null,
  },
  {
    id: "facebook",
    name: Like,
    button: "like",
  },
  {
    id: "custom",
    name: "Custom",
    button: null,
  },
];

export default function WaysToEarn() {
  const [Data, setData] = useState([]);
  const getWays = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1//loyalty/ways`
    );
    const data = await response.data.data;
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getWays();
  }, []);

  const getIcon = (id) => {
    const icon = icons.find((item) => item.id === id);
    return icon;
  };

  return (
    <Fade in={true} timeout={600}>
      <div className="WaysToEarn content-block1">
        <div className="row">
          {Data &&
            Data.length !== 0 &&
            Data.map((earn, i) => (
              <div key={earn.id} className="col-md-6">
                <div className="row m-0 my-3">
                  <div className="col-1 p-0">
                    <img src={getIcon(earn.icon_name?.value)?.name} alt="" />
                  </div>
                  <div className="col-11 pr-0">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <p>{earn.title_field}</p>
                        <p>
                          <span>{earn.points_field}</span>
                        </p>
                      </div>
                      {getIcon(earn.icon_name?.value)?.button && (
                        <button>
                          {getIcon(earn.icon_name?.value)?.button}
                        </button>
                      )}
                    </div>
                    <Divider />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fade>
  );
}
