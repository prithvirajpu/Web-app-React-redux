import React from "react";
import "./LogoutModal.css"; // basic styles, can reuse ConfirmModal CSS

const LogoutModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="modal-actions">
          
          <button className="btn btn-cancel" onClick={onCancel}>
            No
          </button>
          <button className="btn btn-confirm" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
