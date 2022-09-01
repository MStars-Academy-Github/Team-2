import mongoose, { isValidObjectId, Schema } from "mongoose";
import { IVideo } from "./user.interfaces";

const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const Videos = mongoose.model<IVideo>("Videos", videoSchema);

export default Videos;
