import React from 'react';
import '../Styles/user-status.css'

const UserStatus = ({ userDetails }) => {
  return (
    <p style={{width: `100%`, textAlign:"center"}} className={userDetails ? 'active-status' : 'deactivated-status'}>
       {userDetails ? 'Active' : 'Deactivated'}
    </p>
  );
};

export default UserStatus;
