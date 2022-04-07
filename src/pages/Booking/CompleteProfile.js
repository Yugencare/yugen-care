import { Radio, TextField } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Snackbar from "@material-ui/core/Snackbar";
import { fade, withStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeIndex } from "../../app/Account/menu";
import { ChangeStep } from "../../app/Booking/department";
import { getProfileData } from "../../app/Booking/profileData";
import EditProfile from "./EditProfile";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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

export default function Payment({ PhoneNo, handleNext }) {
  const dispatch = useDispatch();
  const { bookingdata, isComplete } = useSelector((state) => state.bookingdata);
  const { details, HasDetails, profile, isLoggedIn } = useSelector(
    (state) => state.loginUser
  );

  useEffect(() => {
    // if (HasDetails) {
    //   dispatch(ChangeStep(ActiveStep + 1));
    // }
    dispatch(getProfileData());
  }, [dispatch]);

  console.log(details);

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  console.log(details);
  return (
    <div>
      {isLoggedIn ? (
        <div className="CompleteProfile">
          {!HasDetails ? (
            <>
              <p>
                Please complete your profile details to <br />
                finalize your request
              </p>
              <div className="booking-navigation d-flex align-items-center w-100">
                <Link to="/profile" onClick={() => dispatch(changeIndex(5))}>
                  <div className="loginbtn">
                    <p>View Profile</p>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="row m-0">
                <div className="col-3 col-sm-2 px-0 pr-2">
                  <TextField
                    fullWidth
                    disabled
                    label="Salutations"
                    defaultValue={
                      bookingdata.allSalutations.find(
                        (ctry) => ctry.salutation_id === details.salutation
                      ).salutation
                    }
                    variant="standard"
                  />
                </div>
                <div className="col-9 col-sm-5 px-0 ">
                  <TextField
                    fullWidth
                    disabled
                    label="Name"
                    defaultValue={
                      details.patient_name + " " + details.last_name
                    }
                    variant="standard"
                  />
                </div>
                <div className=" col-sm-7 px-0 mt-4">
                  <TextField
                    fullWidth
                    disabled
                    label="Country"
                    defaultValue={
                      bookingdata.allCountries.find(
                        (ctry) => ctry.country_id === details.country
                      ).country_name
                    }
                    variant="standard"
                  />
                </div>
                <div className=" col-sm-7 px-0 mt-4">
                  <TextField
                    fullWidth
                    disabled
                    label="Phone"
                    defaultValue={details.patient_phone}
                    variant="standard"
                  />
                </div>
                <div className="col-sm-7 px-0 mt-4">
                  <TextField
                    fullWidth
                    disabled
                    label="Address"
                    defaultValue={
                      details.patient_address === ""
                        ? "Not specified"
                        : details.patient_address
                    }
                    variant="standard"
                  />
                </div>
              </div>

              <div
                className="booking-navigation d-flex align-items-center w-100 position-relative"
                style={{ marginTop: "2rem" }}
              >
                <div
                  onClick={() => dispatch(ChangeStep(6))}
                  className="loginbtn"
                  style={{ width: 220 }}
                >
                  <p>Confirm appointment</p>
                </div>
              </div>
            </>
          )}

          {/* <h3>User Information</h3>
      <div className="row ">
        <div className="col-sm-6">
          <div className="mt-3">
            <InputLabel shrink htmlFor="middlename-input">
              Middle Name
            </InputLabel>
          </div>
          <BootstrapInput
            value={Mname}
            onChange={HandleMnameChange}
            fullWidth
            id="middlename-input"
          />
        </div>
        <div className="col-sm-2">
          <div className="mt-3">
            <InputLabel shrink htmlFor="salutations-input">
              Salutations
            </InputLabel>
            <NativeSelect
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
            <InputLabel shrink htmlFor="patietcategory-input">
              Patient category
            </InputLabel>
            <NativeSelect
              id="patietcategory-input"
              value={PatientCat}
              required
              fullWidth
              onChange={handleChangePC}
              input={<BootstrapInput />}
            >
              {bookingdata.length !== 0 &&
                bookingdata.allPatientCategories?.map((cat, idx) => (
                  <option value={`${cat.category_id}`}>
                    {cat.category_name}
                  </option>
                ))}
            </NativeSelect>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="mt-3">
            <InputLabel error={Address === ""} shrink htmlFor="address-input">
              Address
            </InputLabel>
          </div>
          <BootstrapInput
            value={Address}
            onChange={HandleAddressChange}
            required
            fullWidth
            id="address-input"
          />
        </div>

        <div className="col-sm-4">
          <div className="mt-3">
            <InputLabel shrink htmlFor="country-input">
              Country
            </InputLabel>
            <NativeSelect
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
        <div className="col-sm-4">
          <div className="mt-3">
            <InputLabel shrink htmlFor="state-input">
              State
            </InputLabel>
            <NativeSelect
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
        <div className="col-sm-4">
          <div className="mt-3">
            <InputLabel shrink htmlFor="city-input">
              City
            </InputLabel>
            <NativeSelect
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
                    <option value={`${city.city_id}`}>{city.city_name}</option>
                  ))}
            </NativeSelect>
          </div>
        </div>
        <div className="col-sm-10">
          <div className="mt-3">
            <InputLabel shrink htmlFor="gender-input">
              Gender
            </InputLabel>
            <RadioGroup defaultValue="M" aria-label="gender" name="genders">
              <div className="d-flex gender-input">
                {["Male", "Female", "Other"].map((gender) => (
                  <div key={gender.id} className="d-flex align-items-center">
                    <div className=" pr-1">
                      <YugenRadio
                        disabled={HasDetails}
                        value={gender[0]}
                        checked={Gender === gender[0]}
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        onChange={handleChangeGen}
                      />
                    </div>
                    <div className="pr-2">
                      <p>{gender}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mt-3">
            <InputLabel shrink htmlFor="GovID-input">
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
            {() => <BootstrapInput fullWidth />}
          </InputMask>
        </div>
        <div className="col-sm-6">
          <div className="mt-3">
            <InputLabel shrink htmlFor="eid-input">
              ID Status
            </InputLabel>
            <NativeSelect
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
        <div className="col-sm-6">
          <div className="mt-3">
            <InputLabel shrink htmlFor="language-input">
              Preferred language
            </InputLabel>
            <RadioGroup
              defaultValue="en"
              aria-label="language"
              name="languages"
            >
              <div className="d-flex gender-input">
                {[
                  { name: "English", code: "en" },
                  { name: "Arabic", code: "ar" },
                  { name: "Other", code: "" },
                ].map((lan) => (
                  <div key={lan.id} className="d-flex align-items-center">
                    <div className=" pr-1">
                      <YugenRadio
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
      </div> */}

          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
              Please complete your profile before saving
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <EditProfile />
      )}
    </div>
  );
}
