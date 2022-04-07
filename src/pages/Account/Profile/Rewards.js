import { Divider, Fade, Collapse } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Rwrd from "../../../images/rewards.png";
import WTE from "../../../images/waystoearn.png";
import WTR from "../../../images/waystoredeem.png";
import Rfrls from "../../../images/referrals.png";
import { ArrowForwardIos } from "@material-ui/icons";
import Redeem from "./ProfileComponents/Redeem";
import WaysToEarn from "./ProfileComponents/WaysToEarn";
import WaysToRedeem from "./ProfileComponents/WaysToRedeem";
import Referrals from "./ProfileComponents/Referrals";
import axios from "axios";
import { useSelector } from "react-redux";

const animateDown = {
  transform: "rotate(0deg)",
  transition: "1s",
  transform: "rotate(90deg)",
};
const animateRight = {
  transform: "rotate(90deg)",
  transition: "1s",
  transform: "rotate(0deg)",
};

export default function Rewards() {
  const [isOpen, setisOpen] = useState([false, false, false, false]);
  const { profile } = useSelector((state) => state.loginUser);

  const handleOpen = (index) => {
    setisOpen((prevOpen) =>
      prevOpen.map((item, idx) =>
        idx === index ? !isOpen[idx] : (isOpen[idx] = false)
      )
    );
  };

  const [Data, setData] = useState([]);
  const getWays = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/loyalty/redeems/user/${profile?.id}`
    );
    const data = await response.data.data;
    console.log(data);
    setData(data);
  };
  useEffect(() => {
    getWays();
  }, []);

  return (
    <Fade in={true} timeout={700}>
      <div className="Rewards content-block1 position-relative">
        <div
          className="my-4 row align-items-start m-0"
          onClick={() => handleOpen(0)}
        >
          <div className="col-1 d-flex align-items-center justify-content-center">
            <img className="" src={Rwrd} alt="" />
          </div>
          <div className="col-10 p-0">
            <p
              className="cursor-pointer1"
              style={isOpen[0] ? { fontWeight: 600 } : null}
            >
              My Rewards
            </p>
            {Data.length !== 0 ? (
              <p>
                <span>
                  You have {Data.length} reward
                  {Data.length > 1 ? "s" : ""} available
                </span>
              </p>
            ) : null}
          </div>
          <div className="col-1">
            {isOpen[0] ? (
              <ArrowForwardIos style={animateDown} />
            ) : (
              <ArrowForwardIos style={animateRight} />
            )}
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-11 pr-5">
            <Collapse in={isOpen[0]} timeout={1000}>
              {Data &&
                Data.length !== 0 &&
                Data.map((reward, idx) => (
                  <div key={reward.id} className="rewards_collapse mt-3">
                    <div className="d-flex justify-content-between">
                      <p>{reward.package.name} </p>

                      <Redeem reward={reward.package} />
                    </div>
                    <span>
                      <p>Worth {reward.package.points_required} Points</p>
                    </span>
                  </div>
                ))}
            </Collapse>
          </div>
        </div>
        <Divider style={{ backgroundColor: "#b7b7b7" }} />
        <div
          className="my-4 row align-items-start m-0"
          onClick={() => handleOpen(1)}
        >
          <div className="col-1 d-flex align-items-center justify-content-center">
            <img className="" src={WTE} alt="" />
          </div>
          <div className="col-10 p-0">
            <p
              className="cursor-pointer1"
              style={isOpen[1] ? { fontWeight: 600 } : null}
            >
              Ways To Earn
            </p>
            {/* OPTIONAL TEXT HERE */}
          </div>
          <div className="col-1">
            {isOpen[1] ? (
              <ArrowForwardIos style={animateDown} />
            ) : (
              <ArrowForwardIos style={animateRight} />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Collapse in={isOpen[1]} timeout={1000}>
              <WaysToEarn />
            </Collapse>
          </div>
        </div>
        <Divider style={{ backgroundColor: "#b7b7b7" }} />
        <div
          className="my-4 row align-items-start m-0"
          onClick={() => handleOpen(2)}
        >
          <div className="col-1 d-flex align-items-center justify-content-center">
            <img className="" src={WTR} alt="" />
          </div>
          <div className="col-10 p-0">
            <p
              className="cursor-pointer1"
              style={isOpen[2] ? { fontWeight: 600 } : null}
            >
              Ways To Redeem
            </p>
            {/* OPTIONAL TEXT HERE */}
          </div>
          <div className="col-1">
            {isOpen[2] ? (
              <ArrowForwardIos style={animateDown} />
            ) : (
              <ArrowForwardIos style={animateRight} />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Collapse in={isOpen[2]} timeout={1000}>
              <WaysToRedeem />
            </Collapse>
          </div>
        </div>
        <Divider style={{ backgroundColor: "#b7b7b7" }} />
        <div
          className="my-4 row align-items-start m-0"
          onClick={() => handleOpen(3)}
        >
          <div className="col-1 d-flex align-items-center justify-content-center">
            <img className="" src={Rfrls} alt="" />
          </div>
          <div className="col-10 p-0">
            <p
              className="cursor-pointer1"
              style={isOpen[3] ? { fontWeight: 600 } : null}
            >
              Referrals
            </p>
            {/* OPTIONAL TEXT HERE */}
          </div>
          <div className="col-1">
            {isOpen[3] ? (
              <ArrowForwardIos style={animateDown} />
            ) : (
              <ArrowForwardIos style={animateRight} />
            )}
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-11 pr-5">
            <Collapse in={isOpen[3]} timeout={1000}>
              <Referrals />
            </Collapse>
          </div>
        </div>
        <Divider style={{ backgroundColor: "#b7b7b7" }} />
      </div>
    </Fade>
  );
}
