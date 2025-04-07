import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import Listing from "./Pages/Listing/Listing";
import NewPassword from "./Pages/NewPassword/NewPassword";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/Signup";
import Verification from "./Pages/Verification/Verification";
import ListingDetails from "./Pages/ListingDetails/ListingDetails";
import ListingProfile from "./Pages/ListingProfile/ListingProfile";
import TitleAbstractor from "./Pages/TitleAbstractor/TitleAbstractor";
import TitleCompany from "./Pages/TitleCompany/TitleCompany";
import RealEstateAttorney from "./Pages/RealEstateAttorney/RealEstateAttorney";
import RealEstateAgent from "./Pages/RealEstateAgent/RealEstateAgent";
import AppraisalCompany from "./Pages/AppraisalCompany/AppraisalCompany";
import SurveyorCompany from "./Pages/SurveyorCompany/SurveyorCompany";
import { MyProvider } from "./Context/Context";
import UseFulLinks from "./Pages/UseFulLinks/UseFulLinksStates";
import UseFulLinks2 from "./Pages/UseFulLinks/UseFulLinksCounty";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ContactUs from "./Pages/ContactUs/ContactUs";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TitleCompany2 from "./Pages/TitleCompany/TitleCompany2";
import RealEstateAgent2 from "./Pages/RealEstateAgent/RealEstateAgent2";
import RealEstateAttorney2 from "./Pages/RealEstateAttorney/RealEstateAttorney2";
import AppraisalCompany2 from "./Pages/AppraisalCompany/AppraisalCompany2";
import SurveyorCompany2 from "./Pages/SurveyorCompany/SurveyorCompany2";
import Admin from './Admin/Admin'

export default function App() {
  return (
    <MyProvider>
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/use-ful-links" element={<UseFulLinks/>} />
        <Route path="/use-ful-links/:id" element={<UseFulLinks2/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Listing" element={<Listing />} />
        <Route path="/Newpassword" element={<NewPassword />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/ListingDetails" element={<ListingDetails />} />
        <Route path="/ListingProfile" element={
          
         <PrivateRoute><ListingProfile /></PrivateRoute>} />
        <Route path="/Business/TitleAbstractor" element={<TitleAbstractor />} />     
        <Route path="/Business/TitleCompany" element={<TitleCompany2 />} />
        <Route path="/Business/RealEstateAgent" element={<RealEstateAgent2 />} />
        <Route
          path="/Business/RealEstateAttorney"
          element={<RealEstateAttorney2 />}
        />
        <Route path="/Business/SurveyorCompany" element={<SurveyorCompany2 />} />
        <Route
          path="/Business/AppraisalCompany"
          element={<AppraisalCompany2 />}
        />
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/terms-conditions" element={<TermsAndConditions/>}/> 
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/> 
        <Route
            path="/admin/*"
            element={<Admin />}
          />
      </Routes>
    </Router>
    </MyProvider>
  );
}
