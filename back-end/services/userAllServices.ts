import Users from "../model/users";

async function getUserAll() {
  const data = await Users.find({});
  return {
    data,
  };
}

async function getFindFemaleUser() {
  const data = await Users.find({ sex: "female" });
  return {
    data,
  };
}

async function getFindMaleUser() {
  const data = await Users.find({ sex: "male" });
  return {
    data,
  };
}

export default {
  getUserAll,
  getFindFemaleUser,
  getFindMaleUser,
};
