import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allReferrals:[],
  referrals: [],
  activeReferrals: [],
  inactiveReferrals: [],
  bonus: 0,
  loading: false,
  error: null,
};

const referralReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("GET_ALL_REFERRALS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("GET_ALL_REFERRALS_SUCCESS", (state, action) => {
      state.loading = false;
      state.allReferrals = action.payload;
      state.error = null;
    })
    .addCase("GET_ALL_REFERRALS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.allReferrals = [];
    })
    .addCase("GET_ALL_USER_REFERRALS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("GET_ALL_USER_REFERRALS_SUCCESS", (state, action) => {
      state.loading = false;
      state.referrals = action.payload;
      state.error = null;
    })
    .addCase("GET_ALL_USER_REFERRALS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.referrals = [];
    })
    .addCase("GET_ALL_USER_ACTIVE_REFERRALS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("GET_ALL_USER_ACTIVE_REFERRALS_SUCCESS", (state, action) => {
      state.loading = false;
      state.activeReferrals = action.payload;
      state.error = null;
    })
    .addCase("GET_ALL_USER_ACTIVE_REFERRALS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.activeReferrals = [];
    })
    .addCase("GET_ALL_USER_INACTIVE_REFERRALS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("GET_ALL_USER_INACTIVE_REFERRALS_SUCCESS", (state, action) => {
      state.loading = false;
      state.inactiveReferrals = action.payload;
      state.error = null;
    })
    .addCase("GET_ALL_USER_INACTIVE_REFERRALS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.inactiveReferrals = [];
    })
    .addCase("GET_TODAYS_REFERRALS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("GET_TODAYS_REFERRALS_SUCCESS", (state, action) => {
      state.loading = false;
      state.bonus = action.payload;
      state.error = null;
    })
    .addCase("GET_TODAYS_REFERRALS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.bonus = 0;
    });
});

export default referralReducer;
