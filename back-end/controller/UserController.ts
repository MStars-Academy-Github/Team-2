// CRUD
import Users from "../model/users";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const TOKEN_KEY = process.env.TOKEN_KEY || "password";

/* ---------------------------- ALL USER ------------------------ */
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

/* ---------------------------- FEMALE USER ------------------------ */
const getUsersFemale = (req: Request, res: Response, next: NextFunction) => {
  Users.find({ sex: "female" }, (err: Error, data: any) => {
    if (err) {
      return err;
    }
    res.json({
      data: data,
    });
  });
};

/* ---------------------------- MALE USER ------------------------ */
const getUsersMale = (req: Request, res: Response, next: NextFunction) => {
  Users.find({ sex: "male" }, (err: Error, data: any) => {
    if (err) {
      return err;
    }
    res.json({
      data: data,
    });
  });
};

/* ----------------------- USER UPDATE ------------------------ */
const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName, imgURL, age, sex, hobby } =
    req.body;
  const userParamsId = req.params.id;
  if (Object.values(email).length === 0) {
    /* ------- empty value ------ */
    res.status(400).json({
      success: false,
      message: "No user is provided",
    });
  } else {
    const foundUser = await Users.updateOne(
      {
        _id: userParamsId,
      },
      {
        $set: {
          email: email,
          password: password,
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
          email: email,
          data: "update user",
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
  const userParamsId = req.query.id || "userId";
  if (userParamsId.length === 0) {
    /* ------- empty value ------ */
    res.status(400).json({
      success: false,
      message: "No user is provided",
    });
  } else {
    const foundUser = await Users.deleteOne({
      _id: userParamsId,
    });

    if (foundUser.deletedCount === 1) {
      res.status(200).json({
        success: true,
        data: {
          data: "user delete",
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

export default {
  getUsers,
  editUser,
  deleteUser,
  getUsersFemale,
  getUsersMale,
};
