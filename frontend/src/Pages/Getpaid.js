import React, { useEffect, useState } from "react";
import "../Styles/get-paid.css";
import AsideNavbar from "../Components/AsideNavbar";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { withdrawAmount } from "../Redux/actions/withdrawals.actions";
import { loadUser } from "../Redux/actions/user.actions";

const GetPaid = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.withdrawal);
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount < 200) {
      return toast.info(`Minimum withdrawal amount is 200/=`);
    }
    try {
      await dispatch(withdrawAmount(user.userId, amount, user.phoneNumber, user.email, user.username));
      dispatch(loadUser())
    } catch (error) {
      toast.error(error?.response?.data?.message || `error withdrawaing funds`)
      // Error handled by Redux actions, toast displayed there
    }
  };

  return (
    <>
      <AsideNavbar />
      <div className="signup-container" style={{marginLeft:'20px'}}>
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h1>Withdraw Funds</h1>
          <h2>
            Account Balance:{" "}
            <span style={{color:'blue'}}>
              Kes.
              {user.totalBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </h2>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="(Minimum withdrawal is 200)"
            required
          />
          <button
            type="submit"
            disabled={loading || amount < 200 || amount > user.totalBalance}
          >
            {loading ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </div>
    </>
  );
};

export default GetPaid;
