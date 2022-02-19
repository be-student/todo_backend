import express from "express";
import Hashtag from "../models/hashtags.js";
import Task from "../models/tasks.js";

const router = express.Router();

router.get("/:name", async (req, res) => {
  const targetName = decodeURIComponent(req.params.name);
  console.log(targetName);
  try {
    const result = await Hashtag.findOne({
      where: { name: targetName },
      include: Task,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const target = await Hashtag.findAll();
    res.status(200).json(target);
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "failure", error: "server problem" });
  }
});
router.delete("/:name", async (req, res) => {
  const targetName = decodeURIComponent(req.params.name);
  console.log(targetName);
  try {
    const result = await Hashtag.findOne({
      where: { name: targetName },
      include: [
        {
          model: Task,
        },
      ],
    });
    if (result.Tasks.length === 0) {
      await Hashtag.destroy({ where: { name: targetName } });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});
export default router;
