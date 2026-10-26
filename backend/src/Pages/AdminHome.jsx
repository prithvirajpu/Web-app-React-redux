import { useDispatch, useSelector } from "react-redux";
import AdminUsers from "./AdminUser";
import "./AdminHome.css";
import { useNavigate } from "react-router-dom";
import { logout, resetForm } from "../features/auth/authSlice";
import LogoutModal from './LogoutModal'
import { useState } from "react";

const AdminHome = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const user = useSelector((state) => state.auth.user);

  function handleLogout(){
    dispatch(logout())
    dispatch(resetForm())
    setShowLogoutModal(false)
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
            <button onClick={()=>setShowLogoutModal(true)} className="admin-action-btn admin-logout-btn" >Logout</button>
          </div>
        </div>

        <div className="admin-section">
          <AdminUsers />
        </div>
        <LogoutModal  show={showLogoutModal} onCancel={()=>setShowLogoutModal(false)} onConfirm={handleLogout}/>
      </div>
    </div>
  );
};

export default AdminHome;
