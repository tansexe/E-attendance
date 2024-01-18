import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// css
import "./Signup.css";

// img
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const Signup = () => {
  const navigate = useNavigate;
  const intialValue = {
    username: "",
    rollno: "",
    hostel: "",
    email: "",
    password: "",
    phone: "",
  };
  const [formValues, setFormValues] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // console.log(name + "<--->" + value);

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    let data = {};

    if (Object.keys(formErrors).length === 0) {
      try {
        // Destructure
        const { username, rollno, hostel, email, password, phone } = formValues;

        // Using the  fetch function
        const res = await fetch("http://localhost:3000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            rollno,
            hostel,
            email,
            password,
            phone,
          }),
          credentials: "include",
        });

        // Handle the response
        if (res.ok) {
          const data = await res.json();
          window.alert("Registration Successful");
          console.log("Registration successful:", data);
          navigate("/users/Login");
        }
      } catch (error) {
        data.status = 402;
        window.alert("Error during registration");
        console.error("Error during registration:", error);
      } finally {
        setIsSubmit(false);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "username is required";
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
    if (!values.rollno) {
      errors.rollno = "Roll No. is required";
    }
    if (!values.hostel) {
      errors.hostel = "Hostel Name is required";
    }
    if (!values.phone) {
      errors.phone = "Contact No. is required";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">Sign Up</div>
        </div>
        <div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                name="username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            {formErrors.username && (
              <p className="Error">{formErrors.username}</p>
            )}

            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="number"
                placeholder="Roll No."
                name="rollno"
                value={formValues.rollno}
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Hostel Name"
                name="hostel"
                value={formValues.hostel}
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="KIIT Email Id"
                value={formValues.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            {formErrors.email && <p className="Error">{formErrors.email}</p>}

            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                name="password"
              />
            </div>
            {formErrors.password && (
              <p className="Error">{formErrors.password}</p>
            )}

            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Contact No."
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="forgot-password">
          Forgot Password? <span>Click Here</span>
        </div>
        <div className="submit-container">
          <div className="Signup" onClick={handleSubmit}>
            Sign Up
          </div>
        </div>
      </form>
    </div>
  );
};
export default Signup;
