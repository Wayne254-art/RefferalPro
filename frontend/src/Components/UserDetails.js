import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import AsideNavbar from "./AsideNavbar";
import "../Styles/userDetails.css";
import {
  GET_ALL_USERS,
  changeUserAccountRole,
  changeUserAccountStatus,
  deleteUser,
  loadUserDetails,
} from "../Redux/actions/user.actions";
import UserStatus from "./UserStatus";
import { fetchDeposit } from "../Redux/actions/deposits.actions";
import { GET_ALL_USER_WITHDRAWALS } from "../Redux/actions/withdrawals.actions";

const UserDetails = () => {
  const { userId } = useParams();
  const { deposit } = useSelector((state) => state.deposit);
  const { userDetails, accountStatus, loading } = useSelector(
    (state) => state.user
  );
  const { referrals, activeReferrals, inactiveReferrals, bonus } =
  useSelector((state) => state.referrals);
  const { withdrawals } = useSelector((state) => state.withdrawal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("user")

  const handleDeleteUser = () => {
    dispatch(deleteUser(userId));
    dispatch(GET_ALL_USERS());
    navigate("/users");
  };

  const handleChangeAccountStatus = (e) => {
    e.preventDefault();
    dispatch(changeUserAccountStatus(userId));
    dispatch(loadUserDetails(userId))
  };

  const handleChangeAccountType = (e) => {
    e.preventDefault();
    dispatch(changeUserAccountRole(userId, role));
    dispatch(loadUserDetails(userId));
    // navigate(`/users`)
  };

  useEffect(() => {
    dispatch(loadUserDetails(userId));
    dispatch(fetchDeposit(userId));
    dispatch(GET_ALL_USER_WITHDRAWALS(userId));
  }, [dispatch, userId]);

  // Sum the pending withdrawal amounts
  const totalPendingWithdrawals = withdrawals
    .filter((withdrawal) => withdrawal.activityStatus === "pending")
    .reduce(
      (total, withdrawal) => total + parseFloat(withdrawal.activityAmount),
      0
    )
    .toFixed(2);

  // Sum the total withdrawn amounts
  const totalWithdrawn = withdrawals
    .filter((withdrawal) => withdrawal.activityStatus === "completed")
    .reduce(
      (total, withdrawal) => total + parseFloat(withdrawal.activityAmount),
      0
    )
    .toFixed(2);

  // total withdrawal request
  const totalWithdrawalrequests = withdrawals
    .reduce(
      (total, withdrawal) => total + parseFloat(withdrawal.activityAmount),
      0
    )
    .toFixed(2);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <AsideNavbar />
      <div className="user-details">
        <div className="user-info">
          <h2>User Information</h2>
          <img
            src={userDetails?.avatar}
            alt="Profile"
            className="profile-image"
            style={{ cursor: "pointer" }}
          />
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>User ID:</strong>
                </td>
                <td>{userId}</td>
              </tr>
              <tr>
                <td>
                  <strong>Username:</strong>
                </td>
                <td>{userDetails?.username}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{userDetails?.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone Number:</strong>
                </td>
                <td>{userDetails?.phoneNumber}</td>
              </tr>
              <tr>
                <td>
                  <strong>Account Type:</strong>
                </td>
                <td>{userDetails?.role}</td>
              </tr>
              <tr>
                <td>
                  <strong>Referral Code:</strong>
                </td>
                <td>{userDetails?.referralCode}</td>
              </tr>
              <tr>
                <td>
                  <strong>Account Status:</strong>
                </td>
                <td>
                  <UserStatus userDetails={accountStatus} />
                </td>
              </tr>
            </tbody>
          </table>

          <h3>User Referrals Stats</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Total Refferals Count:</strong>
                </td>
                <td>{referrals.length}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Active Referrals Count:</strong>
                </td>
                <td>{activeReferrals.length} </td>
              </tr>
              <tr>
                <td>
                  <strong>Total Inactive Referrals Count:</strong>
                </td>
                <td>{inactiveReferrals.length} </td>
              </tr>
            </tbody>
          </table>
          <h3>User Funds Stats</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>User Account Balance:</strong>
                </td>
                <td>Kes: {userDetails?.totalBalance}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Deposits:</strong>
                </td>
                <td>Kes. {deposit}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Withdrawals:</strong>
                </td>
                <td>Kes. {totalWithdrawn}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Pending Withdrawals:</strong>
                </td>
                <td>Kes. {totalPendingWithdrawals}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Withdrawals Request:</strong>
                </td>
                <td>Kes. {totalWithdrawalrequests}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="user-actions">
      <h2>Actions</h2>
      <button onClick={handleDeleteUser} className="delete-button">
        Delete User
      </button>
      <button
        onClick={handleChangeAccountStatus}
        className={accountStatus ? "deactivated-status" : "active-status"}
      >
        {accountStatus ? "Deactivate User" : "Activate User"}
      </button>
      <button onClick={() => navigate(`/Edituser/${userId}`)} className="edit-button">Edit User</button>

      <form onSubmit={handleChangeAccountType} style={{width:`100%`}}>
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="change-role-button">
          Change Account Type
        </button>
      </form>
    </div>
      </div>
    </>
  );
};

export default UserDetails;
