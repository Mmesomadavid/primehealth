import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
// import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PasswordReset from "./pages/Auth/PasswordReset";
import { contextData } from "./context/AuthContext";
import Loader from "./components/Loader";
import DrLayout from "./components/Layout/DrLayout";
import HsLayout from "./components/Layout/HsLayout";

// Doctor Pages
import UpdateDoctorProfile from "./pages/DsDashboard/UpdateProfile";
import DoctorDashboard from "./pages/DsDashboard/DsDashboard";
import DoctorAppointments from "./pages/DsDashboard/DsAppointments";
import DoctorReports from "./pages/DsDashboard/DsReports";
import DoctorPatients from "./pages/DsDashboard/DsPatients";
import DoctorMessages from "./pages/DsDashboard/DsMessages";

// Hospital Pages
import UpdateHospitalProfile from "./pages/HsDashboard/UpdateProfile";
import HospitalDashboard from "./pages/HsDashboard/HsDashboard";
import HospitalDoctors from "./pages/HsDashboard/HsDoctors";
import HospitalPatients from "./pages/HsDashboard/HsPatients";
import DoctorSettings from "./pages/DsDashboard/DsSettings";
import DoctorsInbox from "./pages/DsDashboard/DsInbox";
import DoctorProfilePage from "./pages/DsDashboard/DoctorProfilePage";
import HospitalProfile from "./pages/HsDashboard/HsProfile";
import HospitalInbox from "./components/HsDashboard/HsInbox";

function App() {
  const { fetching, user } = contextData();

  useEffect(() => {}, [user]);

  if (fetching) return <Loader />;

  if (!user) {
    return (
      <Routes>
        {/* Public routes */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (user.accountType === "doctor") {
    if (!user.username) {
      return (
        <Routes>
          <Route
            path="/dashboard/doctor/update-profile"
            element={<UpdateDoctorProfile />}
          />
          <Route
            path="*"
            element={<Navigate to="/dashboard/doctor/update-profile" replace />}
          />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/dashboard/doctor" element={<DrLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="events" element={<DoctorAppointments />} />
          <Route path="manage" element={<DoctorPatients />} />
          <Route path="messages" element={<DoctorMessages />} />
          <Route path="inbox" element={<DoctorsInbox />} />
          <Route path="reports" element={<DoctorReports />} />
          <Route path="profile" element={<DoctorProfilePage/>} />
          <Route path="settings" element={<DoctorSettings />} />
          <Route path="update-profile" element={<UpdateDoctorProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard/doctor" replace />} />
      </Routes>
    );
  }

  if (user.accountType === "hospital") {
    if (!user.organisationName) {
      return (
        <Routes>
          <Route
            path="/dashboard/hospital/update-profile"
            element={<UpdateHospitalProfile />}
          />
          <Route
            path="*"
            element={<Navigate to="/dashboard/hospital/update-profile" replace />}
          />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/dashboard/hospital" element={<HsLayout />}>
          <Route index element={<HospitalDashboard />} />
          <Route path="doctors" element={<HospitalDoctors />} />
          <Route path="patients" element={<HospitalPatients />} />
          <Route path="profile" element={<HospitalProfile/>} />
          <Route path="inbox" element={<HospitalInbox/>} />
          <Route path="update-profile" element={<UpdateHospitalProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard/hospital" replace />} />
      </Routes>
    );
  }

  return null;
}

export default App;