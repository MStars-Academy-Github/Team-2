// CRUD
import Users from "../model/users";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const TOKEN_KEY = process.env.TOKEN_KEY || "password";

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

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   const { firstName, lastName, imgURL, age, sex, hobby } = req.body;
//   const foundUser = await Users.findOne({
//     firstName: firstName,
//     lastName: lastName,
//   });
//   if (foundUser) {
//     res.json({
//       success: false,
//       data: "User already exits",
//     });
//   } else {
//     const createdUser = await Users.create({
//       firstName,
//       lastName,
//       imgURL,
//       age,
//       sex,
//       hobby,
//     });
//     if (createdUser) {
//       res.json({
//         success: true,
//         message: "User creation was succesful",
//         data: createdUser,
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "User creation was unsuccesful",
//         data: {},
//       });
//     }
//   }
// };

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, imgURL, age, sex, hobby } =
    req.body;
  if (Object.values(email).length === 0) {
    res.status(400).json({
      success: false,
      message: "No user is provided",
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
    const foundUser = await Users.findOne({
      email: email,
      firstName: firstName,
    });
    if (foundUser) {
      res.json({
        success: false,
        data: "User already exits",
      });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const createdUser = await Users.create({
        email,
        password: hashedPass,
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
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName } = req.body;
  if (Object.values(email).length === 0) {
    res.status(400).json({
      success: false,
      message: "No user is provided",
    });
  } else {
    const foundUser = await Users.find({
      email: email,
      passwordMongo: password,
    });

    const validPassword = foundUser[0].password || "not valid password";
    const validFirstName = foundUser[0].firstName || "not valid firstname";
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
          firstname: validFirstName,
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
};

export default {
  getUsers,
  // createUser,
  registerUser,
  loginUser,
};
