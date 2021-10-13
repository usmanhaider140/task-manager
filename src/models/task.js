const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", TaskSchema);

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
