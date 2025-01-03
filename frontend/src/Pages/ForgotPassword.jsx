import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../config/serverapi';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');
  // const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage('');
    // setError('');

    try {
      const response = await axios.post(`${server}/auth/forgot-password`, { email }, {withCredentials: true});
      // setMessage(response.data.message);
      toast.success(response.data.message)
    } catch (err) {
      // setError(err.response.data.message || 'Something went wrong');
      toast.error(err.response.data.message || 'Something went wrong')
    }
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
      <h2 style={{marginBottom:'20px'}}>Forgot Password</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {/* {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} */}
    </div>
  );
};

export default ForgotPassword;
