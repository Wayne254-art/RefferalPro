// src/components/UpdatePassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../config/serverapi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.user)

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [message, setMessage] = useState('');
  // const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage('');
    // setError('');

    if (newPassword !== confirmPassword) {
      // setError('New password and confirm password do not match');
      return toast.error('New password and confirm password do not match')
    }

    try {
      const response = await axios.post(`${server}/user/change-password/${user.userId}`, {
        oldPassword,
        newPassword,
      });
      // setMessage(response.data.message);
      toast.success(response.data.message)
    } catch (err) {
      // setError(err.response.data.message || 'Something went wrong');
      toast.error(err.response.data.message || 'Something went wrong')
    }
  };

  return (
    <div className='section'>
      <h2 style={{ marginBottom: '20px' }}>Update Password</h2>
      <form onSubmit={handleSubmit} id='change-password-form'>
        {/* <h2 style={{ marginBottom: '20px' }}>Update Password</h2> */}
        <div className="setting-form-group">
          {/* <label>Old Password:</label> */}
          <input
            type="password"
            placeholder='Old Password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="setting-form-group">
          {/* <label>New Password:</label> */}
          <input
            type="password"
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="setting-form-group">
          {/* <label>Confirm New Password:</label> */}
          <input
            type="password"
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='setting-button'>Update Password</button>
      </form>
      {/* {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} */}
    </div>
  );
};

export default UpdatePassword;
