require("../src/db/mongoose");

const User = require("../src/models/user");

// 6152c6664e082bd9e2393a10

// User.findByIdAndUpdate("6152e1509521abfe7d3f8fe1", { age: 23 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({
//       age: 23,
//     });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => console.log(e));

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {
    age,
  });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("6152e1509521abfe7d3f8fe1", 23)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => console.log(e));
