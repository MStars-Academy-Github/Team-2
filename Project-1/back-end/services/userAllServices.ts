import Users from "../model/users";
import LikeUsers from "../model/likeusers";

async function getUserAll(id: any) {
  const data1 = await Users.find({
    _id: id,
  });
  const data = await Users.find({ _id: { $nin: data1[0].liked } });
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
