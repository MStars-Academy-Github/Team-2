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

/* ----------------------- USER REGISTER ----------------------- */
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, imgURL, age, sex, hobby } =
    req.body;

  if (Object.values(email).length === 0) {
    /* ----- empty value ---- */
    res.status(400).json({
      success: false,
      message: "No user is provided",
    });
  } else {
    /* ------- token --------- */
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
    /* ----- mongoDB query ---- */
    const foundUser = await Users.findOne({
      email: email,
      firstName: firstName,
    });
    if (foundUser) {
      /* ---- register user ----- */
      res.json({
        success: false,
        data: "User already exits",
      });
    } else {
      /* --- password encrypted --- */
      const hashedPass = await bcrypt.hash(password, 10);
      /* --- mongoDB insert ------- */
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
          /* ---- mongoDB not insert ----- */
          success: false,
          message: "User creation was unsuccesful",
          data: {},
        });
      }
    }
  }
};

/* ----------------------- USER LOGIN ------------------------ */

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (Object.values(email).length === 0) {
    /* ------- empty value ------ */
    res.status(400).json({
      success: false,
      message: "No user is provided",
    });
  } else {
    const foundUser = await Users.find({
      /* ------ mongoDB query  ------ */
      email: email,
      passwordMongo: password,
    });
    /* -------- foundUser Type  ------- */
    const validPassword = foundUser[0].password || "not valid password";
    const validFirstName = foundUser[0].firstName || "not valid firstname";

    /* ------- password decrypt  ------- */
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
      /* ------ user successful  ------- */
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
        /* ---- user not successful  ------ */
        success: false,
        data: "Email or Password do not match",
      });
    }
  }
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
};

export default {
  getUsers,
  // createUser,
  registerUser,
  loginUser,
  editUser,
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
