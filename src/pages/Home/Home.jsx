import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../../assets/img-kiit.jpg";
import "../Home/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="banner">
        <div className="headerContainer">
          <h1> E-attendance System</h1>
          <p> KIIT Edition</p>
          <Link to="/Signup">
            <button> Signup </button>
          </Link>
          <Link to="/Login">
            <button> Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
