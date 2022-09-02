import React, { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import style from "../styles/header.module.css";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const router = useRouter();
  const [user, setUser] = React.useState<any>();
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);
  function logoutHandler(e: any) {
    e.preventDefault();
    window.localStorage.removeItem("user");
    window.location.reload();
  }

  // UPLOAD, SEARCH
  const searchHandler = (e: any) => {
    e.preventDefault();
    console.log(e.target.search.value);
  };
  const handleOpenUpload = () => {
    setOpen(true);
  };
  // modal upload
  const handleCloseUpload = () => {
    setOpen(false);
  };

  const handleUploadSelect = (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("video", e.target[0].value);
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("genre", e.target.genre.value);
    formData.append("views", e.target.views.value);
    formData.append("userId", user?.user._id);
    axios({
      method: "post",
      url: "http://localhost:3001/v1/media/upload",
      data: formData,

      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#006c6e" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Video Streaming App
            </Typography>

            <Box sx={{ flexGrow: 1 }}></Box>
            <Box
              component="form"
              sx={{ flexGrow: 1, marginRight: "10px" }}
              onSubmit={searchHandler}
            >
              <TextField
                label="Search"
                type="search"
                name="search"
                style={{
                  color: "white",
                  backgroundColor: "white",
                  margin: "10px",
                  width: "50%",
                  marginRight: "50px",
                  borderRadius: "5px",
                  border: "none",
                }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                background: "none",
                border: "none",
                marginTop: "5px",
              }}
              component="button"
              onClick={handleOpenUpload}
            >
              <img
                src="upload.png"
                alt=""
                style={{ width: "50px", marginRight: "10px" }}
              />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, textTransform: "uppercase" }}
                >
                  <Avatar alt="Remy Sharp">
                    {/* {user && user.user.email.slice(0, 1)} */}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile edit</Typography>
                </MenuItem>

                <MenuItem onClick={logoutHandler}>
                  <Typography textAlign="center">Sing out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* upload modal */}
      <Modal
        open={open}
        onClose={handleCloseUpload}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className={style.bg}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload videos
            </Typography>
            <img src="upload1.gif" alt="" className={style.img} />
            {/* <Button onClick={handleUploadSelect}>SELECT FILES</Button> */}
            <Box
              component="form"
              onSubmit={handleUploadSelect}
              noValidate
              autoComplete="off"
              encType="multipart/form-data"
            >
              <input
                accept="video/*"
                id="contained-button-file"
                multiple
                type="file"
              />

              <TextField
                required
                label="Title"
                variant="standard"
                name="title"
                type="text"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              <TextField
                required
                label="description"
                variant="standard"
                name="description"
                type="text"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              <TextField
                required
                label="genre"
                variant="standard"
                name="genre"
                type="text"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              <TextField
                required
                label="views"
                variant="standard"
                name="views"
                type="text"
                style={{
                  width: "100%",
                  marginTop: "20px",
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
                  background: "#006c6e",
                }}
              >
                UPLOAD
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default Navbar;
