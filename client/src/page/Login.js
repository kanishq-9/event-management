import React, { useState } from "react";
import { GoLock, GoMail } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_FETCH_URL;

  function handleUsername(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }
  
  function handleRegister(){
    navigate('/register');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      let data = await fetch(URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      data = await data.json();
      if (data.success) {
        sessionStorage.setItem("email", data.data.email);
        sessionStorage.setItem("id", data.data.id);
        sessionStorage.setItem("name", data.data.name);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className="login-main">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <GoMail className="icon" />
            <input
              className="input-field"
              value={email}
              onChange={handleUsername}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="input-group">
            <GoLock className="icon" />
            <input
              className="input-field"
              value={password}
              onChange={handlePassword}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <button className="login-btn" type="submit">
            {loading?(<div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>):`Login`}
          </button>
          <button className="login-btn" onClick={handleRegister}>
            {loading?(<div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>):`Register`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login