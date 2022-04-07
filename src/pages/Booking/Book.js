import { Fade, Slide } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBackIos } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeStep, DeSelectDepartment } from "../../app/Booking/department";
import { DeselectDoctor } from "../../app/Booking/doctors";
import { DeselectTime } from "../../app/Booking/timeslots";
import AddPhone from "./AddPhone";
import CancelModal from "./cancelModal";
import Cart from "./Cart";
import Payment from "./CompleteProfile";
import ConfirmAppointment from "./ConfirmApp";
import PhoneVerification from "./PhoneVerification";
import SelectDate from "./SelectDate";
import SelectDoctor from "./SelectDoctor";
import SelectService from "./SelectService";

function Alert(props) {
  return (
    <MuiAlert elevation={6} variant="outlined" {...props} severity="warning" />
  );
}

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: 30,
    marginBottom: 45,
    backgroundColor: "rgba(0, 0, 0, 0.32)",
  },
}));

const steps = [
  "Select services",
  "Select Doctor",
  "Select Date & time",
  "Add your phone number",
  "Verify your phone number",
  "Confirm your appointment",
];

const chosen = {
  date: "20th April 2020",
  time: "2:15pm",
  address: "Yugen Care, Jumeirah Beach Road, Jumeirah 3, UAE",
  service: [
    {
      name: "Lip Filler",
      price: "XX AED",
      duration: "30 mins",
    },
    {
      name: "Botox(one area)",
      price: "XX AED",
      duration: "35 mins",
    },
  ],
  doctor: "John Doe",
  payment: "pending payment",
};

const doctors = [
  {
    name: "John Doe",
  },
  {
    name: "Michael Myers",
  },
  {
    name: "Ameera Ahmed",
  },
  {
    name: "Ahmed Wajeeh",
  },
];

export default function Book() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [ServiceSelected, setServiceSelected] = useState([]);
  const [DoctorSelected, setDoctorSelected] = useState("");
  const [SelectedDate, setSelectedDate] = useState({});
  const [DiscountCode, setDiscountCode] = useState("");
  const [PhoneNo, setPhoneNo] = useState(null);
  const [verifyCode, setverifyCode] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const { departmentSelected } = useSelector((state) => state.departments);
  const { ActiveStep } = useSelector((state) => state.departments);
  const { SelectedDoctor } = useSelector((state) => state.doctors);
  const { Selectedtime } = useSelector((state) => state.timeslots);
  const { isComplete } = useSelector((state) => state.bookingdata);

  const handleNext = () => {
    dispatch(ChangeStep(ActiveStep + 1));

    setOpen(false);
  };

  const handleBack = () => {
    if (ActiveStep === 2) {
      dispatch(ChangeStep(0));
    } else {
      dispatch(ChangeStep(ActiveStep !== 0 ? ActiveStep - 1 : 0));
    }
  };

  const ClearCart = () => {
    dispatch(ChangeStep(0));
    dispatch(DeselectTime());
    dispatch(DeselectDoctor());
    dispatch(DeSelectDepartment());
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const stepGaurd = () => {
    console.log("reached");
    if (SelectedDoctor === null && ActiveStep === 1) {
      setOpen(true);
    } else if (Selectedtime === null && ActiveStep === 2) {
      setOpen(true);
    } else if ((PhoneNo === null || PhoneNo <= 999999999) && ActiveStep === 3) {
      setOpen(true);
    } else if (verifyCode.length < 6 && ActiveStep === 4) {
      setOpen(true);
    } else if (!isComplete && ActiveStep === 5) {
      setOpen(true);
    } else handleNext();
  };
  const StepAlert = () => {
    if (ActiveStep === 1) return "Please select a Doctor!";
    if (ActiveStep === 2) return "Please select Time & Date!";
    if (ActiveStep === 3) return "Please provide a valid phone number!";
    if (ActiveStep === 4) return "Enter the code!";
    if (ActiveStep === 5) return "Complete Your Profile!";
  };
  const stepheading = [
    {
      color1: "Select",
      color2: "Services",
    },
    {
      color1: "Select",
      // color2: "Doctor",
      color2: "Service",
    },
    {
      color1: "Select",
      color2: "Time & Date",
    },
    {
      color1: "Add ",
      color2: "Your phone number",
    },
    {
      color1: "Verify",
      color2: "Your Phone Number",
    },
    {
      color1: "Complete",
      color2: "Your Profile",
    },
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectService />;
      case 1:
        return <SelectDoctor />;
      case 2:
        return <SelectDate />;
      case 3:
        return <AddPhone PhoneNo={PhoneNo} setPhoneNo={setPhoneNo} />;
      case 4:
        return (
          <PhoneVerification PhoneNo={PhoneNo} setverifyCode={setverifyCode} />
        );
      case 5:
        return <Payment PhoneNo={PhoneNo} handleNext={handleNext} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <div className="Book content-block1 position-relative">
        {ActiveStep === steps.length ? (
          <ConfirmAppointment
            ServiceSelected={ServiceSelected}
            DoctorSelected={DoctorSelected}
            SelectedDate={SelectedDate}
            PaymentMethod={PaymentMethod}
            chosen={chosen}
          />
        ) : (
          <div className="container">
            <div className="row">
              <div className="booking-stepheader w-100">
                <p>
                  <span>
                    Step{" "}
                    {ActiveStep >= 4 ? 4 : ActiveStep === 0 ? "1" : ActiveStep}
                  </span>{" "}
                  of 4
                </p>
                <h2>
                  <span>{stepheading[ActiveStep].color1}</span>{" "}
                  {stepheading[ActiveStep].color2}
                </h2>
                <Divider className={classes.divider} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mobileselect-booking order-2 order-md-1">
                <div className="row m-0">
                  <div className="col-12 p-0 ">
                    {getStepContent(ActiveStep)}
                  </div>
                  <div className="col-12 p-0 d-none d-md-block">
                    <Fade timeout={600} in={departmentSelected !== null}>
                      <div className="booking-navigation d-flex align-items-center w-100">
                        <div
                          onClick={handleBack}
                          className="backbtn"
                          style={
                            ActiveStep !== 0
                              ? ActiveStep !== 5
                                ? { marginRight: 50 }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <ArrowBackIos className="mr-4" />
                          <p>BACK</p>
                        </div>

                        <div
                          style={ActiveStep !== 5 ? null : { display: "none" }}
                          onClick={stepGaurd}
                          className="loginbtn"
                        >
                          <p>
                            {ActiveStep === steps.length - 1
                              ? "Confirm"
                              : "Next"}
                          </p>
                        </div>
                      </div>
                    </Fade>
                    <Snackbar
                      open={open}
                      autoHideDuration={3000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity="error">
                        {StepAlert()}
                      </Alert>
                    </Snackbar>
                  </div>
                </div>
              </div>
              <div className="col-md-6 order-1  order-md-2 mb-5 mb-md-0">
                <div className="grayBG3">
                  <div className="whitePaper">
                    <Cart
                      setOpenModal={setOpenModal}
                      DiscountCode={DiscountCode}
                      setDiscountCode={setDiscountCode}
                      chosen={chosen}
                    />
                  </div>
                </div>
                <CancelModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  ClearCart={ClearCart}
                />
              </div>
            </div>
          </div>
        )}
        <div className={ActiveStep === 6 ? "d-none" : " d-block d-md-none"}>
          <Slide direction="up" timeout={600} in={departmentSelected !== null}>
            <div className="booking-navigation d-flex align-items-center w-100">
              <div
                onClick={handleBack}
                className="backbtn"
                style={
                  ActiveStep !== 0
                    ? ActiveStep !== 5
                      ? { marginRight: 50 }
                      : { display: "none" }
                    : { display: "none" }
                }
              >
                <ArrowBackIos className="mr-0 mr-sm-4" />
                <p>BACK</p>
              </div>

              <div
                style={ActiveStep !== 5 ? null : { display: "none" }}
                onClick={stepGaurd}
                className="loginbtn"
              >
                <p>{ActiveStep === steps.length - 1 ? "Confirm" : "Next"}</p>
              </div>
            </div>
          </Slide>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {StepAlert()}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}
