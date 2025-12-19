import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const navigate=useNavigate()
    const {username,email}=useSelector(state=>state.auth.form)
    const dispatch=useDispatch();
    const handleLogout=()=>{
      dispatch(logout())
      navigate('/')
    }

  return (
    <div className="header">
      <div className="header-left">
        <h2>My Page</h2>
      </div>
      <div className="header-right">
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </div>

  )
}

export default Navbar