import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context";
import { getToken } from "./api";
import './App.css';

function Login() {
  const { auth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = () => {
    try {
      getToken({ auth, username, password });
    } catch (error) {
      // Handle login error
      console.error("Login failed! Please Try Again: ", error);
    }
  };

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/Profile");
    }
  }, [auth.accessToken, navigate]);


  // If user is already authenticated, do not render the login form
  if (auth.accessToken) {
    return null;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="input-group">
        <div>Username:</div>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      <div className="input-group">
        <div>Password:</div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="submit-button">
        <button onClick={submit}>Submit</button>
      </div>

      <hr />
      <div>
        <button className="register"><Link to='/CreateNewUser'>Register a new account</Link></button>
      </div>
    </div>
  );
}

export default Login;


