import {
  CircularProgress,
  NativeSelect,
  Slide,
  TextField,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from "@material-ui/core/Modal";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import ar from "react-phone-input-2/lang/ar.json";
import { Alert } from "@material-ui/lab";

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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(7, 7),
    maxWidth: 650,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

export default function TransitionsModal({
  open,
  handleClose,
  handleOpen,
  Button,
}) {
  const classes = useStyles();
  const [Data, setData] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const getCategories = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/services/all/brief`
    );
    const data = await response.data.services;
    setData(data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [PhoneNo, setPhoneNo] = React.useState("");
  const [ERR, setERR] = React.useState(null);

  useEffect(() => {
    checkLocation();
  }, [Data, location.pathname]);

  const checkLocation = () => {
    var flag = false;
    for (let i = 0; i < Data?.length; i++) {
      if (location.pathname?.includes(Data[i].slug)) {
        setInputValue(Data[i].name);
        setValue(Data[i]);
        flag = true;
      }
    }
    if (!flag) {
      setValue({ id: "0", name: "", name_ar: "", slug: "" });
    }
  };

  const { lang } = useSelector((state) => state.lang);
  const [applied, setApplied] = React.useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setApplied(true);
    setERR(null);
    const name = document.getElementById("bootstrap-input1").value;
    const email = document.getElementById("bootstrap-input3").value;
    const message = document.getElementById("message-id").value;

    console.log({
      type: "booking-form",
      name: name,
      email: email,
      phone: PhoneNo,
      service: inputValue,
      message: message,
    });
    try {
      const response = await axios.post(
        "https://server.yugencare.com/api/v1/emails",
        {
          type: "booking-form",
          name: name,
          email: email,
          phone: PhoneNo,
          service: inputValue,
          message: message,
        }
      );
      setApplied(false);
      console.log(response);
      if (response) {
        handleClose();
        history.push("/thank-you");
      }
    } catch (err) {
      setApplied(false);
      setERR(err.response?.data.err);
    }
  };
  return (
    <div className="text-center">
      {!Button && (
        <Link
          data-aos="fade"
          data-aos-delay="0"
          data-aos-duration="500"
          type="button"
          className="btn2"
          onClick={handleOpen}
        >
          Book Now
        </Link>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: { appear: 500, enter: 500, exit: 0 },
        }}
      >
        <Slide
          in={open}
          direction="up"
          timeout={{ appear: 500, enter: 500, exit: 0 }}
        >
          <div
            className={
              classes.paper +
              ` Applyform content-block1 position-relative BookCTA ${
                lang === "en" ? "" : "Local-arabic"
              }`
            }
          >
            <div onClick={handleClose} className="close-drawer" />
            {/* <h2 id="transition-modal-title">
              Leave Us your details below and we will get in touch shortly.
            </h2> */}
            <div dir="ltr" id="transition-modal-description">
              <form className={classes.root} onSubmit={HandleSubmit}>
                <div className="container-fluid bookforminputs">
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <InputLabel required shrink htmlFor="bootstrap-input1">
                        {lang === "en" ? "Name" : "اسم"}
                      </InputLabel>
                      <BootstrapInput
                        required
                        fullWidth
                        id="bootstrap-input1"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <InputLabel required shrink htmlFor="bootstrap-input2">
                        {lang === "en" ? "Phone" : "هاتف"}
                      </InputLabel>
                      <PhoneInput
                        country={"ae"}
                        value={PhoneNo}
                        onChange={(phone) => {
                          setPhoneNo(phone);
                        }}
                        localization={lang === "en" ? "en" : ar}
                        masks={{ ae: "(..) ...-...." }}
                        inputProps={{
                          required: true,
                        }}
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <InputLabel required shrink htmlFor="bootstrap-input3">
                        {lang === "en" ? "Email" : "البريد الإلكتروني"}
                      </InputLabel>
                      <BootstrapInput
                        required
                        fullWidth
                        type="email"
                        id="bootstrap-input3"
                      />
                    </div>
                    <div className="col-md-6 mt-3 autocomplete">
                      <InputLabel
                        required
                        shrink
                        htmlFor="demo-customized-select-native1"
                      >
                        {lang === "en" ? "Services" : "خدمات"}
                      </InputLabel>
                      <Autocomplete
                        id="combo-box-demo"
                        options={Data}
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        getOptionLabel={(option) =>
                          lang === "en"
                            ? option.name
                            : option.name_ar
                            ? option.name_ar
                            : "غير مسمى"
                        }
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} required variant="outlined" />
                        )}
                      />
                    </div>
                    {ERR && (
                      <div className="col-md-12 pl-0 mt-3">
                        <Alert className="mt-3" severity="error">
                          {lang === "en" ? (
                            <p>{ERR.response}</p>
                          ) : (
                            <p>
                              "550-فشل التحقق لـ550-لا يوجد مثل هذا المستخدم
                              هنا550 فشل التحقق من المرسل "
                            </p>
                          )}
                        </Alert>
                      </div>
                    )}
                    <div className="col-md-12 pl-0 mt-3">
                      <InputLabel
                        required
                        shrink
                        htmlFor="demo-customized-select-native21"
                      >
                        {lang === "en" ? "Message" : "الرسالة"}
                      </InputLabel>
                      <BootstrapInput
                        size="small"
                        variant="outlined"
                        id="message-id"
                        required
                        multiline
                        rows={6}
                        fullWidth
                      />
                    </div>
                    <div className="col-md-12 mt-3 pl-0 d-flex align-items-center justify-content-center">
                      {applied ? (
                        <CircularProgress />
                      ) : (
                        <button
                          type="submit"
                          //   onClick={handleApplied}
                          className="btn2 mr-sm-4"
                          style={{
                            paddingLeft: 50,
                            paddingRight: 50,
                            border: "none",
                          }}
                        >
                          {lang === "en" ? "Submit" : "إرسال"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
