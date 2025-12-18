import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom';
import { signupUser } from '../features/auth/authThunks';
import { updateForm } from '../features/auth/authSlice';

const Register = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {username,email,password}=useSelector(state=>state.auth.form);
  const {loading,error,isLoggedIn}=useSelector(state=>state.auth)

    const handleChange=(e)=>{
      dispatch(updateForm({
        name:e.target.name,
        value:e.target.value,
        
      })
    )}

   const handleRegister=(e)=>{
    e.preventDefault()
    dispatch(signupUser({username,email,password}));
   }
   useEffect(()=>{
    if (isLoggedIn){
      navigate('/home')
    }
   },[isLoggedIn,navigate])
  return (
    <div>

      <h2>Register</h2>
      <form onSubmit={handleRegister}>
      <label >Username: </label>
      <input type="text" value={username} name='username' onChange={handleChange} /><br />
      <label >Email: </label>
      <input type="email" value={email} name='email' onChange={handleChange} /><br />
      <label >Password: </label>
      <input type="password" value={password} name='password' onChange={handleChange} /><br />
      <button type='submit' disabled={loading}>{loading?'Signing up...':'Register'} </button>

      {error&& <p style={{color:'red'}} >{error}</p> }

      </form>
    <Link to='/'>Already have an account? </Link>


    </div>
  )
}

export default Register
