import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { startLoginUser } from "../Actions/userAction";

const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailValidation)) {
      setEmailError("Invalid email address");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    return isValid;
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        email: email,
        password: password,
      };
    dispatch(startLoginUser(formData, reset, history));
  };
}

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login Form</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setEmailError("")}}
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${passwordError ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value);setPasswordError("") }}
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
                
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;