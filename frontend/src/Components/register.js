import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../Actions/userAction";

const RegistrationForm = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        name: name,
        email: email,
        password: password,
      };

      dispatch(startRegisterUser(formData, props));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Registration Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className={`form-control ${nameError ? "is-invalid" : ""}`}
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError("");
                    }}
                  />
                  {nameError && <div className="invalid-feedback">{nameError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${passwordError ? "is-invalid" : ""}`}
                    placeholder="Enter the Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;