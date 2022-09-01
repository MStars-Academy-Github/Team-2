import mongoose, { Model, Document, ObjectId } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  register: string;
}

export interface IVideo {
  title: string;
  tags: string;
  url: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}
