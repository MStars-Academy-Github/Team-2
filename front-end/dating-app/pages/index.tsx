import {
  Box,
  Button,
  FormLabel,
  MobileStepper,
  Paper,
  RadioGroup,
  Radio,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Menu from "../components/Menu";
import { motion } from "framer-motion";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Home: NextPage = () => {
  const [users, setUsers] = useState<any>();
  const [activeStep, setActiveStep] = useState(0);
  const [filterValue, setFilterValue] = useState();
  const [filterValueGender, setFilterValueGender] = useState();

  useEffect(() => {
    let loggedUser = JSON.parse(window.localStorage.getItem("user") || "user");

    axios
      .post("http://localhost:3001/users", {
        loggedUser: loggedUser.data.user._id,
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (filterValue == "1") {
      axios
        .post("http://localhost:3001/users/filter", {
          sex: filterValueGender,
          age: 18,
          age1: 25,
        })
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => console.error(err));
    } else if (filterValue == "2") {
      axios
        .post("http://localhost:3001/users/filter", {
          sex: filterValueGender,
          age: 26,
          age1: 37,
        })
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => console.error(err));
    } else if (filterValue == "3") {
      axios
        .post("http://localhost:3001/users/filter", {
          sex: filterValueGender,
          age: 37,
          age1: 100,
        })
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:3001/users/filter", {
          sex: filterValueGender,
        })
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [filterValue, filterValueGender]);

  const maxSteps = users?.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  function filterHandler(e: any) {
    setFilterValueGender(e.target.value);
  }

  function ageFilter(e: any) {
    setFilterValue(e.target.value);
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Dating App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react/16.6.3/umd/react.production.min.js"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.6.3/umd/react-dom.production.min.js"
        />
      </Head>

      <main>
        <div
          style={{
            background: "linear-gradient(to right, #085078, #85d8ce)",
            color: "black",
            width: "min-content",
            height: "min-content",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: " 100px",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "1px 1px 20px  cyan",
          }}
        >
          <Box
            sx={{
              width: "40vw",
              minHeight: "100%",
              flexGrow: 1,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "20px 20px 0px 0px",
                padding: "30px",
                backgroundColor: "rgba(255,255,255,0.2)",
                // boxShadow: "0px 0px 20px  purple",
                color: "black",
              }}
            >
              <Box component="form" onChange={filterHandler}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  style={{ color: "black" }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="👩"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="👨"
                    color="success"
                  />
                  <FormControlLabel value="" control={<Radio />} label="👫" />
                </RadioGroup>
              </Box>
              <Box component="form" onChange={ageFilter}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  style={{ color: "black" }}
                >
                  Age
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="18-25"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="26-37"
                  />
                  <FormControlLabel value="3" control={<Radio />} label="37+" />
                </RadioGroup>
              </Box>
            </Paper>

            <AutoPlaySwipeableViews
              // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
              style={{ margin: "30px", minHeight: "40vh" }}
            >
              {users?.map((user: any, index: any) => (
                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <div
                      style={{
                        width: "100%",
                        minHeight: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          maxHeight: "320px",
                          minHeight: "370px",
                          display: "flex",
                          overflow: "hidden",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "10px",
                        }}
                        src={user.imgURL}
                      />
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "100%  ",
                            padding: "15px",
                          }}
                        >
                          <p style={{ fontSize: "15px" }}>Name</p>
                          <p style={{ fontSize: "20px", fontWeight: "700" }}>
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "100%  ",
                            padding: "15px",
                          }}
                        >
                          <p style={{ fontSize: "15px" }}>Age </p>
                          <p style={{ fontSize: "20px", fontWeight: "700" }}>
                            {user.age}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "100%  ",
                            padding: "15px",
                          }}
                        >
                          <p style={{ fontSize: "15px" }}>Sex </p>
                          <p style={{ fontSize: "20px", fontWeight: "700" }}>
                            {user.sex}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "100%  ",
                            padding: "15px",
                          }}
                        >
                          <p style={{ fontSize: "15px" }}>Hobby </p>
                          <p style={{ fontSize: "20px", fontWeight: "700" }}>
                            {user.hobby}
                          </p>
                        </div>
                      </div>
                      <Menu user={user} />
                    </div>
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              style={{
                borderRadius: "0px 0px 20px 20px",
                padding: "20px",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  variant="contained"
                  style={{ backgroundColor: "#FF4A4A", color: "white" }}
                >
                  Next
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  color="error"
                  variant="contained"
                  style={{ backgroundColor: "#FF4A4A", color: "white" }}
                >
                  Back
                </Button>
              }
            />
          </Box>
        </div>
      </main>
    </motion.div>
  );
};

export default Home;
