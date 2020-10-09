import React, { useState } from "react";
import "./Register.css";

function Register({ onRouteChange, loadUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorSignin, setErrorSignin] = useState("");

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    fetch("https://enigmatic-basin-52522.herokuapp.com/register", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
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
          setErrorSignin("Not Valid Information");
        }
      });
  };

  return (
    <div className="Register">
      <div className="Register__container">
        <form className="Register__form">
          <fieldset id="sign_up" className="Register__formFieldset">
            <legend>Register</legend>
            <p style={{ color: "red" }}>{errorSignin}</p>
            <div className="Register__formFieldsetName">
              <label htmlFor="user-name">Name</label>
              <input
                type="text"
                name="user-name"
                id="user-name"
                placeholder="name"
                onChange={onNameChange}
              />
            </div>
            <div className="Register__formFieldsetEmail">
              <label htmlFor="email-address">Email</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                placeholder="name@example.com"
                onChange={onEmailChange}
              />
            </div>
            <div className="Register__formFieldsetPassword">
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
          <div className="Register__formSignupButton">
            <button onClick={(e) => onSubmitRegister(e)} type="submit">
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
