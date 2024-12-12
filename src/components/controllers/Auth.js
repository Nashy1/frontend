import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../api/axiosConfig";

const Auth = ({ isRegister, setIsLoggedIn }) => {
  const [username, setUsername] = useState(""); // Username state for both login and registration
  const [email, setEmail] = useState(""); // Email is only used for registration
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        // Send username, email, and password for registration
        await api.post("/api/auth/signup", { username, email, password });
        alert("Registration successful! You can now log in.");
      } else {
        // Send username and password for login
        const response = await api.post("/api/auth/signin", {
          username,
          password,
        });

        const { accessToken, username: loggedInUsername } = response.data;

        if (accessToken) {
          // Store the token in localStorage
          localStorage.setItem("token", accessToken);
          localStorage.setItem("username", loggedInUsername);
          setIsLoggedIn(true); // Update state to reflect login
          alert("Login successful!");

          // Redirect to the home page
          window.location.href = "/movies";
        }
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "An error occurred.";
      alert(message);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isRegister) {
  //       if (password !== confirmPassword) {
  //         alert("Passwords do not match!");
  //         return;
  //       }
  //       // Send username, email, and password for registration
  //       await api.post("/api/auth/signup", { username, email, password });
  //       alert("Registration successful! You can now log in.");
  //     } else {
  //       // Send username and password for login
  //       const response = await api.post("/api/auth/signin", {
  //         username,
  //         password,
  //       });

  //       const { token, userAlias } = response.data;

  //       if (token) {
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("userAlias", userAlias);
  //         setIsLoggedIn(true);
  //         alert("Login successful!");
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     const message = err.response?.data?.message || "An error occurred.";
  //     alert(message);
  //   }
  // };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3>{isRegister ? "Register" : "Login"}</h3>
          <Form onSubmit={handleSubmit}>
            {isRegister && (
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            {!isRegister && (
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            {isRegister && (
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {isRegister && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Button variant="primary" type="submit">
              {isRegister ? "Register" : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;