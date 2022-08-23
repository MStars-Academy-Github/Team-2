// CRUD
import Users from "../model/users";
import { NextFunction, Request, Response } from "express";

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  Users.find({}, (err: Error, data: any) => {
    if (err) {
      return err;
    }
    res.json({
      data: data,
    });
  });
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, imgURL, age, sex, hobby } = req.body;

  const foundUser = await Users.findOne({
    firstName: firstName,
    lastName: lastName,
  });

  console.log(foundUser);

  if (foundUser) {
    res.json({
      success: false,
      data: "User already exits",
    });
  } else {
    const createdUser = await Users.create({
      firstName,
      lastName,
      imgURL,
      age,
      sex,
      hobby,
    });
    if (createdUser) {
      res.json({
        success: true,
        message: "User creation was succesful",
        data: createdUser,
      });
    } else {
      res.json({
        success: false,
        message: "User creation was unsuccesful",
        data: {},
      });
    }
  }
};

export default {
  getUsers,
  createUser,
};
