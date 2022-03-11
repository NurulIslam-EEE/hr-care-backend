const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const taskAssignSchema = require("../schemas/taskAssignSchema");
const TaskAssign = new mongoose.model("TaskAssign", taskAssignSchema);

//Post entry time
router.post("/", async (req, res) => {
  const newTask = new TaskAssign(req.body);
  console.log(newTask);
  await newTask.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Task was inserted successfully!",
      });
    }
  });
});

//Get entry time
router.get("/", async (req, res) => {
  try {
    const task = await TaskAssign.find({});
    res.status(200).json({
      data: task,
      message: "task Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was an error on the server side",
    });
  }
});
//delete task
router.delete("/:_id", async (req, res) => {
    await TaskAssign.deleteOne({ _id: req.params._id }, (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "TaskAssign was deleted successfully!",
        });
      }
    }).clone().catch(function (err) { console.log(err) })
  });
module.exports = router;
