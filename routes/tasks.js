import express from "express";
import Task from "../models/tasks.js";
import Hashtag from "../models/hashtags.js";
import moment from "moment";
import { Op } from "sequelize";
import { makeHashtag, postIsValid } from "../func/function.js";
import {
  modifyData,
  putTask,
  saveHashtag,
  taskIsValid,
} from "../func/function.js";
moment.tz.setDefault("Asia/Seoul");
const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });
    if (!task) {
      return res
        .status(404)
        .json({ result: "failure", error: "you choosed wrong task" });
    }
    await task.destroy();
    await putTask(task, req.body, res);
  } catch (error) {
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});

router.post("/", async (req, res) => {
  if (postIsValid(req.body, res)) {
    return;
  }
  modifyData(req.body);
  try {
    const task = await Task.create({
      ...req.body,
      createdAt: moment(),
    });
    await makeHashtag(task, req.body, res);
    return res.status(200).send(req.body);
  } catch (error) {
    console.error(error);
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});
router.delete("/:id", async (req, res) => {
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
    let tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});

router.get("/nearness", async (req, res) => {
  console.log("nearness");
  try {
    const nearTask = await Task.findAll({
      where: {
        targetDate: {
          [Op.and]: {
            [Op.lte]: moment().add(3, "days").toDate(),
            [Op.gte]: moment().toDate(),
          },
        },
      },
    });

    return res.status(200).json(nearTask);
  } catch (error) {
    console.error(error);
    return res.status(505).json({ result: "failure", error: "server problem" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Task.findOne({ where: { id: req.params.id } });
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
