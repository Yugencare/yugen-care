import { configureStore } from "@reduxjs/toolkit";
import servicepageReducer from "./servicepage";
import frontpageReducer from "./frontpage";
import homepageReducer from "./homepage";
import aboutpageReducer from "./aboutpage";
import servicespageReducer from "./servicespage";
import professionalReducer from "./professionalpage";
import shopReducer from "./shoppage";
import careerReducer from "./careerpage";
import contactReducer from "./contactus";
import innerserviceReducer from "./innerservicepage";
import treatmentReducer from "./treatmentpage";
import getmenuReducer from "./getmenu";
import blogpageReducer from "./Blogs/blogpage";
import blogsReducer from "./Blogs/allblogs";
import innerblogReducer from "./Blogs/innerblogpage";
import doctorReducer from "./getdoctor";
import footerReducer from "./footer";
import postReducer from "./Blogs/postreview";
import profileIndexReducer from "./Account/menu";
import loginUserReducer from "./Account/loginUser";
import registerUserReducer from "./Account/registerUser";
import appBarReducer from "./Components/appBar";
import testimonialsReducer from "./Testimonials/testimonials";
import serviceIntroReducer from "./ServiceIntro/serviceintro";
import cartReducer from "./Cart/cart";
import departmentsReducer from "./Booking/department";
import doctorsReducer from "./Booking/doctors";
import timeslotsReducer from "./Booking/timeslots";
import bookingdataReducer from "./Booking/profileData";
import appointmentsReducer from "./Booking/appointments";
import saveprofileReducer from "./Account/selfRegistration";
import journeyReducer from "./journeypage";
import membershipReducer from "./membership";
import teamsReducer from "./Teams/getteams";
import productsReducer from "./E-commerce/products";
import lanReducer from "./Tranlation/localisation";
import OrderReducer from "./E-commerce/order";
import LoyaltyReducer from "./Loyalty/loyalty";
import postProductReducer from "./E-commerce/postreview";

export default configureStore({
  reducer: {
    frontpage: frontpageReducer,
    servicepage: servicepageReducer,
    homepage: homepageReducer,
    aboutpage: aboutpageReducer,
    servicespage: servicespageReducer,
    professional: professionalReducer,
    shop: shopReducer,
    career: careerReducer,
    contact: contactReducer,
    innerservice: innerserviceReducer,
    treatment: treatmentReducer,
    getmenu: getmenuReducer,
    blogpage: blogpageReducer,
    blogs: blogsReducer,
    innerblog: innerblogReducer,
    footer: footerReducer,
    doctor: doctorReducer,
    post: postReducer,
    profileIndex: profileIndexReducer,
    loginUser: loginUserReducer,
    registerUser: registerUserReducer,
    appBar: appBarReducer,
    testimonials: testimonialsReducer,
    serviceIntro: serviceIntroReducer,
    cart: cartReducer,
    departments: departmentsReducer,
    doctors: doctorsReducer,
    timeslots: timeslotsReducer,
    bookingdata: bookingdataReducer,
    appointments: appointmentsReducer,
    saveprofile: saveprofileReducer,
    journey: journeyReducer,
    membership: membershipReducer,
    teams: teamsReducer,
    products: productsReducer,
    lang: lanReducer,
    order: OrderReducer,
    loyalty: LoyaltyReducer,
    productpost: postProductReducer,
  },
});
