import React, { useState } from "react";
import "./signIn.css";

const Signin = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorSignin, setErrorSignin] = useState("");

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value);
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    fetch("https://enigmatic-basin-52522.herokuapp.com/signin", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((user) => {
        if (user?.id) {
          loadUser(user);
          onRouteChange("home");
        } else {
          setErrorSignin("wrong credintials");
        }
      });
  };

  return (
    <div className="Signin">
      <div className="Signin__container">
        <form className="Signin__form">
          <fieldset id="sign_in" className="Signin__formFieldset">
            <legend>Sign In</legend>
            <p style={{ color: "red" }}>{errorSignin}</p>
            <div className="Signin__formFieldsetEmail">
              <label htmlFor="email-address">Email</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                placeholder="name@example.com"
                onChange={onEmailChange}
              />
            </div>
            <div className="Signin__formFieldsetPassword">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="Signin__formSigninButton">
            <button onClick={onSubmitSignIn} type="submit">
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
};

export default Signin;
