import { useDispatch, useSelector } from 'react-redux'
import { logout, resetForm } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import { fetchProfile } from '../features/auth/authThunks'
import LogoutModal from '../Pages/LogoutModal'

const Navbar = () => {
  const [showLogoutModal,setShowLogoutModal]=useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetForm())
    setShowLogoutModal(false)
    navigate('/')
  }

  const handleProfileClick = () => {
    navigate('/profile')
  }

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile())
    }
  }, [dispatch, profile])

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="logo">My Page</h2>
      </div>

      <div className="navbar-right">
        {profile && (
          <div className="profile-box" onClick={handleProfileClick}>
            {profile.profile_image ? (
              <img
                src={profile.profile_image}
                alt={profile.username}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-initial">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="profile-name">{profile.username}</span>
          </div>
        )}

         <button className='logout-btn' onClick={() => setShowLogoutModal(true)}>Logout</button>
         <LogoutModal show={showLogoutModal} onConfirm={handleLogout} onCancel={()=>{setShowLogoutModal(false)}}/>

      </div>
    </header>
  )
}

export default Navbar
