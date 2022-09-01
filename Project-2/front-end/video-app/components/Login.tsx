import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

type Props = {};

export default function Login({}: Props) {
  const [register, setRegister] = useState(false);
  const [open, setOpen] = React.useState(false);

  function loginHandler(e: any) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/v1/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        if (res.status == 200) {
          window.localStorage.setItem("user", JSON.stringify(res.data));
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  }

  function registerHandler(e: any) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/v1/users", {
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        phone: e.target.phone.value,
        register: e.target.register.value,
      })
      .then((res) => {
        if (res.status == 200) {
          alert("amjilttai burtgelee");
          setRegister(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  }

  function registerHandlerOpen() {
    setRegister(true);
  }
  return (
    <div>
      {register === false ? (
        <Box
          component="form"
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
          onSubmit={loginHandler}
        >
          <div>
            <TextField
              required
              label="Email"
              name="email"
              variant="standard"
              type="email"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              id="standard-password-input"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "green",
                width: "100%",
                marginTop: "20px",
                background: "#e63946",
              }}
            >
              login
            </Button>
            <br />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "green",
                width: "100%",
                marginTop: "20px",
                background: "#e63946",
              }}
              onClick={registerHandlerOpen}
            >
              register
            </Button>
          </div>
        </Box>
      ) : (
        <Box
          component="form"
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            padding: "0% 35% 0% 35%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
          onSubmit={registerHandler}
        >
          <div>
            <TextField
              required
              label="Email"
              name="email"
              variant="standard"
              type="email"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              required
              label="firstName"
              defaultValue="Hello World"
              variant="standard"
              name="firstName"
              type="text"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              required
              label="lastName"
              name="lastName"
              defaultValue="Hello World"
              variant="standard"
              type="text"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              required
              label="phone"
              name="phone"
              defaultValue="Hello World"
              variant="standard"
              type="number"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              required
              label="register"
              name="register"
              defaultValue="Hello World"
              variant="standard"
              type="text"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              label="password"
              type="password"
              name="password"
              autoComplete="current-password"
              variant="standard"
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "green",
                width: "100%",
                marginTop: "20px",
                background: "#e63946",
              }}
            >
              register
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}
