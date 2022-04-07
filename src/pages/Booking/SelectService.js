import { Fade, Radio, RadioGroup } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeStep,
  DeSelectDepartment,
  getDepartments,
  SelectDepartment,
} from "../../app/Booking/department";
import { DeselectDoctor } from "../../app/Booking/doctors";
import { getProfileData } from "../../app/Booking/profileData";
import { DeselectTime } from "../../app/Booking/timeslots";
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

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: 0,
    paddingTop: 13.5,
    paddingBottom: 13.5,
    justifyContent: "space-between",
    display: "flex",
    paddingRight: 35,
  },
  iconRotate: {
    transform: "rotate(90deg)",
    fill: " rgb(197 194 194)",
  },
  iconBlue: {
    fill: "#57bbad",
  },
}));

function SelectService() {
  const classes = useStyles();
  const [open, setOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleClick = (index) => {
    // setOpen(!open)
    setOpen((prevState) =>
      prevState.map((item, idx) =>
        idx === index ? !open[idx] : (open[idx] = false)
      )
    );
  };
  const [selectedValue, setSelectedValue] = useState("a");

  const dispatch = useDispatch();
  const { departments, departmentSelected } = useSelector(
    (state) => state.departments
  );
  const { status } = useSelector((state) => state.departments);
  useEffect(() => {
    if (status !== "success") {
      dispatch(getDepartments());
      dispatch(getProfileData());
    }
  }, [dispatch]);

  const handleChange = (payload) => {
    // setSelectedValue(event.target.value);
    setSelectedValue(payload);
    console.log(payload);
    dispatch(DeselectTime());
    dispatch(DeselectDoctor());
    dispatch(DeSelectDepartment(payload));

    setTimeout(() => {
      dispatch(SelectDepartment(payload));
    }, 100);
    setTimeout(() => {
      dispatch(ChangeStep(1));
    }, 250);
  };
  const filterByDepartment = () => {};
  const { registeration_data } = useSelector((state) => state.saveprofile);
  const { details } = useSelector((state) => state.loginUser);
  console.log(registeration_data);
  console.log(details);

  return (
    <>
      {status === "success" ? (
        <Fade in={true} timeout={1000}>
          <div
            style={{
              maxHeight: 425,
              overflow: "auto",
              overflowX: "hidden",
            }}
            id="style-3"
            className="SelectService position-relative"
          >
            <RadioGroup aria-label="department" name="departments">
              {departments.map((service, idx) => (
                <>
                  <ListItem
                    key={service.id}
                    className={classes.list}
                    button
                    onClick={() => handleChange(service)}
                  >
                    <p
                      style={
                        open[idx] ? { fontWeight: "900" } : { fontWeight: 400 }
                      }
                    >
                      {service.department}
                    </p>
                    <ExpandLess className={classes.iconRotate} />
                    {/* {open[idx] ? (
                      <ExpandMore className={classes.iconBlue} />
                    ) : (
                      <ExpandLess className={classes.iconRotate} />
                    )} */}
                  </ListItem>
                  {/* <Collapse in={open[idx]} timeout={1000}>
                    <List disablePadding>
                      <div className="serviceschlist">
                        {service.service.map((serv) => (
                          <div className="d-flex align-items-start">
                            <div className=" p-2">
                              <YugenRadio
                                value={`${
                                  service.name === ""
                                    ? "Unnamed specialisation"
                                    : service.name
                                }`}
                                name={`${
                                  service.name === ""
                                    ? "Unnamed specialisation"
                                    : service.name
                                }`}
                                onChange={(e) => handleChange(e, service)}
                                checked={
                                  selectedValue ===
                                    `${
                                      service.name === ""
                                        ? "Unnamed specialisation"
                                        : service.name
                                    }` ||
                                  departmentSelected?.name === service.name
                                }
                                icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />}
                              />
                            </div>
                            <div className="p-2">
                              <p>
                                {service.name === ""
                                  ? "Unnamed specialisation"
                                  : service.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </List>
                  </Collapse> */}
                  <Divider />
                </>
              ))}
            </RadioGroup>
          </div>
        </Fade>
      ) : (
        <LoadingCircle step="Getting departments..." />
      )}
    </>
  );
}
export default SelectService;
