import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/auth/authThunks";
import { useEffect,useState } from "react";
import { updateForm } from "../features/auth/authSlice";
import './Login.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors,setErrors]=useState({})
  const [touched,setTouched]=useState({})

  const { email, password } = useSelector((state) => state.auth.form);
  const { user, loading, error, isLoggedIn } = useSelector((state) => state.auth);

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Enter a valid email";
    }

    if (name === "password") {
      if (!value.trim()) return "Password is required";
      if (value.length < 5)
        return "At least 5 characters";
    }
    return "";
  };


  function handleChange(e) {
    const {name,value}=e.target
    dispatch(
      updateForm({name,value})
    );
    if (touched[name]){
      setErrors(prev=>({
        ...prev,[name]:validateField(name,value),
      }))
    }
  }

  useEffect(() => {
    if (isLoggedIn && user) {
      user.is_staff ? navigate("/admin") : navigate("/home");
    }
  }, [isLoggedIn, user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError=validateField('email',email);
    const passwordError=validateField('password',password);
    if (emailError || passwordError){
      setErrors({email:emailError,password:passwordError})
      setTouched({email:true,password:true})
      return;
    }
    if (loading) return;
    dispatch(loginUser({ email, password }));
  };

    const handleBlur=(e)=>{
      const {name,value}=e.target;
      if (!value.trim()) return ;
      setTouched(prev=>({...prev,[name]:true}));
      setErrors(prev=>({...prev,[name]:validateField(name,value),
      }))
    }

 return (
  <div className="login-container">
    <div className="login-card">
      <h2 className="login-title">Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <div className="input-wrapper">
          <input
            name="email"
            type="email"
            value={email}
            onBlur={handleBlur}
            onChange={handleChange}
            className="login-input"
            placeholder="Email"
          />
          {errors.email && touched.email && <p style={{color:'red'}} >{errors.email}</p>}
        </div>

        <div className="input-wrapper">
          <input
            name="password"
            type="password"
            value={password}
            onBlur={handleBlur}
            onChange={handleChange}
            className="login-input"
            placeholder="Password"
          />
          {errors.password && touched.password && (<p style={{color:'red'}}>{errors.password}</p>) }
        </div>
        <div className="login-actions">
        <button
          type="submit"
          disabled={loading}
          className="btn-submit"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        </div>

        {error && (
          <p className="login-error">
            {typeof error === "string"
              ? error
              : error?.message || error?.detail || "Login failed"}
          </p>
        )}
      </form>

      <div className="login-footer">
        Don’t have an account?{" "}
        <Link to="/register" className="login-link">
          Create account
        </Link>
      </div>
    </div>
  </div>
);

};

export default Login;
