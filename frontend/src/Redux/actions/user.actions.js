// src/redux/actions/userActions.js
import axios from "axios";
import { server } from "../../config/serverapi";
import { toast } from "react-toastify";

// Load user action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error.response?.data?.message,
    });
  }
};

// Update user action
export const updateUser = (userId, userData, password) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });
    const response = await axios.patch(
      `${server}/user/update-user/${userId}`,
      { ...userData, password },
      { withCredentials: true }
    );
    dispatch({
      type: "UPDATE_USER_SUCCESS",
      payload: response.data.updatedUser,
    });
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAIL",
      payload: error.response?.data?.message || "Something went wrong",
    });
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

// Update user avatar action
export const updateUserAvatar = (userId, file) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("avatar", file);

    dispatch({ type: "UPDATE_USER_AVATAR_REQUEST" });
    const response = await axios.patch(
      `${server}/user/update-user-avatar/${userId}`,
      newForm,
      { withCredentials: true },
      config
    );
    dispatch({
      type: "UPDATE_USER_AVATAR_SUCCESS",
      payload: response.data.updatedUser,
    });
    toast.success(response.data.message);
    window.location.reload(true); // Reload the page or handle navigation as needed
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_AVATAR_FAIL",
      payload: error.response?.data?.message || "Image upload failed",
    });
    toast.error(error.response?.data?.message || "Image upload failed");
  }
};

export const GET_ALL_USERS = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_USERS_REQUEST" });
    const { data } = await axios.get(`${server}/user/get-users`, {
      withCredentials: true,
    });
    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: data.users });
    // console.log(data.users)
  } catch (error) {
    dispatch({
      type: "GET_ALL_USERS_FAIL",
      payload: error.response?.data?.message,
    });
  }
};

// Load userDetails action ---Admin
export const loadUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_DETAILS_REQUEST" });
    const { data } = await axios.get(`${server}/user/get-user-details/${userId}`, {
      withCredentials: true,
    });
    dispatch({ type: "LOAD_USER_DETAILS_SUCCESS", payload: data.userDetails });
    // console.log(data.userDetails)
  } catch (error) {
    dispatch({
      type: "LOAD_USER_DETAILS_FAIL",
      payload: error.response?.data?.message,
    });
  }
};

// Change User Acount status Active or Inactive
export const changeUserAccountStatus = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "CHANGE_USER_ACOUNT_STATUS_REQUEST" });
    const { data } = await axios.patch(`${server}/user/change-user-status/${userId}`, {},{
      withCredentials: true,
    });
    dispatch({ type: "CHANGE_USER_ACOUNT_STATUS_SUCCESS", payload: data.accountStatus });
    toast.success(data.message)
    // console.log(data.userDetails)
  } catch (error) {
    dispatch({
      type: "CHANGE_USER_ACOUNT_STATUS_FAIL",
      payload: error.response?.data?.message,
    });
    toast.error(error?.response?.data?.message || `Error updating user status`)
  }
};

// Create User -----Admin
export const createUser = (formData) => async (dispatch) => {
  try {
    dispatch({type:"CREATE_USER_REQUEST"})
    const res = await axios.post(`${server}/user/create-user`, formData, {withCredentials: true});
    dispatch({
      type: "CREATE_USER_SUCCESS",
      payload: res.data,
    });
    toast.success(res.data.message)
  } catch (err) {
    dispatch({
      type: "CREATE_USER_FAIL",
      payload: err.response?.data?.message,
    });
    toast.error(err?.response?.data?.message || `Account creation Failed`)
  }
};

// Delete user Account ---- Admin
export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({type:"DELETE_USER_ACCOUNT_REQUEST"})
    const res = await axios.delete(`${server}/user/delete-user/${userId}`, {withCredentials: true});
    dispatch({
      type: "DELETE_USER_ACCOUNT_SUCCESS",
      payload: res.data.deletedUser,
    });
    toast.success(res.data.message)
  } catch (err) {
    dispatch({
      type: "DELETE_USER_ACCOUNT_FAIL",
      payload: err.response?.data?.message,
    });
    toast.error(err?.response?.data?.message || `Account deletion Failed`)
  }
};

// changing Account role ---- Admin
export const changeUserAccountRole = (userId, role) => async (dispatch) => {
  try {
    dispatch({type:"CHANGE_USER_ACCOUNT_ROLE_REQUEST"})
    const res = await axios.patch(`${server}/user/change-user-role`,{userId, role}, {withCredentials: true});
    dispatch({
      type: "CHANGE_USER_ACCOUNT_ROLE_SUCCESS",
      payload: res.data.updatedRole,
    });
    toast.success(res.data.message)
  } catch (err) {
    dispatch({
      type: "CHANGE_USER_ACCOUNT_ROLE_FAIL",
      payload: err.response?.data?.message,
    });
    toast.error(err?.response?.data?.message || `Account updataion Failed`)
  }
};

