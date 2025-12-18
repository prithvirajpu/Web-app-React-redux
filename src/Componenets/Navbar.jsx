import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate()
    const {username,email}=useSelector(state=>state.auth.form)
    const dispatch=useDispatch();

  return (
    <div style={{display:'flex',backgroundColor:'grey',gap:'20px'}}>
      <div className="left">
        <h2>My page</h2>
      </div>
      
    </div>
  )
}

export default Navbar