import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminUsers from "./AdminUser";
import "./AdminHome.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const AdminHome = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const user = useSelector((state) => state.auth.user);

  function handleLogout(){
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-welcome">
              Welcome {user ? user.username : "Admin"}
            </p>
          </div>
          <div>
            <button onClick={handleLogout} className="admin-action-btn admin-logout-btn" >Logout</button>
          </div>
        </div>

        <div className="admin-section">
          <AdminUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
