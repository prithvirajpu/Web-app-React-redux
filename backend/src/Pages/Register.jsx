import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../features/auth/authThunks";
import { updateForm, resetForm } from "../features/auth/authSlice";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { username, email, password, confirm_password } = useSelector(
    (state) => state.auth.form
  );
  const { loading, error, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(
      updateForm({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const usernameError = validateField("username", username);
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);
    const confirm_passwordError = validateField(
      "confirm_password",
      confirm_password
    );
    if (usernameError || passwordError || emailError || confirm_passwordError) {
      setErrors({
        email: emailError,
        username: usernameError,
        password: passwordError,
        confirm_password: confirm_passwordError,
      });
      setTouched({
        email: true,
        password: true,
        username: true,
        confirm_password: true,
      });
      return;
    }
    if (loading) return;
    dispatch(signupUser({ username, email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) return;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
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

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-wrapper">
            <input
              type="text"
              name="username"
              value={username}
              onBlur={handleBlur}
              onChange={handleChange}
              className="register-input"
              placeholder="Username"
            />
            {errors.username && touched.username && (
              <p className="error-text">{errors.username}</p>
            )}
            {error?.errors?.username && (
              <p className="error-text">{error.errors.username[0]}</p>
            )}
          </div>

          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              value={email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="register-input"
              placeholder="Email"
            />
            {errors.email && touched.email && (
              <p className="error-text">{errors.email}</p>
            )}
            {error?.errors?.email && (
              <p className="error-text">{error.errors.email[0]}</p>
            )}
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              value={password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="register-input"
              placeholder="Password"
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
              onBlur={handleBlur}
              onChange={handleChange}
              className="register-input"
              placeholder="Confirm Password"
            />
            {errors.confirm_password && touched.confirm_password && (
              <p className="error-text">{errors.confirm_password}</p>
            )}
          </div>

          <div className="register-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Signing up..." : "Register"}
            </button>
          </div>
        </form>

        <div className="register-footer">
          Already have an account?{" "}
          <Link to="/" className="register-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
