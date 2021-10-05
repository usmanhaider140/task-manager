const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

// Example to show how to use it
// Tip Use it carefully
// const newTask = new Task({
//   description: " Going to create login API ",
// });

// newTask
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

module.exports = Task;
