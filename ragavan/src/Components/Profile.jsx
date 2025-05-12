
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Utils/Auth";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> Admin User</p>
      <p><strong>Email:</strong> admin@gmail.com</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
