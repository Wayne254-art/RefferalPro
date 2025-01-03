import React, { useEffect } from "react";
import "./dashboard.css";
import AsideNavbar from "../../Components/AsideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_TOTAL_DEPOSITS } from "../../Redux/actions/deposits.actions";
import { fetchWithdrawalRequests } from "../../Redux/actions/withdrawals.actions";
import {
  GET_ALL_USER_ACTIVE_REFERRALS,
  GET_ALL_USER_INACTIVE_REFERRALS,
  GET_ALL_USER_REFERRALS,
} from "../../Redux/actions/referrals.actions";

const AdminDashboard = () => {
  const { adminDeposits } = useSelector((state) => state.deposit);
  const { users, user, loading } = useSelector((state) => state.user);
  const { referrals, activeReferrals, inactiveReferrals } = useSelector(
    (state) => state.referrals
  );
  const { requests } = useSelector((state) => state.withdrawal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_ALL_TOTAL_DEPOSITS());
    dispatch(fetchWithdrawalRequests());
    if (user?.userId) {
      dispatch(GET_ALL_USER_REFERRALS(user.userId));
      dispatch(GET_ALL_USER_ACTIVE_REFERRALS(user.userId));
      dispatch(GET_ALL_USER_INACTIVE_REFERRALS(user.userId));
    }
  }, [dispatch, user?.userId]);

  // Calculate statistics
  const totalCompletedDeposits = Array.isArray(adminDeposits)
    ? adminDeposits
        .filter((deposit) => deposit.activityStatus === "completed")
        .reduce(
          (total, deposit) => total + parseFloat(deposit.activityAmount),
          0
        )
        .toFixed(2)
    : "0.00";

  const totalPendingDeposits = Array.isArray(adminDeposits)
    ? adminDeposits
        .filter((deposit) => deposit.activityStatus === "pending")
        .reduce(
          (total, deposit) => total + parseFloat(deposit.activityAmount),
          0
        )
        .toFixed(2)
    : "0.00";

  const totalPendingWithdrawals = Array.isArray(requests)
    ? requests
        .filter((withdrawal) => withdrawal.activityStatus === "pending")
        .reduce(
          (total, withdrawal) => total + parseFloat(withdrawal.activityAmount),
          0
        )
        .toFixed(2)
    : "0.00";

  const totalCompletedWithdrawn = Array.isArray(requests)
    ? requests
        .filter((request) => request.activityStatus === "completed")
        .reduce(
          (total, request) => total + parseFloat(request.activityAmount),
          0
        )
        .toFixed(2)
    : "0.00";

  const totalUsers = users.length || 0;
  const totalActiveUsers =
    users.filter((user) => user.isActive === 1).length || 0;
  const totalDeactivatedUsers =
    users.filter((user) => user.isActive === 0).length || 0;

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
      <div className="admin-dashboard">
        <div className="dashboard-content">
          <h1>Admin Dashboard</h1>

          {/* Deposits and Withdrawals Table */}
          <h2>Deposits and Withdrawals</h2>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Completed Deposits</td>
                <td>Kes. {totalCompletedDeposits}</td>
              </tr>
              <tr>
                <td>Total Pending Deposits</td>
                <td>Kes. {totalPendingDeposits}</td>
              </tr>
              <tr>
                <td>Total Pending Withdrawal Requests</td>
                <td>Kes. {totalPendingWithdrawals}</td>
              </tr>
              <tr>
                <td>Total Completed Withdrawals</td>
                <td>Kes. {totalCompletedWithdrawn}</td>
              </tr>
            </tbody>
          </table>

          {/* Users Table */}
          <h2>Users</h2>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Users</td>
                <td>{totalUsers}</td>
              </tr>
              <tr>
                <td>Total Active Users</td>
                <td>{totalActiveUsers}</td>
              </tr>
              <tr>
                <td>Total Deactivated Users</td>
                <td>{totalDeactivatedUsers}</td>
              </tr>
            </tbody>
          </table>

          {/* Referrals Table */}
          <h2>Referrals</h2>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Admin Referrals</td>
                <td>{Array.isArray(referrals) ? referrals.length : 0}</td>
              </tr>
              <tr>
                <td>Total Admin Active Referrals</td>
                <td>
                  {Array.isArray(activeReferrals) ? activeReferrals.length : 0}
                </td>
              </tr>
              <tr>
                <td>Total Admin Inactive Referrals</td>
                <td>
                  {Array.isArray(inactiveReferrals)
                    ? inactiveReferrals.length
                    : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
