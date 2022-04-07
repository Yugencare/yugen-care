import { Fade, Radio, RadioGroup } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeStep } from "../../app/Booking/department";
import { getDoctors, UseDoctor } from "../../app/Booking/doctors";
import { DeselectTime } from "../../app/Booking/timeslots";
import LoadingCircle from "./LoadingCircle";
const _ = require("lodash");
const YugenRadio = withStyles({
  root: {
    color: "#57bbad ",
    "&$checked": {
      color: "#57bbad ",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function SelectDoctor() {
  const [selectedValue, setSelectedValue] = useState("a");
  const [Services, setServices] = useState([]);

  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  const { status } = useSelector((state) => state.doctors);
  const { SelectedDoctor } = useSelector((state) => state.doctors);
  const { departmentSelected } = useSelector((state) => state.departments);

  const handleChange = (event, payload, service) => {
    setSelectedValue(event.target.value);
    dispatch(DeselectTime());
    dispatch(UseDoctor({ payload, service }));
  };
  useEffect(() => {
    if (status !== "success" || SelectedDoctor === null) {
      dispatch(getDoctors({ id: departmentSelected.dept_id }));
    }
    getSubservices();
  }, [dispatch]);
  useEffect(() => {
    if (doctors && doctors.length !== 0) {
      dispatch(UseDoctor(doctors[0]));
      dispatch(ChangeStep(2));
    }
  }, [doctors]);
  const { registeration_data } = useSelector((state) => state.saveprofile);
  const { details } = useSelector((state) => state.loginUser);
  console.log(registeration_data);
  console.log(details);

  const getSubservices = async () => {
    const response = await axios({
      withCredentials: true,
      method: "GET",
      // url: "https://api.yugencare.com/v1/booking/scheduler",
      url: "https://api.yugencare.com/v1/booking/services",
    });
    const departments = await response.data.data;
    if (departments) {
      const uniqueDepartments = _.uniqBy(departments, "department_id");
      if (uniqueDepartments) {
        const sorted = [];
        for (let i = 0; i < uniqueDepartments?.length; i++) {
          let object = {
            department: uniqueDepartments[i].department,
            service: [],
          };
          for (let j = 0; j < departments?.length; j++) {
            if (uniqueDepartments[i].department === departments[j].department) {
              object.service.push(departments[j]);
            }
          }
          sorted.push(object);
        }
        const ServiceSorted = _.uniqBy(sorted[0].service, "department_id");
        console.log("uniqueDepartments", uniqueDepartments);
        console.log("sorted", sorted);
        console.log("ServiceSorted", ServiceSorted);

        setServices(sorted[0].service);
      }
    }
  };

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
            className="SelectDoctor"
          >
            {/* <RadioGroup aria-label="doctor" name="doctors">
              {doctors &&
                Services.length !== 0 &&
                doctors.map((doctor, i) => (
                  <div
                    key={doctor.id}
                    className="d-flex align-items-center"
                    style={{ marginLeft: "-12px" }}
                  >
                    <div className=" pr-4">
                      <YugenRadio
                        checked={
                          selectedValue === `${doctor.doctor_name}` ||
                          SelectedDoctor?.doctor_name === doctor.doctor_name
                        }
                        value={`${doctor.doctor_name}`}
                        name={`${doctor.doctor_name}`}
                        onChange={(e) => handleChange(e, doctor)}
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                      />
                    </div>
                    <div className="pr-4">
                      <p>{doctor.doctor_name}</p>
                    </div>
                  </div>
                ))}
            </RadioGroup> */}
            <RadioGroup aria-label="doctor" name="doctors">
              {doctors &&
                Services.length !== 0 &&
                Services.map((doctor, i) => (
                  <div
                    key={doctor.id}
                    className="d-flex align-items-center"
                    style={{ marginLeft: "-12px" }}
                  >
                    <div className=" pr-4">
                      <YugenRadio
                        checked={
                          selectedValue ===
                            `${doctors[i % doctors.length].doctor_name}` ||
                          SelectedDoctor?.id === doctor.id
                        }
                        // value={`${doctors[i % doctors.length].doctor_name}`}
                        // name={`${doctors[i % doctors.length].doctor_name}`}
                        onChange={(e) =>
                          handleChange(e, doctors[i % doctors.length], doctor)
                        }
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                      />
                    </div>
                    <div className="pr-4">
                      <p>{doctor.name}</p>
                    </div>
                  </div>
                ))}
            </RadioGroup>
          </div>
        </Fade>
      ) : (
        <LoadingCircle step="Getting services..." />
      )}
    </>
  );
}
export default SelectDoctor;
