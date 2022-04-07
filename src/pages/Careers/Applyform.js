import { NativeSelect } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from "@material-ui/core/Modal";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DescriptionIcon from "@material-ui/icons/Description";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
    //   border: "1px solid #000",
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
  positions,
  open,
  handleClose,
  handleOpen,
  PositionIndex,
  applynow,
}) {
  const classes = useStyles();
  useEffect(() => {
    setPosition(PositionIndex);
  }, [PositionIndex]);

  const [Nationlity, setNationlity] = React.useState("");
  const handleChange = (event) => {
    setNationlity(event.target.value);
  };
  const [experience, setExperience] = React.useState("");
  const handleChangeExp = (event) => {
    setExperience(event.target.value);
  };
  const [position, setPosition] = React.useState(PositionIndex);
  const handleChangePos = (event) => {
    setPosition(event.target.value);
  };
  const [applied, setApplied] = React.useState(false);
  const handleApplied = () => {
    setApplied(true);
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
  };

  const inputFile = useRef();
  const HandleUpload = () => {
    inputFile.current.click();
  };
  const inputFile2 = useRef();
  const HandleUpload2 = () => {
    inputFile2.current.click();
  };

  const [File, setFile] = React.useState("");
  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    // console.log(file);
    setFile(file); /// if you want to upload latter
  };
  const [File2, setFile2] = React.useState("");
  const onChangeFile2 = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    // console.log(file);
    setFile2(file); /// if you want to upload latter
  };
  return (
    <div className="text-center">
      {applynow?.apply_now && (
        <Link
          data-aos="fade"
          data-aos-delay="0"
          data-aos-duration="500"
          type="button"
          className="btn2"
          onClick={handleOpen}
        >
          Apply Now
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
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={
              classes.paper + " Applyform content-block1 position-relative"
            }
          >
            <div onClick={handleClose} className="close-drawer" />
            <h2 id="transition-modal-title">
              Leave Us your details below and we will get in touch shortly.
            </h2>
            <div id="transition-modal-description">
              <form className={classes.root} onSubmit={HandleSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <InputLabel required shrink htmlFor="bootstrap-input1">
                        Name
                      </InputLabel>
                      <BootstrapInput
                        required
                        fullWidth
                        id="bootstrap-input1"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <InputLabel required shrink htmlFor="bootstrap-input2">
                        Phone
                      </InputLabel>
                      <BootstrapInput
                        required
                        fullWidth
                        id="bootstrap-input2"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <InputLabel required shrink htmlFor="bootstrap-input3">
                        Email
                      </InputLabel>
                      <BootstrapInput
                        required
                        fullWidth
                        id="bootstrap-input3"
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <InputLabel
                        required
                        shrink
                        htmlFor="demo-customized-select-native1"
                      >
                        Nationality
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native1"
                        value={Nationlity}
                        required
                        fullWidth
                        onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="" />
                        {Nationalities.map((country, idx) => (
                          <option value={idx}>
                            {country.name}
                            &nbsp; &nbsp;
                            {country.code}
                          </option>
                        ))}
                      </NativeSelect>
                    </div>
                    <div className="col-md-6 mt-3">
                      <InputLabel
                        required
                        shrink
                        htmlFor="demo-customized-select-native2"
                      >
                        Position
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native2"
                        value={position}
                        required
                        fullWidth
                        onChange={handleChangePos}
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="" />
                        {positions.positions?.map((job, idx) => (
                          <option value={idx}>{job.heading_text}</option>
                        ))}
                      </NativeSelect>
                    </div>
                    <div className="col-md-6 mt-3">
                      <InputLabel
                        required
                        shrink
                        htmlFor="demo-customized-select-native3"
                      >
                        Experience
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native3"
                        required
                        value={experience}
                        fullWidth
                        onChange={handleChangeExp}
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="" />
                        <option value="1"> 1 Year</option>
                        {exp.map((exp, idx) => (
                          <option value={idx + 2}>{idx + 2} Years</option>
                        ))}
                        <option value="21"> 20+ Years</option>
                      </NativeSelect>
                    </div>
                    <div className="col-md-8 mt-5 pl-0">
                      <div className="d-flex">
                        <div className="form-attachment" onClick={HandleUpload}>
                          <AttachFileIcon
                            style={{
                              transform: "rotate(45deg)",
                              color: "#5b5b5b",
                              width: 18,
                            }}
                          />
                          <p>Attach Resume</p>* &nbsp;
                          <input
                            type="file"
                            id="file"
                            ref={inputFile}
                            onChange={onChangeFile}
                            style={{ display: "none" }}
                          />
                        </div>
                        <div
                          className="form-attachment"
                          onClick={HandleUpload2}
                        >
                          <AttachFileIcon
                            style={{
                              transform: "rotate(45deg)",
                              color: "#5b5b5b",
                              width: 18,
                            }}
                          />
                          <p>Attach Cover letter(Optional)</p>
                          <input
                            type="file"
                            id="file"
                            ref={inputFile2}
                            onChange={onChangeFile2}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                      <div className="d-flex">
                        {File && (
                          <div className="form-attachment">
                            <DescriptionIcon
                              style={{
                                color: "#5b5b5b",
                                width: 18,
                              }}
                            />
                            <p>{File?.name}</p>
                          </div>
                        )}
                        {File2 && (
                          <div className="pl-3 form-attachment">
                            <DescriptionIcon
                              style={{
                                color: "#5b5b5b",
                                width: 18,
                              }}
                            />
                            <p>{File2?.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-8 mt-3 pl-0 d-flex align-items-center">
                      <button
                        type="submit"
                        onClick={handleApplied}
                        className="btn2 mr-4"
                        style={{
                          paddingLeft: 50,
                          paddingRight: 50,
                          border: "none",
                        }}
                      >
                        Apply
                      </button>
                      {/* {applied ? <CircularProgress /> : null} */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
const exp = new Array(19).fill(undefined);
//Nationality, Countries List in JavaScript Angular Array
const Nationalities = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas (the)" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia (Plurinational State of)" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory (the)" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "KY", name: "Cayman Islands (the)" },
  { code: "CF", name: "Central African Republic (the)" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands (the)" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros (the)" },
  { code: "CD", name: "Congo (the Democratic Republic of the)" },
  { code: "CG", name: "Congo (the)" },
  { code: "CK", name: "Cook Islands (the)" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Curaçao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic (the)" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (the) [Malvinas]" },
  { code: "FO", name: "Faroe Islands (the)" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories (the)" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia (the)" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "VA", name: "Holy See (the)" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran (Islamic Republic of)" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea (the Democratic People's Republic of)" },
  { code: "KR", name: "Korea (the Republic of)" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic (the)" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands (the)" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia (Federated States of)" },
  { code: "MD", name: "Moldova (the Republic of)" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands (the)" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger (the)" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands (the)" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines (the)" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "MK", name: "Republic of North Macedonia" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation (the)" },
  { code: "RW", name: "Rwanda" },
  { code: "RE", name: "Réunion" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin (French part)" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten (Dutch part)" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan (the)" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands (the)" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates (the)" },
  {
    code: "GB",
    name: "United Kingdom of Great Britain and Northern Ireland (the)",
  },
  { code: "UM", name: "United States Minor Outlying Islands (the)" },
  { code: "US", name: "United States of America (the)" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela (Bolivarian Republic of)" },
  { code: "VN", name: "Viet Nam" },
  { code: "VG", name: "Virgin Islands (British)" },
  { code: "VI", name: "Virgin Islands (U.S.)" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "AX", name: "Åland Islands" },
];
