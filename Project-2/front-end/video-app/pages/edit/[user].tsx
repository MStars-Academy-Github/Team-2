import axios from "axios";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Box, Button, TextField } from "@mui/material";
import styles from "../../styles/login.module.css";

export default function User() {
  const router = useRouter();
  const { user } = router.query;
  const [userEdit, setUserEdit] = React.useState<any>();

  React.useEffect(() => {
    setUserEdit(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);

  function handleUpdate(e: any) {
    e.preventDefault();

    axios
      .post(`http://localhost:3001/v1/users/update/${userEdit?.user._id}`, {
        email: e.target.email.value,
        firstName: e.target.firstname.value,
        lastName: e.target.lastname.value,
        phone: e.target.phone.value,
        register: e.target.register.value,
        password: e.target.password.value,
      })
      .then((res) => {
        if (res.statusText === "OK") {
          alert("amjiltai update hiigdlee");
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          height: "89vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleUpdate}
      >
        <div
          className="w-[25vw] rounded"
          style={{ backgroundColor: "#20ab9c", padding: "40px" }}
        >
          <TextField
            required
            label="Email"
            name="email"
            variant="standard"
            type="email"
            defaultValue={userEdit?.user.email}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <br />
          <TextField
            required
            label="Firstname"
            name="firstname"
            variant="standard"
            type="text"
            defaultValue={userEdit?.user.firstName}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <br />
          <TextField
            required
            label="Lastname"
            name="lastname"
            variant="standard"
            type="text"
            defaultValue={userEdit?.user.lastName}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <br />

          <TextField
            required
            label="Phone"
            name="phone"
            variant="standard"
            type="text"
            defaultValue={userEdit?.user.phone}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <br />
          <TextField
            required
            label="Register"
            name="register"
            variant="standard"
            type="text"
            defaultValue={userEdit?.user.register}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <br />
          <TextField
            id="standard-password-input"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            defaultValue="sss"
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "green",
              width: "100%",
              marginTop: "20px",
              background: "#006c6e",
              color: "white",
            }}
          >
            Update
          </Button>
          <br />
        </div>
      </Box>
    </div>
  );
}
