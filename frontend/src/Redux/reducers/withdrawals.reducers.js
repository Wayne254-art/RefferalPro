// src/redux/reducers/withdrawalReducer.js
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  withdrawals: [],
  loading: false,
  error: null,
  message:""
};

const withdrawalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("FETCH_WITHDRAWAL_REQUESTS_REQUEST", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("FETCH_WITHDRAWAL_REQUESTS_SUCCESS", (state, action) => {
      state.loading = false;
      state.requests = action.payload;
    })
    .addCase("FETCH_WITHDRAWAL_REQUESTS_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("WITHDRAWAL_REQUEST", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("WITHDRAWAL_SUCCESS", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("WITHDRAWAL_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("UPDATE_WITHDRAWAL_STATUS_REQUEST", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("UPDATE_WITHDRAWAL_STATUS_SUCCESS", (state, action) => {
      state.loading = false;
      state.requests = state.requests.map((req) =>
        req.activityId === action.payload ? { ...req, activityStatus: 'completed' } : req
      );
    })
    .addCase("UPDATE_WITHDRAWAL_STATUS_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("GET_ALL_USERS_WITHDRAWAL_REQUEST", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("GET_ALL_USERS_WITHDRAWAL_SUCCESS", (state, action) => {
      state.loading = false;
      state.withdrawals = action.payload;
    })
    .addCase("GET_ALL_USERS_WITHDRAWAL_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addDefaultCase((state) => {});
});

export default withdrawalReducer;
