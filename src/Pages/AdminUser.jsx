import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  updateAdminUser,
} from "../features/admin/adminThunks";
import "./AdminUser.css";
import CreateUserModal from "./CreateUserModal";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";

const AdminUsers = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { users, loading, error, previous, next } = useSelector((state) => state.admin);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingData, setEditingData] = useState({ email: "" });
  const [rowError, setRowError] = useState("");

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handlePage = (url) => {
    if (!url) return;
    dispatch(fetchAdminUsers(url));
  };

const handleCreateUser = async (data) => {
  await dispatch(createAdminUser(data)).unwrap();
  setShowCreateModal(false); // Only runs if no error
};

  const startEdit = (user) => {
    setEditingUserId(user.id);
    setEditingData({ email: user.email });
    setRowError("");
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditingData({ email: "" });
    setRowError("");
  };

  const saveEdit = async (userId) => {
    try {
      await dispatch(updateAdminUser({ id: userId, userData: editingData })).unwrap();
      cancelEdit();
    } catch (err) {
      const firstKey = err && typeof err === "object" && Object.keys(err)[0];
      const errorValue = firstKey ? err[firstKey] : err;
      setRowError(Array.isArray(errorValue) ? errorValue[0] : String(errorValue || "Update failed"));
    }
  };
  const confirmDelete = async () => {
    if (!deleteUser) return;

    await dispatch(deleteAdminUser({ id: deleteUser.id }));
    setShowDeleteModal(false);
    setDeleteUser(null);
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <h2 className="admin-users-title">List of Users</h2>
        <input type="text" placeholder="Search Users..." value={search} onChange={(e)=>setSearch(e.target.value)}
        onKeyDown={(e)=>{
          if (e.key==='Enter'){
            dispatch(fetchAdminUsers(search))
          }
        }} className="input-search" />
                <button
          onClick={() => dispatch(fetchAdminUsers(search))}
          className="admin-search-btn"
        >
          Search
        </button>

        <button className="admin-add-btn" onClick={() => setShowCreateModal(true)}>
          + Create User
        </button>
      </div>

      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateUser}
        />
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>
                {editingUserId === user.id ? (
                  <div>
                    <input
                      type="email"
                      value={editingData.email}
                      onChange={(e) => setEditingData({ ...editingData, email: e.target.value })}
                    />
                    {rowError && (
                      <p className="admin-error" style={{ color: "red", fontSize: "12px", margin: "4px 0 0 0" }}>
                        {rowError}
                      </p>
                    )}
                  </div>
                ) : (
                  user.email
                )}
              </td>
              <td>{user.is_active ? "Yes" : "No"}</td>
              <td>
                <button
                    className="admin-action-btn admin-delete-btn"
                    onClick={() => {
                      setDeleteUser(user);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>

                <button
                  className="admin-action-btn admin-toggle-btn"
                  onClick={() =>
                    dispatch(updateAdminUser({ id: user.id, userData: { is_active: !user.is_active } }))
                  }
                >
                  {user.is_active ? "Block" : "Unblock"}
                </button>
                {editingUserId === user.id ? (
                  <>
                    <button className="admin-action-btn admin-save-btn" onClick={() => saveEdit(user.id)}>
                      Save
                    </button>
                    <button className="admin-action-btn admin-cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="admin-action-btn admin-edit-btn" onClick={() => startEdit(user)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-pagination">
        <button onClick={() => handlePage(previous)} disabled={!previous}>
          Previous
        </button>
        <button onClick={() => handlePage(next)} disabled={!next}>
          Next
        </button>
      </div>
      <DeleteConfirmModal
            show={showDeleteModal}
            username={deleteUser?.username}
            onCancel={() => {
              setShowDeleteModal(false);
              setDeleteUser(null);
            }}
            onConfirm={confirmDelete}
          />
    </div>
  );
};

export default AdminUsers;