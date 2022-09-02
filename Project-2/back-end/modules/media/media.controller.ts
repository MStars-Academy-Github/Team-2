import { Request, Response } from "express";
import * as mediaService from "./media.services";
import formidable, { Fields } from "formidable";
import mongoose, { mongo } from "mongoose";
import Media from "./media.model";
import { User } from "../user";
import { GridFSBucket } from "mongodb";
import fs from "fs";

let gridfs: GridFSBucket;
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

export const createMedia = async (req: Request, res: Response) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async (err: Error, fields: Fields, files: any) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded",
      });
    }

    const user = await User.findById("630ec6b19da3aa3e2f95d8f7");
    console.log(user);

    let media = new Media(fields);
    media.postedBy = user?._id;

    const file = files["video"];
    console.log(file);
    console.log(media);

    //save the parse file
    if (file) {
      let writeStream = gridfs.openUploadStream(media._id.toString(), {
        contentType: "binary/octet-stream",
      });
      fs.createReadStream(file.filepath).pipe(writeStream);
    }
    try {
      let result = await media.save();
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: "Error during upload",
      });
    }
  });
};
