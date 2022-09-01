import { Request, Response } from "express";
import * as mediaService from "./media.services";
import formidable from "formidable";
import mongoose, { mongo } from "mongoose";
import Media from "./media.model";
import { User } from "../user";

let gridfs = null;
mongoose.connection.on("connected", () => {
  gridfs = new mongo.GridFSBucket(mongoose.connection.db);
});
export const getMedia = async (req: Request, res: Response) => {
  const user = await mediaService.getMedia();
  res.send(user);
};

export const createMedia = async (req: Request, res: Response) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded",
      });
    }
    const user = await User.findById("631010cfbafc18c3ea94d78d");
    console.log(fields);
    let media = new Media(fields);
    console.log(media);
    media.postedBy = user?.id;
    if (files.media) {
      console.log("here");
      let writeStream = gridfs.openUploadStream(media._id.toString(), {
        contentType: files.media.mimiType || "binary/octet-stream",
      });
    }
  });
  console.log(req.body);
  res.json("create media");
};
