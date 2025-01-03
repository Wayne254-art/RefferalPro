import React, { useEffect } from "react";
import "../Styles/verification.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchDeposit } from "../Redux/actions/deposits.actions";

const Verification = () => {
  const { user } = useSelector((state) => state.user);
  const { deposit, loading, error } = useSelector((state) => state.deposit);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchDeposit(user.userId));
    }
  }, [dispatch, user.userId]);

  useEffect(() => {
    if (!loading && deposit !== null && deposit >= 100) {
      navigate(`/dashboard/${user.userId}`);
    }
  }, [loading, deposit, user.userId, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }
  return (
    <div
      className="cover g-bg-img-hero cover g-flex-centered g-pos-rel g-py-100"
      id="cover-picture-GRC004-0"
      style={{ height: "100vh" }}
    >
      <div className="proceed-form-container">
        <form>
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            Confirm Your Payment Status to Continue
          </h4>
          <label htmlFor="contact" />
          <input
            type="text"
            id="contact"
            placeholder="contact"
            value={user.phoneNumber}
            readOnly
          />
          <label htmlFor="amount" />
          <input
            type="number"
            id="amount"
            placeholder="amount"
            value="100"
            readOnly
          />
          <label htmlFor="status" />
          <input
            type="text"
            id="status"
            placeholder="status"
            value="{status}"
            readOnly
          />
          <label htmlFor="transactionId" />
          <input
            type="text"
            id="transactionId"
            placeholder="transaction_id"
            value="{transactionId}"
            readOnly
          />
          <button type="button">Continue</button>
          <Link
            to={`/payment/${user.userId}`}
            className="signup-link"
            style={{ marginTop: "20px" }}
          >
            Make Payment
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Verification;
