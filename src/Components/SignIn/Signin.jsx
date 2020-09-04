import React from "react";
import "./signIn.css";

function Signin({ onRouteChange }) {
  return (
    <div className="Signin">
      <div className="Signin__container">
        <form className="Signin__form">
          <fieldset id="sign_in" className="Signin__formFieldset">
            <legend>Sign In</legend>
            <div className="Signin__formFieldsetEmail">
              <label htmlFor="email-address">Email</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                placeholder="name@example.com"
              />
            </div>
            <div className="Signin__formFieldsetPassword">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
          </fieldset>
          <div className="Signin__formSigninButton">
            <button onClick={() => onRouteChange("home")} type="submit">
              Sign in
            </button>
          </div>
          <div className="Signin__formRegisterButton">
            <p>Don't have account?</p>
            <button onClick={() => onRouteChange("register")}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
