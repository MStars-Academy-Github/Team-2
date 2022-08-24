import Users from "../model/users";
async function getUserAll() {
  const data = await Users.find({}, (err: Error, data: any) => {
    if (err) {
      return err;
    }
    return data;
  });

  return {
    data,
  };
}

export default {
  getUserAll,
};
