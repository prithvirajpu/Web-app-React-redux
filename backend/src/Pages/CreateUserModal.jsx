import { useEffect, useState } from "react";
import "./CreateUserModal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, resetForm } from "../features/auth/authSlice";


const CreateUserModal = ({ onClose, onCreate }) => {
  const {username,email,password,confirm_password}=useSelector(state=>state.auth.form)
  const dispatch=useDispatch()

  const [errors,setErrors]=useState({})
  const [touched,setTouched]=useState({})

  
  useEffect(()=>{
    dispatch(resetForm())
  },[])

const handleBlur = (e) => {
  const { name, value } = e.target;

  setTouched((prev) => ({ ...prev, [name]: true }));

  const frontendError = validateField(name, value);

  if (frontendError) {
    setErrors((prev) => ({
      ...prev,
      [name]: frontendError,
    }));
  }
};

   const validateField = (name, value) => {
    if (name === "username") {
      if (!value.trim()) return "Username is required";
    }

    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Enter a valid email";
    }

    if (name === "password") {
      if (!value.trim()) return "Password is required";
      if (value.length < 6) return "At least 6 characters";
    }
    if (name === "confirm_password") {
      if (!value.trim()) return "Confirm your password";
      if (value !== password) return "Passwords do not match";
    }

    return "";
  };
   const handleChange=(e)=>{
    dispatch(updateForm({
      name:e.target.name,
      value:e.target.value,
    })
  );
  setErrors(prev=>({...prev,[e.target.name]:''}))
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const emailError = validateField("email", email);
  const usernameError = validateField("username", username);
  const passwordError = validateField("password", password);
  const confirmPasswordError = validateField(
    "confirm_password",
    confirm_password
  );

  if (usernameError || emailError || passwordError || confirmPasswordError) {
    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirm_password: confirmPasswordError,
    });

    setTouched({
      username: true,
      email: true,
      password: true,
      confirm_password: true,
    });
    return;
  }

  try {
    await onCreate({ username, email, password });
    dispatch(resetForm());
    setErrors({});
    setTouched({});
 } catch (error) {
    const newErrors = {};
    const newTouched = {};

    if (error?.username) {
      newErrors.username = Array.isArray(error.username) ? error.username[0] : error.username;
      newTouched.username = true;
    }
    if (error?.email) {
      newErrors.email = Array.isArray(error.email) ? error.email[0] : error.email;
      newTouched.email = true;
    }
    if (error?.password) {
      newErrors.password = Array.isArray(error.password) ? error.password[0] : error.password;
      newTouched.password = true;
    }
    if (error?.detail) {
      newErrors.detail = error.detail;
    }
    setErrors(newErrors);
    setTouched(newTouched);
  }}
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Create User</h3>
         {errors.detail && (
        <div className="general-error">
          <p className="error-text" style={{ 
    color: 'red', 
    background: 'yellow', 
    padding: '10px', 
    fontSize: '16px',
    border: '2px solid red'}} >{errors.detail}</p>
        </div>
      )}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Username"
            required
          />
          {errors.username && touched.username && ( 
            <p className="error-text">{errors.username}</p> 
          )}
          </div>
          <div className="input-wrapper">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            required
          />
          {errors.email && touched.email && ( 
            <p className="error-text">{errors.email}</p> 
          )}
          </div>
          <div className="input-wrapper">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            required
          />
          {errors.password && touched.password && ( 
            <p className="error-text">{errors.password}</p> 
          )}
          </div>
          <div className="input-wrapper">
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm Password"
            required
          />
          {errors.confirm_password && touched.confirm_password && ( 
            <p className="error-text">{errors.confirm_password}</p> 
          )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;