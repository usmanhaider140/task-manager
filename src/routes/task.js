const express = require("express");
const Task = require("../models/task");
const router = express.Router();
const { auth } = require("../middleware/auth");

// limit skip
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks/?sortBy=createdAt_desc
router.get("/tasks", auth, async (req, res) => {
  // Task.find()
  //   .then((tasks) => res.send(tasks))
  //   .catch((err) => res.status(500).send(err));

  const sort = {};
  const match = {};
  if (req.query.completed) {
    match.isCompleted = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit || 5),
        skip: parseInt(req.query.skip || 0),
        sort,
      },
    });
    // const tasks = await Task.find({ owner: req.user._id });
    // res.send(req.user.tasks);
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  // Task.findById(req.params.id)
  //   .then((task) => {
  //     if (!task) res.status(401).send("Not Found");
  //     res.send(task);
  //   })
  //   .catch((err) => res.status(500).send(err));
  const _id = req.params.id;
  try {
    // const task = await Task.findById(req.params.id);
    console.log(req.user);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) res.status(404).send("Not Found");
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/tasks", auth, async (req, res) => {
  const task = await new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
  // task
  //   .save()
  //   .then((response) => res.status(201).send(response))
  //   .catch((err) => res.status(400).send(err));
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const comingUpdates = Object.keys(req.body);
  const allowedUpdates = ["description", "isCompleted"];
  if (!comingUpdates.every((update) => allowedUpdates.includes(update))) {
    return res.status(400).send("Updates are Invalid");
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send("Task Not Found");
    // const task = await Task.findById(req.params.id);
    comingUpdates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    if (!task) return res.status(404).send(error);
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send("Not Found");
    res.send("task deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
