import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { MdWavingHand } from "react-icons/md";
import "../../styles/LoginForm/LoginPage.css";

export const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      (username === "foo" && password === "bar") ||
      (username === "srini" && password === "alma") ||
      (username === "john" && password === "first")
    ) {
      window.location.href = "/home";
    } else {
      alert("Please enter the correct username and password.");
    };
  };
  return (
    <>
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h3>Login Form</h3>
          <br />
          <h2 className="welcome-message">
            Welcome <MdWavingHand />
          </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <br />
            <div className="text-center py-4">
              {" "}
              <Button variant="primary" size="md" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
