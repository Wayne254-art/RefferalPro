import React, { useState, useRef } from "react";
import axios from "axios";
import { server } from "../config/serverapi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  loadUser,
  updateUser,
  updateUserAvatar,
} from "../Redux/actions/user.actions";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    username: user?.username || "",
    avatar: user?.avatar || "",
  });
  const [password, setPassword] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updateUser(user.userId, userData, password));
      toast.success(`user updated successfully`);
      dispatch(loadUser());
    } catch (error) {
      toast.error(`error updating user info`);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    try {
      dispatch(updateUserAvatar(user.userId, file));
      toast.success(`Avatar updated sucessfully`)
      dispatch(loadUser());
    } catch (error) {
      toast.error(`Image upload failed`)
    }
   
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="section">
      <h2>Update Account Information</h2>
      <form onSubmit={handleSubmit} id="update-account-form">
        <div className="setting-form-group">
          <img
            src={userData.avatar}
            alt="Profile"
            className="profile-image"
            style={{ cursor: "pointer" }}
            onClick={handleImageClick}
          />
          <input
            type="file"
            name="avatar"
            id="file-input"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInputChange}
            className="sr-only"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
        <div className="setting-form-group">
          <label>First Name:</label>
          <input
            type="text"
            placeholder={user.firstName}
            name="firstName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="setting-form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder={user.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="setting-form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="setting-form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder={user.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="setting-form-group">
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            placeholder={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="setting-form-group">
          <label>
            Password:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            placeholder={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="setting-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
