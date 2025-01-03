import React, { useEffect } from "react";
import "../Styles/earn.css";
import AsideNavbar from "../Components/AsideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  GET_ALL_USER_ACTIVE_REFERRALS,
  GET_ALL_USER_INACTIVE_REFERRALS,
  GET_ALL_USER_REFERRALS,
  GET_TODAYS_REFERRALS,
} from "../Redux/actions/referrals.actions";
import { GET_ALL_USER_WITHDRAWALS } from "../Redux/actions/withdrawals.actions";

const Earn = () => {
  const { user } = useSelector((state) => state.user);
  const { deposit } = useSelector((state) => state.deposit);
  const { referrals, activeReferrals, inactiveReferrals, bonus } =
    useSelector((state) => state.referrals);
  const { withdrawals } = useSelector((state) => state.withdrawal);

  const dispatch = useDispatch();

  const percBonus = (0.0 * 0.2).toFixed(2);

  useEffect(() => {
    if (user.userId) {
      dispatch(GET_ALL_USER_REFERRALS(user.userId));
      dispatch(GET_ALL_USER_ACTIVE_REFERRALS(user.userId));
      dispatch(GET_ALL_USER_INACTIVE_REFERRALS(user.userId));
      dispatch(GET_TODAYS_REFERRALS(user.userId));
      dispatch(GET_ALL_USER_WITHDRAWALS(user.userId));
    }
  }, [user.userId, dispatch]);

  const referralEarnings = (activeReferrals.length * 50).toFixed(2) || 0.00;

  // Sum the pending withdrawal amounts
  const totalPendingWithdrawals = withdrawals
    .filter(withdrawal => withdrawal.activityStatus === "pending")
    .reduce((total, withdrawal) => total + parseFloat(withdrawal.activityAmount), 0)
    .toFixed(2);

  // Sum the total withdrawn amounts
  const totalWithdrawn = withdrawals
    .filter(withdrawal => withdrawal.activityStatus === "completed")
    .reduce((total, withdrawal) => total + parseFloat(withdrawal.activityAmount), 0)
    .toFixed(2);

  // console.log(bonus)
  // console.log(withdrawals);

  return (
    <>
      <AsideNavbar />
      <div
        className="earn-page"
        style={{ color: "blue", backgroundColor: "#f5f5f5" }}
      >
        <h1>Hi {user.username}!</h1>
        <p style={{ marginBottom: "20px", marginTop: "20px", color:'black' }}>
          Here is a summary of your earnings. Keep up the great work!
        </p>
        <div className="earn-container">
          <div className="earn-item">
            <h2>Kes.{user?.totalBalance.toLocaleString()}</h2>
            <span>Ultimate Balance</span>
          </div>
          {/* <div className="earn-item">
            <h2>Kes.15000</h2>
            <span>Total Payout</span>
          </div> */}
          <div className="earn-item">
            <h2>Kes.{deposit !== null ? deposit.toLocaleString() : "0.00"}</h2>
            <span>Total Deposit</span>
          </div>
          <div className="earn-item">
            <h2>Kes.{totalPendingWithdrawals}</h2>
            <span>Pending withdrawal</span>
          </div>
          <div className="earn-item">
            <h2>Kes.{percBonus}</h2>
            <span>20% Bonus</span>
          </div>
          <div className="earn-item">
            <h2>Kes.{bonus}</h2>
            <span>Referral Bonus</span>
          </div>
          <div className="earn-item">
            <h2>Kes.{referralEarnings}</h2>
            <span>Referral Earnings</span>
          </div>
          <div className="earn-item">
            <h2>Kes.{totalWithdrawn}</h2>
            <span>Total Withdrawn</span>
          </div>
          {/* <div className="earn-item">
            <h2>Kes.6000</h2>
            <span>Today's Earning</span>
          </div> */}
          <div className="earn-item">
            <h2>{activeReferrals?.length}</h2>
            <span>Active Referrals</span>
          </div>
          <div className="earn-item">
            <h2>{inactiveReferrals?.length}</h2>
            <span>Inactive Referrals</span>
          </div>
          <div className="earn-item">
            <h2>{referrals?.length}</h2>
            <span>Your Referrals</span>
          </div>
        </div>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
            color: "black",
          }}
        >
          Developed by{" "}
          <Link
            to="https://www.instagram.com/wayne_marwa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            style={{ color: "blue", textDecoration: "none" }}
          >
            @Wayne_Marwa.ke
          </Link>
        </p>
      </div>
    </>
  );
};

export default Earn;
