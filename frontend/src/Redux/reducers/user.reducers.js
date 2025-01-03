// src/redux/reducers/userReducer.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users:[],
  userDetails: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  accountStatus: null,
  deletedUser: null,
  updatedRole: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LOAD_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOAD_USER_SUCCESS", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("LOAD_USER_FAIL", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null;
    })
    .addCase("LOAD_USER_DETAILS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOAD_USER_DETAILS_SUCCESS", (state, action) => {
      state.loading = false;
      state.userDetails = action.payload;
      state.error = null;
    })
    .addCase("LOAD_USER_DETAILS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.userDetails = null;
    })
    .addCase("LOGOUT_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOGOUT_USER_SUCCESS", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    })
    .addCase("LOGOUT_USER_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UPDATE_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("UPDATE_USER_SUCCESS", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("UPDATE_USER_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UPDATE_USER_AVATAR_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("UPDATE_USER_AVATAR_SUCCESS", (state, action) => {
      state.loading = false;
      state.accountStatus = action.payload;
      state.error = null;
    })
    .addCase("UPDATE_USER_AVATAR_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("GET_ALL_USERS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("GET_ALL_USERS_SUCCESS", (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    })
    .addCase("GET_ALL_USERS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("CHANGE_USER_ACOUNT_STATUS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("CHANGE_USER_ACOUNT_STATUS_SUCCESS", (state, action) => {
      state.loading = false;
      state.accountStatus = action.payload;
      state.error = null;
    })
    .addCase("CHANGE_USER_ACOUNT_STATUS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("DELETE_USER_ACCOUNT_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("DELETE_USER_ACCOUNT_SUCCESS", (state, action) => {
      state.loading = false;
      state.deletedUser = action.payload;
      state.error = null;
    })
    .addCase("DELETE_USER_ACCOUNT_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("CHANGE_USER_ACCOUNT_ROLE_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("CHANGE_USER_ACCOUNT_ROLE_SUCCESS", (state, action) => {
      state.loading = false;
      state.updatedRole = action.payload;
      state.error = null;
    })
    .addCase("CHANGE_USER_ACCOUNT_ROLE_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addDefaultCase((state) => {});
});

export default userReducer;
