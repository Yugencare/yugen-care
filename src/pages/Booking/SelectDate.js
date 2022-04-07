import {
  Divider,
  Fade,
  IconButton,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { ArrowBack, ArrowForward, ArrowForwardIos } from "@material-ui/icons";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeslots, SelectTime } from "../../app/Booking/timeslots";
import LoadingCircle from "./LoadingCircle";

const YugenRadio = withStyles({
  root: {
    color: "#57bbad ",
    "&$checked": {
      color: "#57bbad ",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const scrollableButtons = (props, TimeAndDates) => {
  if (TimeAndDates.length === 1) {
    return null;
  }
  if (props.direction === "left") {
    return (
      <IconButton {...props}>
        <ArrowBack />
      </IconButton>
    );
  } else if (props.direction === "right") {
    return (
      <IconButton {...props}>
        <ArrowForward />
      </IconButton>
    );
  } else {
    return null;
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  tab: {
    maxHeight: 400,
    overflow: "auto",
    paddingRight: 20,
    marginTop: 10,
  },
  tabs: {
    background: "#fff",
    fontFamily: "Raleway",
  },
}));

function SelectDate() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const activeTab = useRef();

  const dispatch = useDispatch();
  const { timeslots } = useSelector((state) => state.timeslots);
  const { status } = useSelector((state) => state.timeslots);
  const { Selectedtime } = useSelector((state) => state.timeslots);
  const { SelectedDoctor } = useSelector((state) => state.doctors);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    activeTab.current?.focus();

    dispatch(getTimeslots({ id: SelectedDoctor.doctor_id }));
  }, [dispatch]);

  // if (timeslots === undefined) {
  //   dispatch(getTimeslots({ id: SelectedDoctor.doctor_id }));
  // }
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const sortDateTime = () => {
    var TimeAndDates = [];
    try {
      var test = timeslots;

      var prev_day = null;
      var prev_month = null;
      var prev_year = null;
      var elementIndex = 0;
      test?.map((time, index) => {
        var jsondate = new Date(time);
        var day = jsondate.getDate();
        var month = jsondate.toLocaleString("default", { month: "long" });
        var weekday = dayNames[jsondate.getDay()];
        var year = jsondate.getFullYear();
        var slot = formatAMPM(jsondate);
        // pushing first element
        if (index === 0) {
          TimeAndDates.push({
            y: year,
            m: month,
            d: day,
            wd: weekday,
            slots: [slot],
            timestamps: [time],
          });
        } else {
          if (day === prev_day && month === prev_month && year === prev_year) {
            TimeAndDates[elementIndex].slots.push(slot);
            TimeAndDates[elementIndex].timestamps.push(time);
          } else {
            TimeAndDates.push({
              y: year,
              m: month,
              d: day,
              wd: weekday,
              slots: [slot],
              timestamps: [time],
            });
            elementIndex = elementIndex + 1;
          }
        }
        prev_day = day;
        prev_month = month;
        prev_year = year;
      });

      return TimeAndDates;
    } catch (e) {
      console.log(e);
    }
  };
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strTime = `${hours}:${minutes} ${ampm}`;

    return strTime;
  };

  var TimeAndDates = [];
  if (status === "success") {
    TimeAndDates = sortDateTime();
  }
  console.log(TimeAndDates);

  const TabLabel = (name, time, idx) => {
    return (
      <div className="LabelContainer">
        <p style={idx === value ? { color: "#fff" } : null}>{name}</p>
        <p style={idx === value ? { color: "#fff" } : null}>{time}</p>
      </div>
    );
  };

  const UpdateSelectedDate = (payload) => {
    console.log(payload);
    dispatch(SelectTime(payload));
  };
  console.log(timeslots);
  return status === "success" &&
    timeslots !== undefined &&
    timeslots.status !== 400 ? (
    <Fade in={true} timeout={1000}>
      <div className="SelectDate">
        <p className="mb-3" style={{ textTransform: "uppercase" }}>
          {TimeAndDates ? TimeAndDates[value]?.m : null}
        </p>
        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            ScrollButtonComponent={(props) =>
              scrollableButtons(props, TimeAndDates)
            }
            textColor="primary"
            aria-label="scrollable force tabs example"
            className={classes.tabs}
            TabIndicatorProps={{
              style: { height: 0 },
            }}
          >
            {TimeAndDates?.map((tab, idx) => (
              <Tab
                key={tab.id}
                ref={idx === 0 ? activeTab : null}
                label={TabLabel(tab.wd, tab.d, idx)}
                {...a11yProps(idx)}
                style={
                  idx === value
                    ? { background: "#90d3ca", border: "1px solid #90d3ca" }
                    : null
                }
              />
            ))}
          </Tabs>

          {TimeAndDates.map((tab, idx) => (
            <TabPanel
              className={classes.tab}
              key={tab.id}
              value={value}
              index={idx}
              id="style-3"
            >
              <Fade in={idx === value} timeout={1000}>
                <RadioGroup aria-label="timeslots" name="timeslots">
                  <Divider className="mt-2" />
                  {tab.slots.map((slot, index) => (
                    <>
                      <div
                        key={slot.id}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          UpdateSelectedDate(
                            TimeAndDates[idx].timestamps[index]
                          )
                        }
                        className="d-flex align-items-center py-4"
                      >
                        <div className="pr-5">
                          <YugenRadio
                            value={TimeAndDates[idx].timestamps[index]}
                            icon={<CircleUnchecked />}
                            checkedIcon={<CircleCheckedFilled />}
                            style={{ padding: 0 }}
                            onClick={() =>
                              UpdateSelectedDate(
                                TimeAndDates[idx].timestamps[index]
                              )
                            }
                            checked={
                              Selectedtime ===
                              TimeAndDates[idx].timestamps[index]
                            }
                          />
                        </div>
                        <div className="p-2">
                          <p>{slot}</p>
                        </div>
                        <div className="ml-auto p-2">
                          <ArrowForwardIos
                            fontSize="small"
                            style={{ fill: "#d3d3d3" }}
                          />
                        </div>
                      </div>
                      <Divider />
                    </>
                  ))}
                </RadioGroup>
              </Fade>
            </TabPanel>
          ))}
        </div>
      </div>
    </Fade>
  ) : status !== "success" || timeslots.status !== 400 ? (
    <LoadingCircle step="Finding available times..." />
  ) : (
    <h2>No available times found</h2>
  );
}
export default SelectDate;
