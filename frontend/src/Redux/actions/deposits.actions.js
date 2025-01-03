// src/redux/actions/depositActions.js
import axios from "axios";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config/serverapi";

// Fetch deposit thunk
export const fetchDeposit = createAsyncThunk(
  "deposit/fetchDeposit",
  async (userId, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.user.user.token;

    try {
      const { data } = await axios.get(
        `${server}/activity/get-totalDeposits/${userId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.totalDeposits;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching total account balance";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// get deposits data get-all-totalDeposits
export const GET_ALL_TOTAL_DEPOSITS = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_ALL_TOTAL_DEPOSITS_REQUEST' });

    const { data } = await axios.get(
      `${server}/activity/get-all-totalDeposits`,
      { withCredentials: true }
    );

    dispatch({
      type: 'GET_ALL_TOTAL_DEPOSITS_SUCCESS',
      payload: data.totalAdminDeposits,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_TOTAL_DEPOSITS_FAIL',
      payload: error.response?.data?.message || 'Failed to load Total Deposits',
    });
  }
};
