import express from "express";
import Task from "../models/tasks.js";
import Hashtag from "../models/hashtags.js";
import User from "../models/user.js";
import moment from "moment";
import { Op } from "sequelize";
import { makeHashtag, postIsValid } from "../func/function.js";
import {
  modifyData,
  putTask,
  saveHashtag,
  taskIsValid,
} from "../func/function.js";
import { isLoggedIn } from "./middlewares.js";
moment.tz.setDefault("Asia/Seoul");
const router = express.Router();

router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.dataValues.id } });
    if (!user) {
      return res.status(400).json({ result: "failure", error: "unknown user" });
    }
    const task = await Task.findOne({ where: { id: req.params.id } });
    if (!task) {
      return res
        .status(404)
        .json({ result: "failure", error: "you choosed wrong task" });
    }
    await task.destroy();
    await putTask(task, user, req.body, res);
  } catch (error) {
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  if (postIsValid(req.body, res)) {
    return;
  }
  modifyData(req.body);
  try {
    const user = await User.findOne({ where: { id: req.user.dataValues.id } });
    console.log(user.dataValues.id);

    if (!user) {
      return res.status(400).json({ result: "failure", error: "unknown user" });
    }
    const task = await Task.create({
      ...req.body,
      createdAt: moment(),
      UserId: user.dataValues.id,
    });
    await makeHashtag(task, user, req.body, res);

    return res.status(200).send(req.body);
  } catch (error) {
    console.error(error);
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const post = await Task.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res
        .status(404)
        .json({ result: "failure", error: "you choosed wrong task" });
    }
    await Task.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ result: "success" });
  } catch (error) {
    console.error(error);
    z``;
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});

router.get("/", async (req, res) => {
  try {
    let tasks = await Task.findAll({ where: { UserId: req.user.id } });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log("error");
    console.error(error);
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});

router.get("/nearness", isLoggedIn, async (req, res) => {
  console.log("nearness");
  try {
    const nearTask = await Task.findAll({
      where: {
        UserId: req.user.id,
        targetDate: {
          [Op.and]: {
            [Op.lte]: moment().add(3, "days").toDate(),
            [Op.gte]: moment().toDate(),
          },
        },
      },
    });
    console.log(nearTask);
    return res.status(200).json(nearTask);
  } catch (error) {
    console.error(error);
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const post = await Task.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });
    if (!post) {
      return res
        .status(404)
        .json({ result: "failure", error: "target invalid" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});

export default router;
