import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function myprofile() {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);
  function submitHandler(e: any) {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/users/${user?.data.user._id}`, {
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        imgURL: e.target.imgURL.value,
        age: e.target.age.value,
        sex: e.target.sex.value,
        hobby: e.target.hobby.value,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <Stack
        component="form"
        sx={{
          width: "25ch",
          marginBottom: "180px",
          background: " linear-gradient(to bottom, #ee9ca7, #ffdde1);",
          padding: "30px",
          borderRadius: "10px",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          label="First Name"
          hiddenLabel
          value={user?.data.user.firstName}
          variant="outlined"
          name="firstName"
        />
        <TextField
          label="Last Name"
          value={user?.data.user.lastName}
          variant="outlined"
          name="lastName"
        />
        <TextField
          label="Email"
          value={user?.data.user.email}
          variant="outlined"
          name="email"
          type="email"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user?.data.user.sex}
            label="Gender"
            name="sex"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Age"
          value={user?.data.user.age}
          variant="outlined"
          name="age"
          type="number"
        />

        <TextField
          label="Image URL"
          variant="outlined"
          value={user?.data.user.imgURL}
          name="imgURL"
        />
        <TextField
          label="Hobby"
          variant="outlined"
          value={user?.data.user.hobby}
          name="hobby"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={user?.data.user.password}
        />
        <Button type="submit" variant="contained" color="success">
          Save
        </Button>
      </Stack>
    </div>
  );
}
