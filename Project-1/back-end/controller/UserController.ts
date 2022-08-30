// CRUD
import Users from "../model/users";

import { NextFunction, Request, Response } from "express";
import userAllServices from "../services/userAllServices";
import bcrypt from "bcryptjs";
const TOKEN_KEY = process.env.TOKEN_KEY || "password";

/* ---------------------------- ALL USER ------------------------ */
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { loggedUser } = req.body;
    res.json(await userAllServices.getUserAll(loggedUser));
  } catch (error) {
    console.error(error);
  }
};

/* ---------------------------- FEMALE USER ------------------------ */
const getUsersFemale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userAllServices.getFindFemaleUser());
  } catch (error) {
    console.error(error);
  }
};

/* ---------------------------- MALE USER ------------------------ */
const getUsersMale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userAllServices.getFindMaleUser());
  } catch (error) {
    console.error(error);
  }
};

/* ------------------------- FILDER AGE, SEX --------------------- */

const filterUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { age, age1, sex } = req.body;
    res.json(await userAllServices.getFindFilterUser(age, age1, sex));
  } catch (error) {
    console.error(error);
  }
};

/* ----------------------- USER UPDATE ------------------------ */
const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName, imgURL, age, sex, hobby } =
    req.body;
  const userParamsId = req.params.id;
  if (Object.values(email).length === 0) {
    res.status(400).json({
      success: false,
      message: "No user is provided",
    });
  } else {
    const hashedPass = await bcrypt.hash(password, 10);
    const foundUser = await Users.updateOne(
      {
        _id: userParamsId,
      },
      {
        $set: {
          email: email,
          password: hashedPass,
          firstName: firstName,
          lastName: lastName,
          imgURL: imgURL,
          age: age,
          sex: sex,
          hobby: hobby,
        },
      }
    );

    if (foundUser.acknowledged === true) {
      res.status(200).json({
        success: true,
        data: {
          _id: userParamsId,
          email,
          password,
          firstName,
          lastName,
          imgURL,
          age,
          sex,
          hobby,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        data: {
          data: "Id do not match",
        },
      });
    }
  }
};

/* ----------------------- USER DELETE ------------------------ */
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userParamsId = req.query.id || "userId";
    const userLikedId = req.query.userLike || "userId";

    if (userParamsId.length === 0) {
      res.status(400).json({
        success: false,
        message: "No user is provided",
      });
    } else {
      const foundUser: any = await Users.find({
        _id: userParamsId,
      });

      if (foundUser) {
        await Users.updateOne(
          {
            _id: userParamsId,
          },
          {
            $push: { liked: userLikedId },
          }
        );
      }

      // if (foundUser.deletedCount === 1) {
      //   res.status(200).json({
      //     success: true,
      //     data: {
      //       data: "user delete",
      //     },
      //   });
      // } else {
      //   res.status(401).json({
      //     success: false,
      //     data: {
      //       data: "delete",
      //     },
      //   });
      // }
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getUsers,
  editUser,
  deleteUser,
  getUsersFemale,
  getUsersMale,
  filterUser,
};
