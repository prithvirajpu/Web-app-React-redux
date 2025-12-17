import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { registerSuccess, updateForm } from '../features/auth/authSlice';

const Register = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {username,email,password}=useSelector(state=>state.auth.form);

    const handleChange=(e)=>{
      dispatch(updateForm({
        name:e.target.name,
        value:e.target.value,
      }))
    }

   const handleRegister=()=>{
    const response={
      user:{username,email},
      token:'fake-jwt',
    }
    dispatch(registerSuccess(response));
    navigate('/home');
   }

  return (
    <div>

      <h2>Register</h2>
      <label >Username: </label>
      <input type="text" value={username} name='username' onChange={handleChange} /><br />
      <label >Email: </label>
      <input type="email" value={email} name='email' onChange={handleChange} /><br />
      <label >Password: </label>
      <input type="password" value={password} name='password' onChange={handleChange} /><br />
      <button onClick={handleRegister} >Register</button>



    </div>
  )
}

export default Register
