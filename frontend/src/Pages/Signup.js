import React, { useEffect, useState } from "react";
import "../Styles/sign-up.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../config/serverapi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {  isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  // Function to parse query string
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const referralCode = query.get("referralCode");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    referrerCode: referralCode,
    lastName: "",
    firstName: "",
  });

  const handleChange = (e) => {
    setFormData((values) => {
      return { ...values, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/auth/create-user`, formData);
      toast.success(data.message);
      setError(false);
      setLoading(false);
      navigate(`/login`);
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  // console.log(formData)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/payment/${user.userId}`);
    }
  }, [isAuthenticated,loading, error, navigate]);

  return (
    <div
      className="cover g-bg-img-hero cover g-flex-centered g-pos-rel g-py-100"
      id="cover-picture-GRC004-0"
    >
      <div className="signup-container">
        <form
          className="signup-form"
          style={{ color: "#00d134" }}
          onSubmit={handleSubmit}
        >
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            Please fill in Your Personal Details to Continue
          </h4>

          {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}
          <input
            type="text"
            placeholder="First_Name"
            name="firstName"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last_Name"
            name="lastName"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleChange}
          />
          <input
            type="tel"
            placeholder="Phone_Number"
            name="phoneNumber"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder=" Refferal Code (optional)"
            value={referralCode ? referralCode : ""}
            name="referralCode"
            onChange={handleChange}
            // required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Signup"}
          </button>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            Have an account?{" "}
            <a href="/login" className="signup-link">
              Signin
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
