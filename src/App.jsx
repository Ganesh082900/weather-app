import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/login/Login";
import ForgotPassword from "./components/login/ForgotPassword";
import OtpVerification from "./components/login/OtpVerification";
import ResetPassword from "./components/login/RestPassword";
// Main pages 
import Home from "./components/home/Home";
import ViewLeads from "./components/pages/viewLeads";
import CreateSchoolLead from "./components/forms/CreateSchoolLead";
import CreateFranchise from "./components/forms/CreateFranchise";
import CreateSchoolAgent from "./components/forms/CreateSchoolAgent";
import CreateFranchiseAgent from "./components/forms/CreateFranchiseAgent";
import CreateREP from "./components/forms/CreateRep";
import CreateB2C from "./components/forms/CreateB2c";
import ExcelUploader from "./components/ExcelUploader/ExcelUploader";




function App() {
  return (
    <Router>
      <Routes>
        {/* LandingPage with nested routes */}
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="otp-verification" element={<OtpVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        {/* Other routes */}
        <Route path="/home" element={<Home />}>
          <Route index element={<ViewLeads />} />
          <Route path="view-leads" element={<ViewLeads />} />
          <Route path="create-school-lead" element={<CreateSchoolLead />} />
          <Route path="create-franchise" element={<CreateFranchise />} />
          <Route path="create-school-agent" element={<CreateSchoolAgent />} />
          <Route path="create-franchise-agent" element={<CreateFranchiseAgent />} />
          <Route path="create-rep" element={<CreateREP />} />
          <Route path="create-b2c" element={<CreateB2C />} />
          <Route path="create-admin" element={<ExcelUploader />} />
          <Route path="create-user" element={<ExcelUploader />} />
          <Route path="excel-update" element={<ExcelUploader />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
