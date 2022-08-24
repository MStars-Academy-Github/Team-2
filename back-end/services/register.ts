import Users from "../model/users";
import bcrypt from "bcryptjs";

async function findUserEmail(params: any) {
  const { email, firstName } = params;
  const data = await Users.findOne({
    email: email,
    firstName: firstName,
  });
  return {
    data,
  };
}
async function createRegister(params: any) {
  const { email, password, firstName, lastName, imgURL, age, sex, hobby } =
    params;
  const hashedPass = await bcrypt.hash(password, 10);
  const data = await Users.create({
    email,
    password: hashedPass,
    firstName,
    lastName,
    imgURL,
    age,
    sex,
    hobby,
  });
  return {
    data,
  };
}

async function findUserLogin(params: any) {
  const { email, password } = params;
  const data = await Users.find({
    email: email,
    passwordMongo: password,
  });
  return {
    data,
  };
}

export default {
  findUserEmail,
  createRegister,
  findUserLogin,
};
