// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../config/serverapi';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  // const [message, setMessage] = useState('');
  // const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage('');
    // setError('');

    try {
      const response = await axios.put(`${server}/auth/reset-password/${token}`, { newPassword });
      // setMessage(response.data.message);
      toast.success(response.data.message)
      navigate(`/login`)
    } catch (err) {
      // setError(err.response.data.message || 'Something went wrong');
      toast.error(err.response.data.message || 'Something went wrong')
    }
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
      <h2 style={{marginBottom:'20px'}}>Reset Password</h2>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {/* {message && <p style={{ color: 'green' }}>{message}</p>} */}
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
    </div>
  );
};

export default ResetPassword;
