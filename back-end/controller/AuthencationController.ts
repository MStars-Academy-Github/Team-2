// CRUD
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import register from "../services/register";
import randomstring from "randomstring";
const TOKEN_KEY = process.env.TOKEN_KEY || "password";

/* ----------------------- USER REGISTER ----------------------- */

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName } = req.body;
    if (Object.values(email).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user is provided",
      });
    } else {
      const foundUser = await register.findUserEmail(req.body);
      if (foundUser.data) {
        res.json({
          success: false,
          data: "User already exits",
        });
      } else {
        const token = jwt.sign(
          {
            user_name: firstName,
            email,
          },
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        const createdUser = await register.createRegister(req.body);
        if (createdUser.data) {
          res.json({
            success: true,
            message: "User creation was succesful",
            data: {
              userName: firstName,
              email: email,
            },
            token: token,
          });
        } else {
          res.json({
            success: false,
            message: "User creation was unsuccesful",
            data: {},
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

/* ----------------------- USER LOGIN ------------------------ */

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (Object.values(email).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user is provided",
      });
    } else {
      const foundUser = await register.findUserLogin(req.body);
      const validPassword = foundUser.data[0].password || "not valid password";
      const validFirstName =
        foundUser.data[0].firstName || "not valid firstname";

      if (await bcrypt.compare(password, validPassword)) {
        const token = jwt.sign(
          {
            user_name: validFirstName,
            email,
          },
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: {
            email: email,
            user: foundUser.data[0],
          },
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          data: "Email or Password do not match",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

/* ----------------------- FORGET PASSWORD ------------------------ */

const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const findUserForgetEmail = await register.findUserForgetEmail(email);
    if (findUserForgetEmail.data) {
      const randomString = randomstring.generate(8);
      const findUserForgetPass = await register.findUserForgetPass(
        randomString,
        email
      );
      if (findUserForgetPass) {
        res.status(200).json({
          success: true,
          data: {
            email: email,
            newPass: randomString,
          },
        });
      } else {
        res.status(401).json({
          success: false,
          data: "Email is incorrent",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        data: "Email is incorrent",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  registerUser,
  loginUser,
  forgetPassword,
};
