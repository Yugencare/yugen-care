import {
  Checkbox,
  NativeSelect,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { fade, withStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CountriesJSON from "./countries.json";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(0.5),
    },
  },
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
export default function Details({
  Data,
  Email,
  Country,
  State,
  Fname,
  Lname,
  StateIndex,
  Phone,
  Suite,
  Address,
  Street,
  City,
  value,
  Instructions,
  handleChangeEmail,
  handleChangeFname,
  handleChangeLname,
  handleChangePhone,
  handleChangeAddress,
  handleChangeSuite,
  handleChangeStreet,
  handleChangeCity,
  handleChangeState,
  handleChangeCon,
  handleChange,
  handleChangeInstructions,
}) {
  const { isLoggedIn } = useSelector((state) => state.loginUser);

  return (
    <div className="Details ml-auto px-5">
      {!isLoggedIn && (
        <div>
          <div className="mt-3">
            <div className="row">
              <div className="col-sm-6">
                <h2>Contact information</h2>
              </div>
              <div className="col-sm-6 text-right">
                <p>
                  Already have an Account? <span>Log in</span>
                </p>
              </div>
            </div>
          </div>
          <BootstrapInput
            placeholder="Email"
            type="email"
            value={Email}
            fullWidth
            onChange={handleChangeEmail}
            required
            id="checkoutemail-input"
          />
          <div className="checkout-checkbox">
            <Checkbox />
            <p>Sign me up for emails, discounts and new products!</p>
          </div>
        </div>
      )}
      <h2>Billing information</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="mt-3">
            <BootstrapInput
              required
              type="text"
              value={Fname}
              onChange={(e) => handleChangeFname(e)}
              placeholder="First name"
              fullWidth
              id="checkoutfn-input"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mt-3">
            <BootstrapInput
              required
              value={Lname}
              onChange={(e) => handleChangeLname(e)}
              type="text"
              placeholder="Last name"
              fullWidth
              id="checkoutln-input"
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <BootstrapInput
          required
          type="text"
          value={Address}
          onChange={(e) => handleChangeAddress(e)}
          placeholder="Address"
          fullWidth
          id="checkoutaddress-input"
        />
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="mt-3">
            <NativeSelect
              id="checkoutcountry-input"
              value={Country}
              required
              fullWidth
              onChange={handleChangeCon}
              input={<BootstrapInput required />}
            >
              <option aria-label="None" value="None 0">
                Country/Region
              </option>
              {CountriesJSON.map((con, idx) => (
                <option value={`${con.name}/${idx}`}>{con.name}</option>
              ))}
            </NativeSelect>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mt-3">
            <NativeSelect
              id="checkoutcity-input"
              value={State}
              required
              aria-label="state"
              fullWidth
              onChange={handleChangeState}
              input={<BootstrapInput required />}
            >
              <option aria-label="None" value="">
                State
              </option>
              {CountriesJSON[StateIndex]?.states?.map((state, idx) => (
                <option value={state.name}>{state.name}</option>
              ))}
            </NativeSelect>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="mt-3">
            <BootstrapInput
              type="text"
              value={Suite}
              onChange={(e) => handleChangeSuite(e)}
              placeholder="Appartment, suite"
              fullWidth
              id="checkoutsuite-input"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mt-3">
            <BootstrapInput
              type="text"
              value={Street}
              required
              onChange={(e) => handleChangeStreet(e)}
              placeholder="Street name"
              fullWidth
              id="checkoutStreet-input"
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <BootstrapInput
          required
          type="text"
          value={City}
          onChange={(e) => handleChangeCity(e)}
          aria-label="city"
          placeholder="City"
          fullWidth
          id="checkoutcity-input"
        />
      </div>
      <div className="mt-3">
        <BootstrapInput
          placeholder="Phone"
          aria-label="tel"
          required
          value={Phone}
          onChange={(e) => handleChangePhone(e)}
          type="tel"
          fullWidth
          id="checkoutphone-input"
        />
      </div>

      <h2 className="mt-3">Payment Method:</h2>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
        TabIndicatorProps={{
          style: { background: "#57bbad", height: 2 },
        }}
      >
        <Tab
          disabled
          label={
            <>
              <div>Credit/Debit Card</div>
              <p>
                <small style={{ fontStyle: "italic" }}>
                  secure/coming soon
                </small>
              </p>
            </>
          }
        />
        <Tab
          label={
            <>
              <div>Pay on delivery</div>
              {Data && (
                <p>
                  <small style={{ fontStyle: "italic" }}>
                    +{Data.cod_fees} AED
                  </small>
                </p>
              )}
            </>
          }
        />
      </Tabs>
      <div style={{ minHeight: 200 }}>
        <div className={value !== 0 ? "d-none" : ""}>
          <h2 className="mt-3">Instructions</h2>
        </div>
        <div className={value !== 1 ? "d-none" : ""}>
          <Alert className="mt-3" severity="info">
            Cash or card on delivery. Card payment is subject to availability.
          </Alert>
          <h2 className="mt-3">
            <small>
              <strong>Delivery Instructions</strong>
            </small>
          </h2>
          <div className="deliveryTxtArea">
            <textarea
              name="deliveryInstructions"
              placeholder="Add any additional delivery instructions here"
              className="D-instructions"
              spellcheck="false"
              onChange={handleChangeInstructions}
              style={{ marginTop: 0, marginBottom: 0, height: 75 }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
