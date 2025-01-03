// src/redux/actions/withdrawalActions.js
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../config/serverapi";

// Action creators
export const fetchWithdrawalRequests = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_WITHDRAWAL_REQUESTS_REQUEST" });
    const { data } = await axios.get(
      `${server}/activity/get-withdrawal-request`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "FETCH_WITHDRAWAL_REQUESTS_SUCCESS",
      payload: data.withdrawals,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_WITHDRAWAL_REQUESTS_FAILURE",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const updateWithdrawalStatus = (requestId) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_WITHDRAWAL_STATUS_REQUEST" });
    await axios.post(
      `${server}/activity/change-withdrawal-status/${requestId}`,
      {},
      {
        withCredentials: true,
      }
    );
    toast.success("Status updated successfully");
    dispatch({
      type: "UPDATE_WITHDRAWAL_STATUS_SUCCESS",
      payload: requestId,
    });
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({
      type: "UPDATE_WITHDRAWAL_STATUS_FAILURE",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const GET_ALL_USER_WITHDRAWALS = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_USERS_WITHDRAWAL_REQUEST" });
    const response = await axios.get(
      `${server}/activity/get-user-withdrawals/${userId}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "GET_ALL_USERS_WITHDRAWAL_SUCCESS",
      payload: response.data.withdrawals,
    });
    // console.log(response.data.withdrawals)
  } catch (error) {
    dispatch({
      type: "GET_ALL_USERS_WITHDRAWAL_FAIL",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

// Async action to perform withdrawal
export const withdrawAmount =
  (userId, activityAmount, phoneNumber, email, username) => async (dispatch) => {
    dispatch({ type: "WITHDRAWAL_REQUEST" });
    try {
      const response = await axios.post(
        `${server}/activity/add-withdrawal-request/${userId}`,
        { activityAmount, phoneNumber,email, username },
        { withCredentials: true }
      );

      dispatch({
        type: "WITHDRAWAL_SUCCESS",
        payload: response.data.message,
      });
      toast.success(response.data.message);
      // console.log(response.data.message)
      // Optionally return any data you might need
      return response.data;
    } catch (error) {
      dispatch({
        type: " WITHDRAWAL_FAIL",
        payload: error,
      });
      toast.error(
        error?.response?.data?.message || "Failed to withdraw amount"
      );
      throw error; // Rethrow the error to handle it in the component if needed
    }
  };
