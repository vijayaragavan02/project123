
import React from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
  const username = AuthService.getUsername();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  return (
    <div className="profile-card">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
