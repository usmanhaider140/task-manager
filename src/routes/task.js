const express = require("express");
const Task = require("../models/task");
const router = express.Router();

router.get("/tasks", async (req, res) => {
  // Task.find()
  //   .then((tasks) => res.send(tasks))
  //   .catch((err) => res.status(500).send(err));

  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  // Task.findById(req.params.id)
  //   .then((task) => {
  //     if (!task) res.status(401).send("Not Found");
  //     res.send(task);
  //   })
  //   .catch((err) => res.status(500).send(err));

  try {
    const task = await Task.findById(req.params.id);
    if (!task) res.status(401).send("Not Found");
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/tasks", async (req, res) => {
  const task = await new Task(req.body);
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

router.patch("/tasks/:id", async (req, res) => {
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

    const task = await Task.findById(req.params.id);
    comingUpdates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    if (!task) return res.status(404).send(error);
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send("Not Found");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
