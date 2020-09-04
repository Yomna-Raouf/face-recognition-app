import React from "react";
import "./Register.css";

function Register({ onRouteChange }) {
  return (
    <div className="Register">
      <div className="Register__container">
        <form className="Register__form">
          <fieldset id="sign_up" className="Register__formFieldset">
            <legend>Register</legend>
            <div className="Register__formFieldsetName">
              <label htmlFor="email-address">Name</label>
              <input
                type="text"
                name="user-name"
                id="user-name"
                placeholder="name"
              />
            </div>
            <div className="Register__formFieldsetEmail">
              <label htmlFor="email-address">Email</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                placeholder="name@example.com"
              />
            </div>
            <div className="Register__formFieldsetPassword">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
          </fieldset>
          <div className="Register__formSignupButton">
            <button onClick={() => onRouteChange("signIn")} type="submit">
              Sign up
            </button>
          </div>
          <div className="Register__formSigninButton">
            <p>already a user?</p>
            <button onClick={() => onRouteChange("signIn")}>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
