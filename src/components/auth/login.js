import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorText, setErrorText] = useState("")




  const handleSubmit = (event) => {
    axios
      .post(
        "https://api.devcamp.space/sessions",
        {
          client: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          props.handleSuccessfulAuth();
        } else {
          setErrorText("Wrong email or password")
          props.handleUnsuccessfulAuth();
        }
      })
      .catch(error => {
        setErrorText("An error occurred", error)
        props.handleUnsuccessfulAuth();
      });

    event.preventDefault();
  }


  return (
    <div>
      <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>

      <div>{errorText}</div>

      <form onSubmit={handleSubmit} className="auth-form-wrapper">
        <div className="form-group">
          <FontAwesomeIcon icon="envelope" />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <FontAwesomeIcon icon="lock" />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">
          Login
          </button>
      </form>
    </div>
  );

}

export default Login
