import { Divider, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Appointments from "./Appointments";
import Notifications from "./Notifications";
import Orders from "./Orders";
import EditProfile from "./ProfileComponents/EditProfile";
import ProfileMenu from "./ProfileMenu";
import Rewards from "./Rewards";
import Settings from "./Settings";
import { getLoyalty } from "../../../app/Account/loginUser";
import axios from "axios";
import { SetLoyaltyPoints } from "../../../app/Loyalty/loyalty";
import { Helmet } from "react-helmet";

export default function Profile() {
  const dispatch = useDispatch();
  const ProfileIndex = useSelector((state) => state.profileIndex.value);
  const { isLoggedIn, profile, loyalty } = useSelector(
    (state) => state.loginUser
  );
  const { loyaltyPoints } = useSelector((state) => state.loyalty);
  const history = useHistory();
  const [NextTeir, setNextTeir] = useState(null);
  useEffect(() => {
    if (!isLoggedIn) {
      const StoredUser = JSON.parse(localStorage.getItem("user"));
      if (!StoredUser) {
        history.push("/login");
      }
    } else {
      console.log(profile);
      dispatch(getLoyalty({ id: profile.id }));
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    dispatch(SetLoyaltyPoints(parseFloat(loyalty?.loyalty_balance)));
  }, [loyalty]);

  const getNextTeir = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/loyalty/customer-group/remaining/${loyalty?.loyalty_balance}`
    );
    const data = await response.data.data;
    setNextTeir(data);
  };

  useEffect(() => {
    if (loyalty) {
      getNextTeir();
    }
  }, [loyalty]);

  console.log(loyalty);
  const getContent = (index) => {
    switch (index) {
      case 0:
        return <Appointments />;
      case 1:
        return <Orders />;
      case 2:
        return <Rewards />;
      case 3:
        return <Notifications />;
      case 4:
        return <Settings />;
      case 5:
        return <EditProfile profile={profile} />;
      default:
        return console.log("step not found");
    }
  };
  var name = isLoggedIn
    ? `${profile.first_name} ${profile.last_name}`
    : "John Doe";

  return (
    <div className="Profile content-block1 position-relative">
      {isLoggedIn ? (
        <div className="container">
          <Helmet>
            <title>{profile.first_name} | Profile</title>
          </Helmet>
          <Grid container spacing={3}>
            <Grid item md={4} sm={12}>
              <ProfileMenu name={name} />
            </Grid>
            <Grid item md={8} sm={12}>
              {ProfileIndex === 4 || ProfileIndex === 5 ? null : (
                <>
                  <div className="profile-header d-flex justify-content-between">
                    <div>
                      <h2>
                        Hi {profile.first_name?.toLowerCase()}{" "}
                        {profile.last_name?.toLowerCase()},
                      </h2>
                      <p style={{ marginBottom: 3 }}>
                        Welcome &amp; enjoy scrolling!
                      </p>
                      <p>Be the first to know about our latest arrivals!</p>
                    </div>
                    {/* 
                    {loyalty && (
                      <div>
                        <div className="points-block d-none d-sm-flex align-items-end py-3 px-3">
                          <p>Yugen Points &nbsp;&nbsp;&nbsp;</p>
                          <h2>{loyaltyPoints}</h2>
                        </div>
                        <div className="points-block d-block d-sm-none align-items-end py-3 px-3">
                          <p>Yugen Points</p>
                          <h2>{loyaltyPoints}</h2>
                        </div>
                      </div>
                    )} */}
                  </div>
                  {/* <Divider className="my-3" /> */}
                  <div className="TeirRewards">
                    {/* {loyalty?.customer_group_name && (
                      <p>
                        Current Teir:
                        <span className="bg-yugen py-1">
                          {loyalty?.customer_group_name?.customer_group_name}
                        </span>
                      </p>
                    )}
                    {NextTeir && (
                      <p>
                        Points to unlock {NextTeir.name} rewards:{" "}
                        <strong>{NextTeir.Remaining}</strong>
                      </p>
                    )} */}
                  </div>
                </>
              )}

              <div className="profile-content">{getContent(ProfileIndex)}</div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}
