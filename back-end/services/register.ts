const bcrypt = require("bcryptjs");
import Users from "../model/users";
async function createdUserRegister(params: any) {
  console.log(params);
  // const createdUser = await Users.create(
  //   ({ email, password, firstName, lastName, imgURL, age, sex, hobby } = params)
  // );
  // return {
  //   createdUser,
  // };
}

module.exports = {
  createdUserRegister,
};
