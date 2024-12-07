import { Routes, Route, Navigate } from "react-router-dom";
import { contextData } from "./context/AuthContext";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import PasswordReset from "./pages/Auth/PasswordReset";
import Register from "./pages/Auth/Register";
import { useEffect } from "react";
// Doctor Routes
import DrLayout from "./components/Layout/DrLayout/DrLayout";
import DrDashboard from "./pages/DrDashboard/DrDashboard";
import DrAppointment from "./pages/DrDashboard/DrAppointment";
import DrProfile from "./pages/DrDashboard/DrProfile";
import DrSetting from "./pages/DrDashboard/DrSetting";
import UpdateDoctorDashboard from "./pages/DrDashboard/UpdateDoctorDashboard";
// Hospital Routes
import HsLayout from "./components/Layout/HsLayout/HsLayout";
import HsDashboard from "./pages/HsDashboard/HsDashboard";
import HsAppointment from "./pages/HsDashboard/HsAppointment";
import HsProfile from "./pages/HsDashboard/HsProfile";
import HsSettings from "./pages/HsDashboard/HsSettings";
import UpdateHospitalDashboard from "./pages/HsDashboard/UpdateHospitalDashboard";

function App() {
const {fetching, user} = contextData();

  useEffect(() => {
    // this effect is added to trigger a re-render when the user state changes
  }, [user]);

  if (fetching) return <Loader/>
  if (!user) {
    return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset/:page" element={<PasswordReset />} />
        
        {/* Redirects and Fallback */}
        <Route path="/dashboard/*" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  if (user.accountType === "doctor") {
    if (user.userName === "") {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard/doctor" />} />
          <Route
            path="/dashboard/doctor"
            element={<UpdateDoctorDashboard />}
          />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset/:page" element={<PasswordReset />} />
        <Route path="*" element={<Navigate to="/dashboard/doctor" />} />
        <Route path="/dashboard/doctor" element={<DrLayout />}>
          <Route index element={<DrDashboard />} />
          <Route path="home" element={<DrDashboard />} />
          <Route path="profile" element={<DrProfile />} />
          <Route path="appointment" element={<DrAppointment />} />
          <Route path="settings" element={<DrSetting />} />
        </Route>
        <Route path="/login" element={<Navigate to="/dashboard/doctor" />} />
        <Route path="/register" element={<Navigate to="/dashboard/doctor" />} />
      </Routes>
    );
  }
  

  if (user.accountType === "hospital") {
    if (user.userName === "") {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard/hospital" />} />
          <Route
            path="/dashboard/hospital"
            element={<UpdateHospitalDashboard />}
          />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset/:page" element={<PasswordReset />} />
        <Route path="*" element={<Navigate to="/dashboard/hospital" />} />
        <Route path="/dashboard/hospital" element={<HsLayout />}>
          <Route index element={<HsDashboard />} />
          <Route path="home" element={<HsDashboard />} />
          <Route path="profile" element={<HsProfile />} />
          <Route path="settings" element={<HsSettings />} />
          <Route path="appointment" element={<HsAppointment />} />
        </Route>
        <Route path="/login" element={<Navigate to="/dashboard/hospital" />} />
        <Route path="/register" element={<Navigate to="/dashboard/hospital" />} />
      </Routes>
    );
  }

  return null;
}

export default App;
