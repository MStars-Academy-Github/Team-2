import mongoose, { AnyArray } from "mongoose";
import { IUserDoc, IVideo } from "./user.interfaces";
import User from "./user.model";
import Videos from "./video.model";

export const createUser = async (body: any) => {
  return User.create(body);
};

export const getUserByEmail = async (email: string): Promise<IUserDoc | null> =>
  User.findOne({ email });

export const getVideos = async (): Promise<any | null> => Videos.find();
