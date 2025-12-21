import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useEffect } from 'react'
import { fetchProfile } from '../features/auth/authThunks'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
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

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
