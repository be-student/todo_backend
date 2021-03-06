import express from "express";
import Hashtag from "../models/hashtags.js";
import Task from "../models/tasks.js";
import User from "../models/user.js";
import { isLoggedIn } from "./middlewares.js";

const router = express.Router();

router.get("/:name", isLoggedIn, async (req, res) => {
  const targetName = decodeURIComponent(req.params.name);
  try {
    const result = await Hashtag.findOne({
      where: { name: targetName },
      UserId: req.user.id,
      include: Task,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});
router.get("/", isLoggedIn, async (req, res) => {
  const query = req.query;
  const limit = query.limit ? query.limit : 4;
  const offset = query.page ? (query.page - 1) * limit : 0;
  try {
    const target = await Hashtag.findAll({
      where: { UserId: req.user.id },
      offset: offset,
      limit: limit,
    });
    res.status(200).json(target);
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "failure", error: "server problem" });
  }
});
router.delete("/:name", isLoggedIn, async (req, res) => {
  const targetName = decodeURIComponent(req.params.name);
  console.log(targetName);
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const result = await Hashtag.findOne({
      where: { name: targetName, UserId: req.user.id },
      include: [
        {
          model: Task,
        },
      ],
    });
    if (result.Tasks.length === 0) {
      await user.removeHashtag(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});
export default router;
