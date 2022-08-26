import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LIkeUsersSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  imgURL: {
    type: String,
  },
  age: {
    type: Number,
  },
  sex: {
    type: String,
  },
  hobby: {
    type: String,
  },
});

const LikeUsers = mongoose.model("likeUser", LIkeUsersSchema);
export default LikeUsers;
