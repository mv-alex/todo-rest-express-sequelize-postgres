const express = require("express");
const { todoCreateValidator } = require("../../config/validation");
const { todoUpdateValidator } = require("../../config/validation");
const { validationResult } = require("express-validator");
const router = express.Router();

const Todo = require("./../../models/Todo");

router.post("/create", todoCreateValidator, async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      status: "cancel",
      msg: "Unauthorized",
    });
  }
  //validation
  const validated = validationResult(req);
  if (!validated.isEmpty()) {
    return res.status(422).json({ errors: validated.array() });
  }
  try {
    const newTask = await Todo.create({
      task: req.body.task,
      fk_user: req.user.id,
    });
    res.status(201).json({
      status: "created",
      msg: "task created",
      newTask,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      msg: "server error, please try later",
    });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      status: "cancel",
      msg: "Unauthorize",
    });
  }
  try {
    const { id } = req.params;
    await Todo.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      status: "ok",
      msg: "Task deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      msg: "server error, please try later",
    });
  }
});

router.put("/:id", todoUpdateValidator, async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      status: "cancel",
      msg: "Unauthorized",
    });
  }
  //validation
  const validated = validationResult(req);
  if (!validated.isEmpty()) {
    return res.status(422).json({ errors: validated.array() });
  }
  try {
    const { task, done } = req.body;
    const { id } = req.params;
    const updTask = await Todo.update({ task, done }, { where: { id } });
    return res.status(200).json({
      status: "ok",
      msg: "Task updated",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      msg: "server error, please try later",
    });
  }
});

router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      status: "cancel",
      msg: "Unauthorized",
    });
  }
  try {
    const tasks = await Todo.findAll({ where: { fk_user: req.user.id } });
    return res.status(200).json({
      status: "ok",
      tasks,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      msg: "server error, please try later",
    });
  }
});

module.exports = router;
