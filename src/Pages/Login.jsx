import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/auth/authThunks";
import { useEffect } from "react";
import { updateForm } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = useSelector((state) => state.auth.form);
  const { user, loading, error, isLoggedIn } = useSelector((state) => state.auth);

  function handleChange(e) {
    dispatch(
      updateForm({
        name: e.target.name,
        value: e.target.value,
      })
    );
  }

  useEffect(() => {
    if (isLoggedIn && user) {
      user.is_staff ? navigate("/admin") : navigate("/home");
    }
  }, [isLoggedIn, user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loading) return;
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />

        <br />

        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p style={{ color: "red" }}>
            {typeof error === "string"
              ? error
              : error?.message || error?.detail || "Login failed"}
          </p>
        )}
      </form>

      <Link to="/register">Create account</Link>
    </div>
  );
};

export default Login;
