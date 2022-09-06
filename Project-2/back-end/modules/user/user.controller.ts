import { Request, Response } from "express";
import User from "./user.model";
import * as userService from "./user.services";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, register, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.updateOne(
      { _id: id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          register: register,
          password: hashedPassword,
        },
      }
    );
    res.header("Content-Type", "text/plain");
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    await res.status(200).json({ data: user });
  } catch (error) {
    return res.status(404).json({
      error: "Colud not retrieve user",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    await res.status(200).json({ data: user });
  } catch (error) {
    return res.status(404).json({
      error: "Colud not retrieve user",
    });
  }
};
