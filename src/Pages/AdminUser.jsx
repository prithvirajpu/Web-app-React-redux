import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  updateAdminUser,
} from "../features/admin/adminThunks";
import "./AdminUser.css";
import CreateUserModal from "./CreateUserModal";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error, previous, next } = useSelector(
    (state) => state.admin
  );
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;

  const handlePage = (url) => {
    if (!url) return;
    dispatch(fetchAdminUsers(url));
  };

const handleCreateUser = async (data) => {
  await dispatch(createAdminUser(data)).unwrap();
  setShowCreateModal(false);
};

  return (
    <div className="admin-users">

      
      {/* HEADER */}
      <div className="admin-users-header">
        <h2 className="admin-users-title">List of Users</h2>

        <button
          className="admin-add-btn"
          onClick={() => {
            console.log('btn clicked')
            setShowCreateModal(true);}}
          title="Create User"
        >
          + Create User
        </button>
      </div>

      {/* MODAL */}
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateUser}
        />
      )}

      {/* USERS TABLE */}
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
          {users.map((user,index) => (
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_active ? "Yes" : "No"}</td>
              <td>
                <button
                  className="admin-action-btn admin-delete-btn"
                  onClick={() =>
                    dispatch(deleteAdminUser({ id: user.id }))
                  }
                >
                  Delete
                </button>
                <button
                  className="admin-action-btn admin-toggle-btn"
                  onClick={() =>
                    dispatch(
                      updateAdminUser({
                        id: user.id,
                        userData: { is_active: !user.is_active },
                      })
                    )
                  }
                >
                  {user.is_active ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="admin-pagination">
        <button onClick={() => handlePage(previous)} disabled={!previous}>
          Previous
        </button>
        <button onClick={() => handlePage(next)} disabled={!next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
