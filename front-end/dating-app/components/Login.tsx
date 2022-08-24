import { Box, Button, Collapse, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import ParticlesBackground from "./Particles";
import CloseIcon from "@mui/icons-material/Close";

import Alert from "@mui/material/Alert";

type Props = {};

export default function Login({}: Props) {
  const [register, setRegister] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  function loginHandler(e: any) {
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  }
  function registerHandler() {
    setRegister(true);
  }
  function signUpHandler(e: any) {
    e.preventDefault();
    if (e.target.password.value === e.target.passwordAgain.value) {
      setRegister(false);
      setOpenSuccess(true);
    } else {
      setOpen(true);
    }
  }
  return (
    <>
      <ParticlesBackground />

      {register == false ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            flexDirection: "column",
            boxShadow: "5px 5px",
            paddingLeft: "1vw",
          }}
        >
          <Box sx={{ width: "75%" }}>
            <Collapse in={openSuccess}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenSuccess(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                severity="success"
              >
                Successfully!! Pls Login
              </Alert>
            </Collapse>
          </Box>
          <Box
            className="rounded flex"
            flexDirection="column"
            style={{
              padding: "20px",
              backgroundColor: "#AEE5D8",
              alignItems: "start",
            }}
            onSubmit={loginHandler}
          >
            <h1
              style={{
                color: "white",
                textAlign: "center",
                textTransform: "uppercase",
                textShadow: "1px 1px black",
                fontSize: "50px",
                fontWeight: "900",
                fontStyle: "italic",
              }}
              className="mb-[10px]"
            >
              Happening now
            </h1>
            <h2
              style={{
                color: "#011627",
                textAlign: "center",
                textTransform: "uppercase",
                textShadow: "1px 1px #f1e3d3",
                fontSize: "20px",
                fontWeight: "900",
                fontStyle: "italic",
              }}
              className="mb-[10px]"
            >
              Join Dating App today.
            </h2>
            <Box
              component="form"
              className="flex w-full"
              flexDirection="column"
            >
              <TextField
                label="Email"
                className="mb-[10px]"
                name="email"
                variant="filled"
                color="success"
              ></TextField>
              <TextField
                label="Password"
                type="password"
                className="mb-[10px] "
                name="password"
                variant="filled"
                color="error"
              ></TextField>

              <Button
                type="submit"
                variant="contained"
                style={{ background: "#e63946" }}
                className="mb-[10px] mt-[10px]"
              >
                Login
              </Button>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <hr
                  style={{
                    height: "2px",
                    width: "100%",
                    boxShadow: "0.1px 0.1px  grey ",
                  }}
                />
                <span
                  className="px-2 pb-1"
                  style={{ textShadow: "1px 1px  black " }}
                >
                  or
                </span>
                <hr
                  style={{
                    height: "2px",
                    width: "100%",
                    boxShadow: "0.1px 0.1px  grey ",
                  }}
                />
              </span>
            </Box>

            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "green",
                width: "100%",
                marginTop: "10px",
                background: "#e63946",
              }}
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
            alignItems: "start",
            flexDirection: "column",
            boxShadow: "5px 5px",
            paddingLeft: "1vw",
          }}
        >
          <Box
            className="rounded flex"
            flexDirection="column"
            style={{
              padding: "20px",
              backgroundColor: "#AEE5D8",
              alignItems: "start",
            }}
            onSubmit={signUpHandler}
          >
            <h1
              style={{
                color: "white",
                textAlign: "center",
                textTransform: "uppercase",
                textShadow: "1px 1px black",
                fontSize: "50px",
                fontWeight: "900",
                fontStyle: "italic",
              }}
              className="mb-[10px]"
            >
              Happening now
            </h1>
            <h2
              style={{
                color: "#011627",
                textAlign: "center",
                textTransform: "uppercase",
                textShadow: "1px 1px #f1e3d3",
                fontSize: "20px",
                fontWeight: "900",
                fontStyle: "italic",
              }}
              className="mb-[10px]"
            >
              Join Dating App today.
            </h2>
            <Box
              component="form"
              className="flex w-full"
              flexDirection="column"
            >
              <TextField
                label="First Name"
                className="mb-[10px]"
                name="firstName"
                variant="filled"
                color="success"
              ></TextField>
              <TextField
                label="Last Name"
                className="mb-[10px]"
                name="lastName"
                variant="filled"
                color="success"
              ></TextField>
              <TextField
                label="Email"
                className="mb-[10px] "
                name="email"
                variant="filled"
                color="error"
              ></TextField>
              <TextField
                label="Age"
                type="number"
                className="mb-[10px] "
                name="age"
                variant="filled"
                color="error"
              ></TextField>
              <TextField
                label="Sex"
                className="mb-[10px] "
                name="sex"
                variant="filled"
                color="error"
              ></TextField>
              <TextField
                label="Hobby"
                className="mb-[10px] "
                name="hobby"
                variant="filled"
                color="error"
              ></TextField>
              <TextField
                label="Password"
                className="mb-[10px] "
                type="password"
                name="password"
                variant="filled"
                color="error"
              ></TextField>
              <TextField
                label="Password Again"
                className="mb-[10px] "
                type="password"
                name="passwordAgain"
                variant="filled"
                color="error"
              ></TextField>
              <Box sx={{ width: "100%" }}>
                <Collapse in={open}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity="error"
                  >
                    Password not matching!
                  </Alert>
                </Collapse>
              </Box>

              <Button
                type="submit"
                variant="contained"
                style={{ background: "#e63946" }}
                className="mb-[10px] mt-[10px]"
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
