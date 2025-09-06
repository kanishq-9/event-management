import React, { useState } from "react";
import { GoMail, GoPerson, GoLock } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import "./css/register.css";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayError, setDisplayError] = useState(true);
  const [displayPasswordError, setDisplayPasswordError] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_FETCH_URL;

  function handleUsername(event) {
    setUserName(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handleLogin() {
    navigate('/login');
    return;
  }

  function handlePassword(event) {
    setPassword(event.target.value);
    if (event.target.value.length <= 3) {
      setDisplayPasswordError(true);
    } else {
      setDisplayPasswordError(false);
    }
  }

  function handleConfirmPassword(event) {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (password !== '' && userName !== '' && !displayError && !displayPasswordError) {
      try {
        let data = await fetch(URL + "/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            email,
            password,
          }),
        });
        const response = await data.json();
        if (response.success) {
          navigate("/login");
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }

    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDisplayError(true);
    setDisplayPasswordError(true);
    setLoading(false);
  }

  return (
    <div className="register-main">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <GoPerson className="icon" />
            <input
              className="input-field"
              value={userName}
              onChange={handleUsername}
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <GoMail className="icon" />
            <input
              className="input-field"
              value={email}
              onChange={handleEmail}
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
          {displayPasswordError || password === '' ? <div className="text-danger"><small>Password Length should be more than 3</small></div> : null}

          <div className="input-group">
            <GoLock className="icon" />
            <input
              className="input-field"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>
          {displayError ? <div className="text-danger"><small>Confirm password and password should be same</small></div> : null}

          <button className="register-btn" type="submit">
            {loading ? (<div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>) : `Register`}
          </button>
          <button className="register-btn" onClick={handleLogin}>
            {loading ? (<div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>) : `Login`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register