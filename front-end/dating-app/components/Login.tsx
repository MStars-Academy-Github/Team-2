import { Box, Button, TextField } from "@mui/material";
import React, { FormEventHandler, useState } from "react";

type Props = {};

export default function Login({}: Props) {
  const [register, setRegister] = useState(false);
  function loginHandler(e: any) {
    e.preventDefault();
    console.log("login");
  }
  function registerHandler() {
    setRegister(true);
  }
  function signUpHandler(e: any) {
    e.preventDefault();
    console.log("register");
  }
  return (
    <>
      {register == false ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            className="rounded flex"
            flexDirection="column"
            style={{
              padding: "20px",
              backgroundColor: "white",
            }}
            onSubmit={loginHandler}
          >
            <h2
              style={{
                color: "ActiveBorder",
                textAlign: "center",
                textTransform: "uppercase",
              }}
              className="mb-[10px]"
            >
              Login
            </h2>
            <Box component="form" className="flex" flexDirection="column">
              <TextField
                label="Email"
                className="mb-[10px]"
                name="email"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px]"
                name="password"
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="success"
                style={{ backgroundColor: "green" }}
                className="mb-[10px]"
              >
                Login
              </Button>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ backgroundColor: "green" }}
              onClick={registerHandler}
            >
              register
            </Button>
          </Box>
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            className="rounded flex"
            flexDirection="column"
            style={{
              padding: "20px",
              backgroundColor: "white",
            }}
            onSubmit={signUpHandler}
          >
            <h2
              style={{
                color: "ActiveBorder",
                textAlign: "center",
                textTransform: "uppercase",
              }}
              className="mb-[10px]"
            >
              Register
            </h2>
            <Box component="form" className="flex" flexDirection="column">
              <TextField
                label="Email"
                className="mb-[10px]"
                name="email"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px]"
                name="password"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px]"
                name="password"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px]"
                name="password"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px]"
                name="password"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px]"
                name="password"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px]"
                name="password"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px]"
                name="password"
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="success"
                style={{ backgroundColor: "green" }}
                className="mb-[10px]"
              >
                Register
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
}
