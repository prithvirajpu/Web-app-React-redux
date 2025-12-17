import { useSelector } from 'react-redux'

const Profile = () => {
  const user=useSelector(state=>state.auth.user)

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  )
}

export default Profile
