import React from "react";
import "./LogoutModal.css"; 

const DeleteConfirmModal = ({ show, onConfirm, onCancel, username }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Delete User</h3>
        <p>
          Are you sure you want to delete{" "}
          <strong>{username}</strong>? <br />
        </p>

        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
