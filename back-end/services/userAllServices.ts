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

async function getFindFilterUser(age: any, age1: any, sex: any) {
  const data = await Users.find({
    age: age ? { $gte: age, $lte: age1 } : { $ne: age },
    sex: sex ? sex : ["female", "male"],
  });
  return {
    data,
  };
}

export default {
  getUserAll,
  getFindFemaleUser,
  getFindMaleUser,
  getFindFilterUser,
};
