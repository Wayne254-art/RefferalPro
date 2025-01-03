import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/dashboard";
import AdminDashboard from "./Admin/Dashboard/admindashboard";
import Share from "./Pages/Share";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Getpaid from "./Pages/Getpaid";
import Earn from "./Pages/Earn";
import Payment from "./Pages/Payment";
import Verification from "./Pages/Verification";
import Activation from "./Pages/Activation.js";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Store from "./Redux/store.js";
import { loadUser } from "./Redux/actions/user.actions.js";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ContactUs from "./Pages/ContactUs.js";
import Settings from "./Pages/Settings.js";
import WithdrawalRequests from "./Admin/withdrawals/withdrawal.js";
import AdminProtectedRoutes from "./routes/AdminProtectedRoutes.jsx";
import Users from "./Admin/Users/Users.js";
import Referrals from "./Admin/Refferals/Refferals.js";
import UserDetails from "./Components/UserDetails.js";
import EditUser from "./Admin/Users/EditUser.jsx";
import CreateUser from "./Admin/Users/CreateUser.jsx";
import SpinningWheel from "./Pages/SpinningWheel.js";
import MailPage from "./Admin/Support/MailPage.js";

const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/spin" element={<SpinningWheel />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:token" element={<Activation />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/users"
          element={
            <AdminProtectedRoutes>
              <Users />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/create-user"
          element={
            <AdminProtectedRoutes>
              <CreateUser />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/mails"
          element={
            <AdminProtectedRoutes>
              <MailPage />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/Edituser/:userId"
          element={
            <AdminProtectedRoutes>
              <EditUser />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <AdminProtectedRoutes>
              <UserDetails />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/referrals"
          element={
            <AdminProtectedRoutes>
              <Referrals />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/withdrawal-requests"
          element={
            <AdminProtectedRoutes>
              <WithdrawalRequests />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <AdminProtectedRoutes>
              <AdminDashboard />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/:userId"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/share/:userId"
          element={
            <ProtectedRoutes>
              <Share />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/getpaid/:userId"
          element={
            <ProtectedRoutes>
              <Getpaid />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/earn/:userId"
          element={
            <ProtectedRoutes>
              <Earn />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/payment/:userId"
          element={
            <ProtectedRoutes>
              <Payment />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/verification/:userId"
          element={
            <ProtectedRoutes>
              <Verification />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/contact/:userId"
          element={
            <ProtectedRoutes>
              <ContactUs />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/settings/:userId"
          element={
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
