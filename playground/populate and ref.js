const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("615d48fe796b18e7706d728a");
  // await task.populate("owner");
  // console.log(task);
  const user = await User.findById("615d48e0796b18e7706d727e");
  await user.populate("tasks");
  console.log(user.tasks);
};
