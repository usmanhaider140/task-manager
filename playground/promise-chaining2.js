require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("6152c87068ca3cb031d104c2")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => console.log(count))
//   .catch((err) => console.log(err));

const DeleteTaskAndCount = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  const count = Task.countDocuments({ completed: false });
  return count;
};

DeleteTaskAndCount("6152c879907456da737637d0")
  .then((count) => console.log(count))
  .catch((e) => console.log(e));
