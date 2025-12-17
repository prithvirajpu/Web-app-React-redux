import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {email,password}=useSelector(state=>state.auth.form)

  function handleChange(e){
     dispatch(updateForm({
      name:e.target.name,
      value:e.target.value,
    })
  );
}

  const handleLogin=(e)=>{
    const response={
      user:{email},
      token:'fake-jwt'
    };
    dispatch(loginSuccess(response))
    navigate('/home');
  }

    
  return (
    <div>
      <h2>Login</h2>
      <label htmlFor="">Email: </label>
      <input name='email' type="email" onChange={handleChange} value={email} /><br />
      <label htmlFor="">Password: </label>
      <input name='password' type="password" onChange={handleChange} value={password} /><br />

      <button onClick={handleLogin}>Login</button>

    </div>
  )
}

export default Login
