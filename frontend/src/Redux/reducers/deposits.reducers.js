// src/redux/reducers/depositReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { fetchDeposit } from "../actions/deposits.actions";


const initialState = {
  deposit: null,
  adminDeposits: null,
  loading: false,
  error: null,
};

const depositReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchDeposit.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchDeposit.fulfilled, (state, action) => {
      state.loading = false;
      state.deposit = action.payload;
      state.error = null;
    })
    .addCase(fetchDeposit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("GET_ALL_TOTAL_DEPOSITS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("GET_ALL_TOTAL_DEPOSITS_SUCCESS", (state, action) => {
      state.loading = false;
      state.adminDeposits = action.payload;
      state.error = null;
    })
    .addCase("GET_ALL_TOTAL_DEPOSITS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
});

export default depositReducer;
