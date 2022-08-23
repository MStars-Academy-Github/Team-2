import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes/userRouter";
import mongoose from "mongoose";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.ATLAS_MONGO_CONNECTION || "";
app.use(express.json());
app.use("/users", routes);

mongoose.connect(DB_CONNECTION).then(() => {
  console.log("mongoDB connection");
  app.listen(PORT, () => {
    console.log("server is running" + PORT);
  });
});

// app.listen(PORT, () => {
//   console.log("server is running" + PORT);
// });

// typescript to convert javascript => npx tsc --init
