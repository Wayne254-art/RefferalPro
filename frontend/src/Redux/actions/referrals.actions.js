import axios from "axios";
import { server } from "../../config/serverapi";

// Fetch all user referrals
export const GET_ALL_USER_REFERRALS = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_USER_REFERRALS_REQUEST" });
    const { data } = await axios.get(
      `${server}/referral/get-all-user-referrals/${userId}`,
      { withCredentials: true }
    );
    dispatch({
      type: "GET_ALL_USER_REFERRALS_SUCCESS",
      payload: data.referrals,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_USER_REFERRALS_FAIL",
      payload: error.response?.data?.message || "Failed to load user referrals",
    });
  }
};
// Fetch all  referrals
export const GET_ALL_REFERRALS = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_REFERRALS_REQUEST" });
    const { data } = await axios.get(
      `${server}/referral/get-all-referrals`,
      { withCredentials: true }
    );
    // console.log(data)
    dispatch({
      type: "GET_ALL_REFERRALS_SUCCESS",
      payload: data.allReferrals,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_REFERRALS_FAIL",
      payload: error.response?.data?.message || "Failed to load  referrals",
    });
  }
};

// Fetch active user referrals
export const GET_ALL_USER_ACTIVE_REFERRALS = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_USER_ACTIVE_REFERRALS_REQUEST" });
    const { data } = await axios.get(
      `${server}/referral/get-all-active-user-referrals/${userId}`,
      { withCredentials: true }
    );
    dispatch({
      type: "GET_ALL_USER_ACTIVE_REFERRALS_SUCCESS",
      payload: data.activeReferrals,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_USER_ACTIVE_REFERRALS_FAIL",
      payload:
        error.response?.data?.message || "Failed to load active user referrals",
    });
  }
};

// Fetch inactive user referrals
export const GET_ALL_USER_INACTIVE_REFERRALS = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_USER_INACTIVE_REFERRALS_REQUEST" });
    const { data } = await axios.get(
      `${server}/referral/get-all-inactive-user-referrals/${userId}`,
      { withCredentials: true }
    );
    dispatch({
      type: "GET_ALL_USER_INACTIVE_REFERRALS_SUCCESS",
      payload: data.inactiveReferrals,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_USER_INACTIVE_REFERRALS_FAIL",
      payload:
        error.response?.data?.message ||
        "Failed to load inactive user referrals",
    });
  }
};

// Fetch inactive user referrals
export const GET_TODAYS_REFERRALS = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_TODAYS_REFERRALS_REQUEST" });
    const { data } = await axios.get(
      `${server}/referral/get-todays-referral-bonus/${userId}`,
      { withCredentials: true }
    );
    dispatch({
      type: "GET_TODAYS_REFERRALS_SUCCESS",
      payload: data.bonus,
    });
  } catch (error) {
    dispatch({
      type: "GET_TODAYS_REFERRALS_FAIL",
      payload:
        error.response?.data?.message ||
        "Failed to load inactive user referrals",
    });
  }
};
