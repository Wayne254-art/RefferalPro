import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loadUserDetails, updateUser } from "../../Redux/actions/user.actions";
import AsideNavbar from "../../Components/AsideNavbar";
// import { loadUserDetails, updateUser } from ;
const EditUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userDetails, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      dispatch(loadUserDetails(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        username: userDetails.username,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        avatar: userDetails.avatar,
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, formData));
    dispatch(loadUser())
    dispatch(loadUserDetails(userId))
    navigate(`/users/${userId}`)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AsideNavbar />
      <div className="signup-container">
        {/* <h2 style={{ justifySelf: `center` }}>Edit User</h2> */}
        <form onSubmit={handleSubmit}>
        <h2 style={{ justifySelf: `center` }}>Edit User</h2>
          <label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
