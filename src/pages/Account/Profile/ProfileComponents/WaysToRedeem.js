import { Box, CircularProgress, Divider, Fade } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Discount from "../../../../svgs/discount.svg";
import Tooth from "../../../../svgs/tooth.svg";
import Birthday from "../../../../svgs/birthday.svg";
import Gift from "../../../../svgs/custom.svg";
import Like from "../../../../svgs/facebook-like.svg";
import Instagram from "../../../../svgs/instagram-follow.svg";
import Order from "../../../../svgs/order-online.svg";
import Twitter from "../../../../svgs/twitter-follow.svg";
import axios from "axios";
import { Done } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { DeductPoints } from "../../../../app/Loyalty/loyalty";

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
    id: "discount",
    name: Discount,
  },
  {
    id: "tooth",
    name: Tooth,
  },
  {
    id: "custom",
    name: "Custom",
    button: null,
  },
];

export default function WaysToRedeem() {
  const { loyalty, profile } = useSelector((state) => state.loginUser);
  const pointsEarned = loyalty?.loyalty_balance;
  const [Data, setData] = useState([]);
  const getWays = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1//loyalty/rewards/user/${profile.id}`
    );
    const data = await response.data.data;
    console.log(data);
    let arraySorted = data?.sort(
      (a, b) => a.points_required - b.points_required
    );
    setData(arraySorted);
  };

  useEffect(() => {
    getWays();
  }, []);

  const getIcon = (id, item) => {
    const icon = icons.find((item) => item.id === id);
    if (icon.id === "custom") {
      return item.icon && item.icon.length !== 0 && item.icon[0].url;
    } else {
      return icon?.name;
    }
  };

  function Progress({ required, name, image, item }) {
    var percentageEarned = (pointsEarned / required) * 100;
    const [isRedeemed, setisRedeemed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    if (percentageEarned > 100) {
      percentageEarned = 100;
    }

    const HandledRedeem = async (pack) => {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: "https://server.yugencare.com/api/v1/loyalty/redeemed-rewards",
        data: {
          user_id: profile?.id,
          redeemed_id: pack?.id,
          package: pack,
        },
      });
      const data = await response.data.data;
      setIsLoading(false);
      dispatch(DeductPoints(parseFloat(pack.points_required)));
      setisRedeemed(true);
      getWays();
      console.log(data);
    };
    return (
      <div
        style={isRedeemed ? { opacity: "0.4" } : null}
        className="row m-0 my-3"
      >
        <div className="col-1 p-0">
          <img src={image} alt="" />
        </div>
        <div className="col-11 pr-0">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <p>{name}</p>
              <p>
                <span>{required} Points</span>
              </p>
            </div>
            <Box position="relative" display="inline-flex">
              {percentageEarned < 100 ? (
                <>
                  <CircularProgress
                    variant="determinate"
                    value={Math.round(percentageEarned)}
                  />
                  <Box
                    top={19}
                    left={8}
                    bottom={0}
                    right={0}
                    position="absolute"
                  >
                    <p style={{ lineHeight: 0 }}>{`${Math.round(
                      percentageEarned
                    )}%`}</p>
                  </Box>
                </>
              ) : isRedeemed ? (
                <Done />
              ) : isLoading ? (
                <CircularProgress />
              ) : (
                <button onClick={() => HandledRedeem(item)}>Redeem</button>
              )}
            </Box>
          </div>
          <Divider />
        </div>
      </div>
    );
  }

  return (
    <Fade in={true} timeout={600}>
      <div className="WaysToEarn content-block1">
        <div className="row">
          {Data &&
            Data.length !== 0 &&
            Data.map((item) => (
              <div key={item.id} className="col-md-6">
                <Progress
                  item={item}
                  required={item.points_required}
                  name={item.name}
                  image={getIcon(item.icon_name?.value, item)}
                />
              </div>
            ))}
        </div>
      </div>
    </Fade>
  );
}
