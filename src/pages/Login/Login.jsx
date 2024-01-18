import React, { useState, useEffect } from "react";
import "./login.css";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const Login = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Type your email in this format: abc@example.com";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password should not exceed more than 10 characters";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">Login</div>
        </div>
        <div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <div className="error">{formErrors.name}</div>
              )}
            </div>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="KIIT Email Id"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="error">{formErrors.email}</div>
              )}
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="error">{formErrors.password}</div>
              )}
            </div>
          </div>
        </div>
        <div className="forgot-password">
          Forgot Password? <span>Click Here</span>
        </div>
        <div className="submit-container">
          <button type="submit" className="Login">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
