import React from 'react'
import { useSelector } from 'react-redux'
import AdminUsers from './AdminUsers'

const AdminHome = () => {
    const user=useSelector(state=>state.auth.user)

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome {user?user.username:'default'}</p>
      <AdminUsers />
    </div>
  )
}

export default AdminHome
