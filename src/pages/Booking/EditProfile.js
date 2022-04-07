import DateFnsUtils from "@date-io/date-fns";
import {
  CircularProgress,
  Divider,
  Fade,
  NativeSelect,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { fade, withStyles } from "@material-ui/core/styles";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import MuiAlert from "@material-ui/lab/Alert";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setDetails,
  setHasDetails,
  setMr_no,
} from "../../app/Account/loginUser";
import { SaveProfile } from "../../app/Account/selfRegistration";
import { ChangeStep } from "../../app/Booking/department";
import { getProfileData } from "../../app/Booking/profileData";

function Alert(props) {
  return (
    <MuiAlert
      elevation={6}
      variant="outlined"
      {...props}
      severity="warning"
      color="info"
    />
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>

      <h2>{`${Math.round(props.value)}%`}</h2>
    </Box>
  );
}
const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Raleway",
    "&:focus": {
      boxShadow: `${fade("#57bbad", 0.25)} 0 0 0 0.2rem`,
      borderColor: "#57bbad",
    },
  },
}))(InputBase);
const YugenRadio = withStyles({
  root: {
    color: "#57bbad ",
    "&$checked": {
      color: "#57bbad ",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function EditProfile() {
  const dispatch = useDispatch();
  const { bookingdata } = useSelector((state) => state.bookingdata);
  const { details, HasDetails, profile, isLoggedIn } = useSelector(
    (state) => state.loginUser,
  );

  const { status } = useSelector((state) => state.saveprofile);
  const { ActiveStep } = useSelector((state) => state.departments);
  const { registeration_data } = useSelector((state) => state.saveprofile);
  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);

  console.log(details);
  console.log(status === "success" && details !== undefined);

  const [Fname, setFname] = useState(profile?.first_name);
  const [Lname, setLname] = useState(profile?.last_name);
  const [Mname, setMname] = useState(details?.middle_name);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [PhoneNo, setPhoneNo] = useState(details?.patient_phone);
  const [Email, setEmail] = useState(profile?.email);
  const [Address, setAddress] = useState(details?.patient_address);
  const [Salutaions, setSalutaions] = useState(
    details?.salutation
      ? details?.salutation
      : bookingdata?.allSalutations
      ? bookingdata?.allSalutations[0].salutation_id
      : "SALU0001",
  );
  const [PatientCat, setPatientCat] = useState(
    details?.patient_category_id ? details?.patient_category_id : 1,
  );
  const [Country, setCountry] = useState(details?.country);
  const [City, setCity] = useState(details?.patient_city);
  const [State, setState] = useState(details?.patient_state);
  const [Gender, setGender] = useState(details?.patient_gender);
  const [GovID, setGovID] = useState(details?.government_identifier);
  const [EID, setEID] = useState(
    details?.identifier_id ? details?.identifier_id : "5",
  );
  const [PrefLan, setPrefLan] = useState("en");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };

  const HandleFnameChange = (event) => {
    setFname(event.target.value);
  };
  const HandleLnameChange = (event) => {
    setLname(event.target.value);
  };
  const HandleMnameChange = (event) => {
    setMname(event.target.value);
  };
  const HandlePhoneNoChange = (event) => {
    setPhoneNo(event.target.value);
  };
  const HandleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const HandleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const HandleGovIDChange = (event) => {
    console.log(event.target.value);
    setGovID(event.target.value);
  };

  const [GovIsvalid, setGovIsvalid] = useState(false);

  const OnGovBlur = () => {
    if (GovID[GovID.length - 1] === "_") {
      setGovIsvalid(true);
    } else {
      setGovIsvalid(false);
    }
  };

  const HandlePrefLanChange = (event) => {
    setPrefLan(event.target.value);
  };
  const handleChangePC = (event) => {
    const value = event.target.value;
    setPatientCat(value);
  };
  const handleChangeSal = (event) => {
    const value = event.target.value;
    const g = bookingdata.allSalutations.find((g) => g.salutation_id === value);
    if (g) {
      setGender(g.gender);
    }

    setSalutaions(value);
  };
  console.log(Salutaions);
  const handleChangeEID = (event) => {
    const value = event.target.value;
    setEID(value);
    if (value !== "5") {
      setGovID("");
    }
  };
  const handleChange = (event, target) => {
    const value = event.target.value;
    if (target === "country") {
      setCountry(value);

      var states = bookingdata.allStates?.filter(
        (state) => state.country_id === event.target.value,
      );
      var cities = bookingdata.allCities?.filter(
        (city) => city.state_id === states[0]?.state_id,
      );
      console.log(states);
      if (states) {
        setState(states[0]?.state_id);
      }
      if (cities) {
        setCity(cities[0]?.city_id);
      }
    }
  };
  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
  };
  const handleStateChange = (event) => {
    const value = event.target.value;
    setState(value);
  };
  const handleChangeGen = (event) => {
    const value = event.target.value;
    setGender(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const HasInput = (value, c) => {
    var count = c;
    if (value !== "" && value !== undefined) {
      count += 1;
    }
    return count;
  };
  const CountProgress = () => {
    var count = 0;
    count = HasInput(Fname, count);
    count = HasInput(Lname, count);
    count = selectedDate !== null ? count + 1 : count;
    count = HasInput(PhoneNo, count);
    count = HasInput(Email, count);
    count = HasInput(City, count);
    count = HasInput(Gender === "" ? 1 : Gender, count);
    count = HasInput(PatientCat, count);
    count = HasInput(Country, count);
    count = HasInput(GovID, count);
    count = HasInput(EID, count);
    if (EID !== "5") {
      count = (count / 10) * 100;
    } else {
      count = (count / 11) * 100;
    }

    return count;
  };

  const HandleSaveProfile = async () => {
    if (CountProgress() !== 100) {
      if (EID !== "5") {
        if (GovIsvalid) {
          setOpen(true);
        }
      }
    } else {
      dispatch(
        setDetails({
          agein: "Y",
          country: Country,
          custom_field5: "",
          custom_list1_value: "Non UAE National - Resident Patient",
          custom_list2_value: "80159:Abu Dhabi",
          custom_list3_value: "Social Media",
          dateofbirth: `${selectedDate.toLocaleString("default", {
            day: "2-digit",
          })}-${selectedDate.toLocaleString("default", {
            month: "2-digit",
          })}-${selectedDate.getFullYear()}`,
          email_id: Email,
          government_identifier: GovID,
          identifier_id: EID,
          last_name: Lname,
          middle_name: Mname ? Mname : "",
          middle_name2: "",
          nationality_id: Country,
          patient_address: Address,
          patient_area: "",
          patient_category_id: 1,
          patient_city: City ? City : Country,
          patient_gender: Gender,
          patient_group: 0,
          patient_name: Fname,
          patient_phone: PhoneNo[0] === "+" ? PhoneNo : "+" + PhoneNo,
          patient_state: State ? State : Country,
          preferred_language: PrefLan,
          salutation: Salutaions,
        }),
      );
      dispatch(
        SaveProfile({
          agein: "Y",
          country: Country,
          custom_field5: "",
          custom_list1_value: "Non UAE National - Resident Patient",
          custom_list2_value: "80159:Abu Dhabi",
          custom_list3_value: "Social Media",
          dateofbirth: `${selectedDate.toLocaleString("default", {
            day: "2-digit",
          })}-${selectedDate.toLocaleString("default", {
            month: "2-digit",
          })}-${selectedDate.getFullYear()}`,
          email_id: Email,
          government_identifier: EID === "5" ? GovID : "",
          identifier_id: EID,
          last_name: Lname,
          middle_name: Mname ? Mname : "",
          middle_name2: "",
          nationality_id: Country,
          patient_address: Address,
          patient_area: "",
          patient_category_id: 1,
          patient_city: City ? City : Country,
          patient_gender: Gender,
          patient_group: 0,
          patient_name: Fname,
          patient_phone: PhoneNo[0] === "+" ? PhoneNo : "+" + PhoneNo,
          patient_state: State ? State : Country,
          preferred_language: PrefLan,
          salutation: Salutaions,
        }),
      );
      console.log(registeration_data);
      if (registeration_data?.patient === undefined) {
        setOpen2(true);
      } else if (registeration_data?.patient) {
        dispatch(setMr_no(registeration_data?.patient));
        dispatch(setHasDetails());
        dispatch(ChangeStep(ActiveStep + 1));
      }
    }
  };
  console.log(registeration_data);
  console.log(status === "success" && details !== undefined);
  if (status === "success" && details !== undefined) {
    if (details.patient) {
      dispatch(setHasDetails());
    } else if (registeration_data?.patient) {
      dispatch(setMr_no(registeration_data?.patient));
      dispatch(setHasDetails());
    }
  }
  useEffect(() => {
    if (registeration_data?.patient) {
      dispatch(ChangeStep(ActiveStep + 1));
    }
  }, [registeration_data]);

  console.log(HasDetails);
  console.log(HasDetails);
  return (
    <Fade in={true} timeout={700}>
      <div className="EditProfile position-relative">
        <div className="LinearProgressNav">
          <LinearProgressWithLabel value={CountProgress()} />
        </div>
        <h3>Basic details</h3>
        <div className="row ">
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel
                disabled={HasDetails}
                shrink
                htmlFor="firstname-input"
              >
                First Name
              </InputLabel>
            </div>
            <BootstrapInput
              value={Fname}
              disabled={HasDetails}
              required
              onChange={HandleFnameChange}
              fullWidth
              id="firstname-input"
            />
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="lastname-input">
                Last Name
              </InputLabel>
            </div>
            <BootstrapInput
              value={Lname}
              disabled={HasDetails}
              required
              fullWidth
              onChange={HandleLnameChange}
              id="lastname-input"
            />
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel
                disabled={HasDetails}
                shrink
                htmlFor="middlename-input"
              >
                Middle Name
              </InputLabel>
            </div>
            <BootstrapInput
              value={Mname}
              disabled={HasDetails}
              onChange={HandleMnameChange}
              fullWidth
              id="middlename-input"
            />
          </div>
          <div className="col-sm-6 inputdate">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="date-input">
                Date of birth
              </InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disabled={HasDetails}
                  variant="inline"
                  style={{ width: "100%", marginTop: 0, marginBottom: 0 }}
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  value={selectedDate ? selectedDate : ""}
                  inputVariant="outlined"
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="phone-input">
                Phone Number
              </InputLabel>
            </div>
            <BootstrapInput
              disabled={HasDetails}
              required
              value={PhoneNo}
              onChange={HandlePhoneNoChange}
              name="phone-number"
              fullWidth
              id="phone-input"
            />
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="email-input">
                Email
              </InputLabel>
            </div>
            <BootstrapInput
              disabled={HasDetails}
              value={profile?.email}
              required
              onChange={HandleEmailChange}
              fullWidth
              type="email"
              id="email-input"
            />
          </div>
        </div>
        <Divider style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} />
        <h3>User Information</h3>
        <div className="row ">
          <div className="col-sm-12">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="address-input">
                Address
              </InputLabel>
            </div>
            <BootstrapInput
              disabled={HasDetails}
              value={Address}
              onChange={HandleAddressChange}
              required
              fullWidth
              id="address-input"
            />
          </div>
          <div className="col-sm-2">
            <div className="mt-3">
              <InputLabel
                disabled={HasDetails}
                shrink
                htmlFor="salutations-input"
              >
                Salutations
              </InputLabel>
              <NativeSelect
                disabled={HasDetails}
                id="salutations-input"
                value={Salutaions}
                required
                fullWidth
                onChange={handleChangeSal}
                input={<BootstrapInput />}
              >
                {bookingdata.length !== 0 &&
                  bookingdata.allSalutations?.map((sal, idx) => (
                    <option value={`${sal.salutation_id}`}>
                      {sal.salutation}
                    </option>
                  ))}
              </NativeSelect>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="mt-3">
              <InputLabel
                disabled={HasDetails}
                shrink
                htmlFor="patietcategory-input"
              >
                Patient category
              </InputLabel>
              <NativeSelect
                disabled={HasDetails}
                id="patietcategory-input"
                value={PatientCat}
                required
                fullWidth
                onChange={handleChangePC}
                input={<BootstrapInput />}
              >
                {bookingdata.length !== 0 &&
                  bookingdata.allPatientCategories?.map((cat, idx) => (
                    <option value={cat.category_id}>{cat.category_name}</option>
                  ))}
              </NativeSelect>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="country-input">
                Country
              </InputLabel>
              <NativeSelect
                disabled={HasDetails}
                id="country-input"
                value={Country}
                required
                fullWidth
                onChange={(e) => handleChange(e, "country")}
                input={<BootstrapInput />}
              >
                <option aria-label="None" value=""></option>
                {bookingdata.length !== 0 &&
                  bookingdata.allCountries?.map((con, idx) => (
                    <option value={`${con.country_id}`}>
                      {con.country_name}
                    </option>
                  ))}
              </NativeSelect>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="state-input">
                State
              </InputLabel>
              <NativeSelect
                disabled={HasDetails}
                id="state-input"
                value={State}
                required
                fullWidth
                onChange={handleStateChange}
                input={<BootstrapInput />}
              >
                {bookingdata.length !== 0 &&
                  bookingdata.allStates
                    ?.filter((state) => state.country_id === Country)
                    .map((state, idx) => (
                      <option value={`${state.state_id}`}>
                        {state.state_name}
                      </option>
                    ))}
              </NativeSelect>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="city-input">
                City
              </InputLabel>
              <NativeSelect
                disabled={HasDetails}
                id="city-input"
                value={City}
                required
                fullWidth
                onChange={handleCityChange}
                input={<BootstrapInput />}
              >
                {bookingdata.length !== 0 &&
                  bookingdata.allCities
                    ?.filter((city) => city.state_id === State)
                    .map((city, idx) => (
                      <option value={`${city.city_id}`}>
                        {city.city_name}
                      </option>
                    ))}
              </NativeSelect>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="gender-input">
                Gender
              </InputLabel>
              <RadioGroup
                disabled={HasDetails}
                aria-label="gender"
                name="genders"
              >
                <div className="d-flex gender-input">
                  {[
                    { G: "Male", value: "M" },
                    { G: "Female", value: "F" },
                    { G: "Other", value: "O" },
                  ].map((gender) => (
                    <div key={gender.id} className="d-flex align-items-center">
                      <div className=" pr-1">
                        <YugenRadio
                          disabled={HasDetails}
                          value={gender.value}
                          checked={Gender === gender.value}
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          onChange={handleChangeGen}
                        />
                      </div>
                      <div className="pr-2">
                        <p>{gender.G}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="eid-input">
                ID Status
              </InputLabel>
              <NativeSelect
                disabled={HasDetails}
                id="eid-input"
                value={EID}
                required
                fullWidth
                onChange={handleChangeEID}
                input={<BootstrapInput />}
              >
                {bookingdata.length !== 0 &&
                  bookingdata.allGovtIdentifiers?.map((status, idx) => (
                    <option value={status.identifier_id}>
                      {status.description}
                    </option>
                  ))}
              </NativeSelect>
            </div>
          </div>
          {EID === "5" && (
            <div className="col-sm-6">
              <div className="mt-3">
                <InputLabel
                  disabled={HasDetails || EID === 5 || EID === "5"}
                  error={GovIsvalid}
                  shrink
                  htmlFor="GovID-input"
                >
                  Goverment ID
                </InputLabel>
              </div>

              <InputMask
                mask="999-9999-9999999-9"
                value={GovID}
                onBlur={OnGovBlur}
                onChange={HandleGovIDChange}
                disabled={HasDetails}
              >
                {(props) => <BootstrapInput {...props} fullWidth />}
              </InputMask>
            </div>
          )}

          <div className="col-sm-6">
            <div className="mt-3">
              <InputLabel disabled={HasDetails} shrink htmlFor="language-input">
                Preferred language
              </InputLabel>
              <RadioGroup aria-label="language" name="languages">
                <div className="d-flex gender-input">
                  {[
                    { name: "English", code: "en" },
                    { name: "Arabic", code: "ar" },
                    { name: "Other", code: "" },
                  ].map((lan) => (
                    <div key={lan.id} className="d-flex align-items-center">
                      <div className=" pr-1">
                        <YugenRadio
                          disabled={HasDetails}
                          value={lan.code}
                          checked={PrefLan === lan.code}
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          onChange={HandlePrefLanChange}
                        />
                      </div>
                      <div className="pr-2">
                        <p>{lan.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Please complete your profile before saving
          </Alert>
        </Snackbar>

        {!HasDetails && (
          <div className=" d-flex justify-content-end  align-items-center">
            <div className="text-center mt-4 mr-2">
              {status !== null && status === "loading" && (
                <CircularProgress className="mt-1" />
              )}
            </div>
            <div className="text-center">
              <button onClick={HandleSaveProfile} className="btn10 mt-4">
                Confirm Details
              </button>
            </div>
          </div>
        )}
        {ActiveStep === 5 && HasDetails && (
          <div className="d-flex justify-content-end align-items-center">
            <Link to="/book" className="btn10-nodecoration text-center d-flex ">
              <button
                onClick={HandleSaveProfile}
                className="btn10 mt-4"
                style={{ width: 185 }}
              >
                Continue booking
              </button>
            </Link>
          </div>
        )}
        {registeration_data?.error_message ? (
          <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose2}>
            <Alert onClose={handleClose2}>
              {registeration_data.error_message}
            </Alert>
          </Snackbar>
        ) : null}
      </div>
    </Fade>
  );
}
