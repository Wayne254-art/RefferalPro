import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../../Styles/CreateUser.css";
import AsideNavbar from '../../Components/AsideNavbar';
import { GET_ALL_USERS, createUser } from '../../Redux/actions/user.actions';

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user',
  });

  const { firstName,lastName, email, password, phoneNumber, role } = formData;

  if (user.role !== 'Admin') {
    return <div>Access denied. Admins only.</div>;
  }

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    dispatch(GET_ALL_USERS())
    navigate('/users');
  };

  return (
    <>
      <AsideNavbar />
      <div className="create-user">
        {/* <h2>Create New User</h2> */}
        <form onSubmit={onSubmit} className="create-user-form">
        <h2>Create New User</h2>
          <div className="form-group">
            {/* <label>First Name</label> */}
            <input type="text" placeholder='first-Name' name="firstName" value={firstName} onChange={onChange} required />
          </div>
          <div className="form-group">
            {/* <label>Last Name</label> */}
            <input type="text" placeholder='last-Name' name="lastName" value={lastName} onChange={onChange} required />
          </div>
          <div className="form-group">
            {/* <label>Email</label> */}
            <input type="email" placeholder='Email' name="email" value={email} onChange={onChange} required />
          </div>
          <div className="form-group">
            {/* <label>Password</label> */}
            <input type="password" placeholder='password' name="password" value={password} onChange={onChange}  />
          </div>
          <div className="form-group">
            {/* <label>Phone Number</label> */}
            <input type="text" placeholder='Phone Number' name="phoneNumber" value={phoneNumber} onChange={onChange} required />
          </div>
          <div className="form-group">
            {/* <label>Role</label> */}
            <select name="role" value={role} onChange={onChange}>
              <option value="user">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
