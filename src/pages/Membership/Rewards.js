import { Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import WaysToEarn from "../Account/Profile/ProfileComponents/WaysToEarn";
import WaysToRedeem from "../Account/Profile/ProfileComponents/WaysToRedeem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <div> {children} </div>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Rewards() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  return (
    <div
      dir="ltr"
      data-aos="fade"
      data-aos-delay="0"
      data-aos-duration="1000"
      className="MembershipRewards content-block"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <Tabs
              centered
              variant="fullWidth"
              swipe
              TabIndicatorProps={{
                style: { background: "#57bbad", height: 2 },
              }}
              value={value}
              onChange={handleChange}
            >
              <Tab label="WAYS TO EARN" />
              <Tab label="WAYS TO REDEEM" />
            </Tabs>
          </div>
          <div className="col-md-7 mt-4">
            <TabPanel value={value} index={0}>
              <WaysToEarn />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <WaysToRedeem />
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
