import React, { useEffect, useState } from "react";
import "../Styles/payment.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiKey, paymentApiBaseUrl, server } from "../config/serverapi";
import { toast } from "react-toastify";
import { fetchDeposit } from "../Redux/actions/deposits.actions";

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const { deposit,  error } = useSelector((state) => state.deposit);

const [loading, setLoading] = useState(false)

  const getFormattedTimestamp = () => {
    const date = new Date(Date.now()); // Add 1 hour (3600000 milliseconds)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  function convertPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith(`+254`)) {
      return "0" + phoneNumber.slice(4);
    }
    return phoneNumber;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.userId) {
      dispatch(fetchDeposit(user.userId));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!loading && deposit !== null && deposit > 499) {
      navigate(`/verification/${user.userId}`);
    }
  }, [loading, deposit, user.userId, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }
  // if (error) return <div>{error}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };

    let responseData;
    const originalPhoneNumber = user.phoneNumber;

    // Convert phone number
    const convertedPhoneNumber = convertPhoneNumber(originalPhoneNumber);

    try {
      const response = await axios.post(
        `${paymentApiBaseUrl}`,
        {
          amount: 100,
          phone: convertedPhoneNumber,
        },
        config
      );
      responseData = response.data.data;
      console.log(responseData);
      toast.info(`Waiting for payment validation...`);
    } catch (error) {
      
    setLoading(false);
      console.error(error.response.data);
      toast.error(error?.response?.data || `Error in processing payments`);
      return;
    }

    setLoading(true);
    try {
      const data = {
        userId: user.userId,
        activityAmount: responseData.amount,
        transactionId: responseData.refference,
        paymentDate: getFormattedTimestamp(),
        phoneNumber: responseData.phone,
        CheckoutRequestID: responseData.CheckoutRequestID,
      };

      const response = await axios.post(
        `${server}/activity/add-deposit`,
        data,
        { withCredentials: true }
      );

      toast.success(response.data.message);
      navigate(`/verification/${user.userId}`);
    } catch (error) {
      
    setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/auth/logout-user`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success(response.data.message);
      window.location.reload(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div
      className="cover g-bg-img-hero cover g-flex-centered g-pos-rel g-py-100"
      id="cover-picture-GRC004-0"
      style={{ height: "100vh" }}
    >
      <div className="payment-container">
        <h4 style={{ marginBottom: "20px" }}>Make a Payment</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="phoneNumber" />
          <input
            type="text"
            id="phoneNumber"
            placeholder="contact"
            value={user.phoneNumber}
            readOnly
          />
          <label htmlFor="amount" />
          <input
            type="number"
            id="amount"
            placeholder="amount"
            value={100}
            readOnly
          />
          <button type="submit" disabled={loading}>
            {loading ? `Processing` : `Pay Now`}
          </button>
        </form>
        {/* {paymentStatus && <p className="payment-status">{paymentStatus}</p>} */}
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          Made Payment?{" "}
          <Link to={`/verification/${user.userId}`} className="signup-link">
            Continue
          </Link>
        </p>
      </div>
      <div className="button-container">
        <button className="button" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Payment;
