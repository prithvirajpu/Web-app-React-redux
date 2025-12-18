import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAdminUser, deleteAdminUser, fetchAdminUsers, updateAdminUser } from "../features/admin/adminThunks"

const AdminUsers = () => {
    const dispatch=useDispatch()
    const {users,loading,error,previous,next}=useSelector(state=>state.admin)

    useEffect(()=>{
        dispatch(fetchAdminUsers())
    },[dispatch]);
    if (loading)return <p>Loading users...</p>
    if (error) return (
  <p style={{color:'red'}}>
    {typeof error === 'string' ? error : error.detail || JSON.stringify(error)}
  </p>
)


    const handlePage = (url) => {
    if (!url) return;
    dispatch(fetchAdminUsers(url));
  };
    return (
    <div>
      <h2>Admin- Users</h2>
      <form onSubmit={(e)=>{
        e.preventDefault()
        const username=e.target.username.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        dispatch(createAdminUser({username,email,password}))
        e.target.reset()
      }} >
      <label htmlFor="">Username</label>
      <input type="text" name="username" required/><br />
      <label htmlFor="">Email</label>
      <input type="email" name="email" required/><br />
      <label htmlFor="">Password</label>
      <input type="password" name="password" required/><br />
      <button type="submit" >Create User</button>
      </form>
      <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>staff</th>
            <th>active</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user=>(
            <tr key={user.id}>
                <td>{user.id} </td>
                <td>{user.username} </td>
                <td>{user.email} </td>
                <td>{user.is_staff?'Yes':'No'} </td>
                <td>{user.is_active?'Yes':'No'} </td>
                <td><button onClick={()=>dispatch(deleteAdminUser({id:user.id}))} >Delete</button>
                <button onClick={()=>dispatch(updateAdminUser({
                  id:user.id,userData:{is_active:!user.is_active}
                }))}> {user.is_active?'Block':'Unblock'} </button></td>
            </tr>
        ))}
        </tbody>
      </table>
       <div style={{ marginTop: "10px" }}>
        <button onClick={() => handlePage(previous)} disabled={!previous}>
          Previous
        </button>
        <button onClick={() => handlePage(next)} disabled={!next}>
          Next
        </button>
      </div>

    </div>
  )
}

export default AdminUsers
