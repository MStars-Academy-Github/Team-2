import {
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Key } from "@mui/icons-material";
// modal style
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const genre = ["Music", "Animation", "Gaming", "Entertainment", "Comedy"];
export default function Main() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<any>([]);
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  console.log(media);
  const handleOpen = () => {
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    axios.get("http://localhost:3001/v1/media").then((res) => {
      setMedia(res.data.data);
    });
  }, []);

  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }
  // edit delete
  function handlerDlt(id: any) {
    // axios.delete(`http://localhost:3001/v1/media/delete/${id}`).then((res) => {
    //   if (res.status === 200) {
    //     router.push("/");
    //     alert("ustsan");
    //   }
    // });
  }

  function editVideoDesc(e: any) {
    // e.preventDefault();
    // console.log(e.target.title.value);
    // console.log(e.target.description.value);
    // console.log(e.target.genre.value);
    // axios
    //   .put(`http://localhost:3001/v1/media/update/${id}`, {
    //     title: e.target.title.value,
    //     description: e.target.description.value,
    //     genre: e.target.genre.value,
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       alert("Update hiigdlee");
    //       setOpen(false);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       console.error(err);
    //     }
    //   });
  }
  return (
    <>
      <div className="p-4 flex gap-4">
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios.get("http://localhost:3001/v1/media").then((res) => {
              setMedia(res.data.data);
            });
          }}
        >
          All
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios.get("http://localhost:3001/v1/media/by/music").then((res) => {
              setMedia(res.data.data);
            });
          }}
        >
          Music
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://localhost:3001/v1/media/by/animation")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Animation
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://localhost:3001/v1/media/by/gaming")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Gaming
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://localhost:3001/v1/media/by/entertainment")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Entertainment
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://localhost:3001/v1/media/by/comedy")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Comedy
        </Button>
      </div>
      <div
        style={{
          backgroundColor: "#343a40",
          height: "85vh",
          padding: "30px",
        }}
      >
        <div className="grid grid-cols-4 gap-5">
          {media.map((video: any, i: number) => {
            return (
              <div key={i}>
                <ReactPlayer
                  url={`http://localhost:3001/v1/media/video/${video._id}`}
                  controls={true}
                  width="100%"
                  height="fit-content"
                  onClick={() => handlerOpenVideo(video._id)}
                />

                <div className="flex  text-white justify-around m-px">
                  <p>Title:</p>
                  <p>{video.title}</p>
                </div>
                <div className="flex  text-white justify-around m-px">
                  <p>Description:</p>
                  <p>{video.description}</p>
                </div>
                <div className="flex  text-white justify-around ">
                  <Button
                    sx={{
                      color: "white",
                      border: "0.2px solid #006c6e",
                      margin: "10px",
                    }}
                    variant="outlined"
                    onClick={handleOpen}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{
                      color: "white",
                      border: "0.2px solid #006c6e",

                      margin: "10px",
                    }}
                    variant="outlined"
                    onClick={() => handlerDlt(`${video}`)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={style}
            onSubmit={editVideoDesc}
          >
            <div>
              <div>
                <TextField
                  required
                  label="Title"
                  name="title"
                  variant="standard"
                  type="text"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <br />
                <TextField
                  required
                  label="Description"
                  name="description"
                  variant="standard"
                  type="text"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <FormControl
                  fullWidth
                  style={{
                    marginTop: "10px",
                    marginBottom: "30px",
                  }}
                >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Genre
                  </InputLabel>
                  <NativeSelect name="genre">
                    {genre.map((genre: any, i: number) => {
                      return (
                        <option key={i} value={genre}>
                          {genre}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>
              </div>

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
        </Modal>
      </div>
    </>
  );
}
