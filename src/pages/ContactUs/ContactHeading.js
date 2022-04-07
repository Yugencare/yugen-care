import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { decode } from "html-entities";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import email from "../../images/inbox-icon.png";
import location from "../../images/location-icon.png";
import phone from "../../images/phone-icon.png";
import WhatsApp from "../../images/whatsapp.png";
import Phone from "../../images/phone.png";
import axios from "axios";
import { withStyles } from "@material-ui/styles";
import { CircularProgress, InputLabel } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import ar from "react-phone-input-2/lang/ar.json";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
    },
  },
  autocom: {
    fontFamily: "Raleway",
    "&.MuiAutocomplete-popper": {
      fontFamily: "Raleway",
    },
  },
  message: {
    display: "flex",
    justifyContent: "center",
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
    },
  },
}));

const RequestField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#6c9e97",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#95d5cc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#95d5cc",
      },
    },
  },
})(TextField);

function ContactHeading({ contactdetails }) {
  const classes = useStyles();
  const contactinfo = [
    {
      icon: location,
      text: contactdetails.address,
    },
    {
      icon: phone,
      text: contactdetails.phone,
    },
    {
      icon: email,
      text: contactdetails.email,
    },
  ];

  const [name, setName] = useState("");
  const [contactmail, setContactmail] = useState("");
  const [service, setService] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setisSent] = useState(false);
  const [load, setLoad] = useState(false);
  const [ERR, setERR] = React.useState(null);
  const { lang } = useSelector((state) => state.lang);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setContactmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const SendEmail = async (event) => {
    event.preventDefault();
    setLoad(true);
    setisSent(false);
    setERR(null);
    const post = {
      type: "contact",
      name: name,
      subject: `${name}'s message | Contact us form`,
      from: contactmail,
      message: message,
      phone: phoneNumber,
    };
    console.log(post);
    if (
      name !== "" &&
      message !== "" &&
      contactmail !== "" &&
      phoneNumber !== ""
    ) {
      try {
        const response = await axios.post(
          "https://server.yugencare.com/api/v1/emails",
          post
        );

        setName("");
        setContactmail("");
        setPhoneNumber("+971");
        setMessage("");
        setisSent(true);
        setLoad(false);
      } catch (err) {
        setLoad(false);
        setERR(err.response?.data.err);
      }
    }
  };

  return (
    <div>
      <form className="ContactUs-header">
        <div className="container h-100">
          <div className="row align-items-center ">
            <div className="col-xl-6 col-md-8 col-12">
              <div className="serviceshero_text" style={{ width: "80%" }}>
                <h1
                  data-aos="fade-right"
                  data-aos-delay="0"
                  data-aos-duration="1500"
                  data-aos-once={false}
                  className="mb-4"
                >
                  {contactdetails.title1} <span> {contactdetails.title2}</span>
                </h1>
                <p
                  data-aos="fade"
                  data-aos-delay="500"
                  data-aos-duration="1500"
                  data-aos-once={false}
                  className="mb-4"
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: `${decode(contactdetails.paragraph)}`,
                  }}
                ></p>
              </div>
              <div
                className="dropdown-divider"
                style={{ marginBottom: 60, width: "80%" }}
              ></div>
              <div
                data-aos="fade"
                data-aos-delay="500"
                data-aos-duration="1500"
                data-aos-once={false}
              >
                {contactinfo.map(
                  (info) =>
                    info.text &&
                    info.text.length !== 0 && (
                      <div className="ContactInfo mt-3 ">
                        <>
                          <img src={info.icon} alt="" />
                          <p>{info.text}</p>
                        </>
                      </div>
                    )
                )}
                <div
                  style={{ cursor: "pointer" }}
                  className="ContactInfo mt-3 "
                >
                  <a
                    href="https://api.whatsapp.com/send?phone=+97143498000"
                    className="d-flex"
                  >
                    <img src={Phone} alt="" />
                    <p>{contactdetails.whatsapp}</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-8 col-12">
              <div
                data-aos="fade-up"
                data-aos-delay="0"
                data-aos-duration="1500"
                className="contactus-paper"
              >
                <form className={classes.root}>
                  <div className="row contactusFields m-0">
                    <div className="col-xl-6">
                      <InputLabel>{lang === "en" ? "Name" : "اسم"}</InputLabel>
                      <RequestField
                        size="small"
                        variant="outlined"
                        required
                        value={name}
                        onChange={handleNameChange}
                        fullWidth
                      />
                    </div>

                    <div className="col-xl-6">
                      <InputLabel>
                        {lang === "en" ? "Phone Number" : "رقم الهاتف"}
                      </InputLabel>
                      {/* <RequestField
                        size="small"
                        variant="outlined"
                        required
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        type="number"
                        fullWidth
                      /> */}
                      <PhoneInput
                        country={"ae"}
                        value={phoneNumber}
                        onChange={(phone) => {
                          handlePhoneChange(phone);
                        }}
                        localization={lang === "en" ? "en" : ar}
                        masks={{ ae: "(..) ...-...." }}
                        inputProps={{
                          required: true,
                        }}
                      />
                    </div>
                  </div>

                  <div className="row contactusFields m-0">
                    <div className="col-xl-12">
                      <InputLabel>
                        {lang === "en" ? "Email" : "البريد الإلكتروني"}
                      </InputLabel>
                      <RequestField
                        size="small"
                        variant="outlined"
                        required
                        value={contactmail}
                        type="email"
                        onChange={handleEmailChange}
                        fullWidth
                      />
                    </div>
                    {/* <div className="col-xl-6">
                    <div>
                      <Autocomplete
                        id="category-states"
                        classes={{ input: classes.autocom }}
                        options={options}
                        groupBy={(option) => option.sortby}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            label={lang === "en" ? "Services" : "الخدمات"}
                            variant="outlined"
                            InputLabelProps={{
                              style: { fontFamily: "Raleway" },
                            }}
                          />
                        )}
                      />
                    </div>
                  </div> */}
                  </div>
                  <div
                    className="row contactusFields m-0"
                    className={classes.message}
                  >
                    <div className="col-12">
                      <InputLabel>
                        {lang === "en" ? "Message" : "الرسالة"}
                      </InputLabel>
                      <RequestField
                        size="small"
                        variant="outlined"
                        value={message}
                        onChange={handleMessageChange}
                        required
                        multiline
                        rows={6}
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    {isSent && (
                      <Alert className="mt-3" severity="success">
                        {lang === "en" ? (
                          <>
                            {" "}
                            <p>Your request has been sent - Thank you!</p>
                            <p>
                              <small>
                                We're processing your message. This might take
                                several days, so we appreciate your patience.
                              </small>
                            </p>
                          </>
                        ) : (
                          <>
                            {" "}
                            <p>تم إرسال - شكراً لك!</p>
                            <p>
                              <small>
                                نقوم الآن بمعالجة رسالتك. قد يستغرق هذا الأمر
                                عدة أيام، لذلك نقدّر لك صبرك.
                              </small>
                            </p>{" "}
                          </>
                        )}
                      </Alert>
                    )}
                    {ERR && (
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
                    )}
                  </div>
                  <div className="contactusFields text-center">
                    {!load ? (
                      <button
                        type="submit"
                        className="btn1 mt-3"
                        onClick={SendEmail}
                      >
                        <p className="mb-0">
                          {lang === "en" ? "Send" : "أرسل"}
                        </p>
                      </button>
                    ) : (
                      <CircularProgress />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactHeading;

const services = [
  // FACE -----------------------------------------------
  { title: "Skin DNA Test", serviceType: "Face" },
  { title: "Face Sculpting", serviceType: "Face" },
  { title: "Non-surgical Facelift", serviceType: "Face" },
  { title: "Non-surgical nose reshaping", serviceType: "Face" },
  { title: "Open Eyes - Non-surgical Blepharoplasty", serviceType: "Face" },
  { title: "Fox Eyes", serviceType: "Face" },
  { title: "Smooth Eyes", serviceType: "Face" },
  { title: "Lip Lift", serviceType: "Face" },
  { title: "Liplase", serviceType: "Face" },
  { title: "Liquid Face Lift", serviceType: "Face" },
  { title: "4D Face Lift", serviceType: "Face" },
  { title: "Collagen Stimulation", serviceType: "Face" },
  { title: "R3 by Dr Piccinini", serviceType: "Face" },
  { title: "Glass Skin", serviceType: "Face" },
  { title: "Neck Lift", serviceType: "Face" },
  { title: "Anti-wrinkle treatment", serviceType: "Face" },
  { title: "Volumizing Fillers", serviceType: "Face" },
  { title: "Platelet Rich Plasma Therapy", serviceType: "Face" },
  { title: "Skin Rejuvenation", serviceType: "Face" },
  { title: "Radiance Injections", serviceType: "Face" },
  { title: "Red Carpet Facial", serviceType: "Face" },
  { title: "Fire & Ice Facial", serviceType: "Face" },
  { title: "Face Lifting Facial", serviceType: "Face" },
  { title: "Rejuvenation Facial", serviceType: "Face" },
  { title: "Carbon Facial", serviceType: "Face" },
  { title: "Hydra Facial", serviceType: "Face" },
  { title: "Prerejuvenation Facial", serviceType: "Face" },
  { title: "Light Therapy", serviceType: "Face" },
  { title: "Skin Peels", serviceType: "Face" },
  { title: "Skin Boosters", serviceType: "Face" },
  { title: "Skin Remodelling", serviceType: "Face" },
  { title: "Mesotherapy", serviceType: "Face" },
  { title: "Pigmentation Restoration", serviceType: "Face" },
  { title: "Photofacial", serviceType: "Face" },
  { title: "Vegan Peel", serviceType: "Face" },
  { title: "Vegan Facial", serviceType: "Face" },
  { title: "Semi-permanent make up", serviceType: "Face" },
  { title: "Medical tattoo", serviceType: "Face" },
  { title: "Microblading", serviceType: "Face" },
  { title: "Forever Filler", serviceType: "Face" },
  { title: "L3 Lifted Luscious Lips", serviceType: "Face" },
  { title: "Forever Filler", serviceType: "Face" },
  { title: "L3 Lifted Luscious Lips", serviceType: "Face" },
  { title: "Eyelid Correction", serviceType: "Face" },
  { title: "Buccal Fat Removal", serviceType: "Face" },
  { title: "Rhinoplasty", serviceType: "Face" },
  { title: "Otoplasty", serviceType: "Face" },
  { title: "Chin Advancement", serviceType: "Face" },
  { title: "Educational Analysis", serviceType: "Face" },
  { title: "Combo – Botox & Filler & Threads", serviceType: "Face" },
  { title: "Derma Fillers", serviceType: "Face" },
  { title: "Ultherapy", serviceType: "Face" },
  { title: "Derma fillers", serviceType: "Face" },
  { title: "Threads", serviceType: "Face" },
  { title: "Fotona", serviceType: "Face" },
  { title: "Radiesse & Threads", serviceType: "Face" },
  { title: "Derma Fillers/ Threads", serviceType: "Face" },
  { title: "Radiesse Rejuvenations", serviceType: "Face" },
  { title: "Aqua Gold treatment", serviceType: "Face" },
  { title: "Morpheous", serviceType: "Face" },
  { title: "Botox", serviceType: "Face" },
  { title: "Derma Filler", serviceType: "Face" },
  { title: "PRPs", serviceType: "Face" },
  { title: "Hyaluronic acid injections", serviceType: "Face" },
  { title: "Venus Viva", serviceType: "Face" },
  { title: "Profhilo", serviceType: "Face" },
  { title: "iS Clinical Facials", serviceType: "Face" },
  { title: "Facial with BTL Exilis", serviceType: "Face" },
  { title: "LaseMD facial", serviceType: "Face" },
  { title: "Spectra XT Facial", serviceType: "Face" },
  { title: "Hydra facial", serviceType: "Face" },
  { title: "Laser machines", serviceType: "Face" },
  { title: "LED Mask", serviceType: "Face" },
  { title: "Chemical peeling", serviceType: "Face" },
  { title: "Skin needling", serviceType: "Face" },
  { title: "Pico Genesis", serviceType: "Face" },
  { title: "IPL", serviceType: "Face" },
  { title: "Green Peel", serviceType: "Face" },
  { title: "Skin Essence Facial", serviceType: "Face" },
  { title: "Stem Cells & Fat injections ", serviceType: "Face" },
  { title: "Surgery & Fat Grafting", serviceType: "Face" },
  { title: "Blepharoplasty", serviceType: "Face" },
  { title: "Forehead Reduction", serviceType: "Face" },
  { title: "Stem Cell Face lift", serviceType: "Face" },
  { title: "Neck Lift", serviceType: "Face" },
  { title: "Brow Lift", serviceType: "Face" },
  { title: "Surgery & Fat Grasfting w/ SC", serviceType: "Face" },

  // BODY ------------------------------
  { title: "Body Analysis Assessment", serviceType: "Body" },
  { title: "Laser Hair Removal", serviceType: "Body" },
  { title: "Vacuum Therapy", serviceType: "Body" },
  { title: "Fair Hair Removal", serviceType: "Body" },
  { title: "Neck & Decolletage Rejuvenation", serviceType: "Body" },
  { title: "Hand Rejuvenation", serviceType: "Body" },
  { title: "Beautiful Back", serviceType: "Body" },
  { title: "Buttocks Lift", serviceType: "Body" },
  { title: "Fresh underarms", serviceType: "Body" },
  { title: "Shape & Tighten", serviceType: "Body" },

  // Body Lift
  // Skin Tightening
  // Muscle Enhancing
  // Fat Reduction
  // Skin Texture
  // Cellulite Eliminating
  // Vein Removal
  // Stretchmark rejuvenation
  // Natural Body reshaping
  // HD Body Contouring
  // HD 6 Pack Definition
  // Drainless Tummy Tuck
  // Umbilical Reconstruction
  // Mini-Abdominoplasty
  // Correction of Diastasis
  // Mommy Makeover
  // Brazilian Buttocks Rejuvenation
  // Stem Cell Cellulite Treatment
  // Bra Roll Reduction
  // Arm Lift
  // Thigh Lift
  // Knee Lift
  // Neck Lift
  // Mini Liposuction
  // Breast Augmentation
  // Breast Lift
  // Breast Reduction
  // Breast Shaping
  // Nipple Reduction
  // Post weight loss body shaping
  // BMI Test (Educational Analysis)
  // Candela Laser
  // Cupping
  // Fotona Laser
  // Enlightening, LaseMD, BLT
  // Enlightening, LaseMD, BLT
  // Hydra Facial
  // Derma Fillers
  // Botox
  // Body Filler & Exilis
  // Bodylift
  // Fotona
  // TrueFlex ID
  // TrueSculpt ID
  // Venus Legacy
  // Venus Legacy, BTL

  // Fotona
  // RF Micro needling & stem cells

  // Stem Cells & Fat injections
  // Vaser Liposuction w/J Plasma
  // Vaser Liposuction w/J Plasma

  // "Dental",
  // "Body",
  // "Health",
  // "Men",
  // "Anti Aging",
  // "Sensual",
  // "Wellbeing",
];
const options = services.map((option) => {
  const sortby = option.serviceType;
  return {
    sortby: sortby,
    ...option,
  };
});
