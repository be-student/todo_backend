import moment from "moment";
import Hashtag from "../models/hashtags.js";
import Task from "../models/tasks.js";
import User from "../models/user.js";

export const genColor = () => {
  let result = Math.floor(Math.random() * 256) * 1000 * 1000;
  result += Math.floor(Math.random() * 256) * 1000;
  result += Math.floor(Math.random() * 256);
  return result;
};
export const saveHashtag = async (hashtagSet, user) => {
  let result = [];
  for (const tag of hashtagSet) {
    let extag = await Hashtag.findOne({ where: { name: tag } });
    if (!extag) {
      extag = await Hashtag.create({
        name: tag,
        wordColor: genColor(),
        backgroundColor: genColor(),
        createdAt: moment(),
        UserId: user.dataValues.id,
      });
    }
    result.push(extag);
  }
  return result;
};

export const taskIsValid = (element) => {
  const valid = ["title", "description", "clear", "targetDate"];
  if (valid.includes(element)) {
    return true;
  }
  return false;
};
export const modifyData = (data) => {
  for (const key in data) {
    if (!taskIsValid(key)) {
      delete data[key];
      continue;
    }
    if (key === "clear") {
      if (data[key] === 1) {
        data.finishDate = moment();
      } else {
        data.finishDate = null;
      }
    }
    if (key === "targetDate") {
      if (data.targetDate === "") {
        delete data.targetDate;
      } else {
        data.targetDate = new Date(
          moment(data.targetDate, "YYYY-MM-DD hh:mm")
        ).toUTCString();
      }
    }
  }
};
export const postIsValid = (data, res) => {
  if (!data.title) {
    res.status(404).json({ result: "failure", error: "enter title" });
    return true;
  }
  if (!data.description) {
    res.status(404).json({ result: "failure", error: "enter description" });
    return true;
  }
  if (data.targetDate !== "") {
    // if (!moment(data.targetDate, "YYYY-MM-DD HH:mm", true).isValid()) {
    //   console.log("1234");
    //   res
    //     .status(404)
    //     .json({ result: "failure", error: "날짜 형식이 잘못 되었습니다." });
    //   return true;
    // }
    const regex = /^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2})$/;
    if (regex.test(data.targetDate) === false) {
      res
        .status(404)
        .json({ result: "failure", error: "날짜 형식이 잘못 되었습니다." });
      return true;
    }
  }
};
export const makeHashtag = async (task, user, data, res) => {
  console.log(data);
  const hashtagset = new Set(data.description.match(/#[^\s#]*/g));
  const hashtags = [...hashtagset];
  for (const i in hashtags) {
    hashtags[i] = hashtags[i].substr(1);
  }
  console.log(hashtags.length);
  if (hashtags.length !== 0) {
    try {
      const result = await saveHashtag(hashtags, user);
      await task.addHashtags(result);
      await user.addTask(task);
      console.log(task);
      await user.addHashtags(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ result: "failure", error: "server problem" });
    }

    return false;
  }
};
export const putIsValid = (data) => {
  const regex = /^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2})$/;
  if (data.targetDate !== "") {
    if (regex.test(data.targetDate) === false) {
      res
        .status(404)
        .json({ result: "failure", error: "날짜 형식이 잘못 되었습니다." });
      return true;
    }
  }
};
export const putTask = async (task, user, data, res) => {
  //1. title, 2. description(hashtag). 3. clear(finishedAt) 4. targetDate
  if (putIsValid(data)) {
    return;
  }
  modifyData(data);
  console.log(data);
  data.editedAt = moment();
  task.dataValues = { ...task.dataValues, ...data, UserId: user.dataValues.id };
  try {
    const temptask = await Task.create(task.dataValues);
    if (makeHashtag(temptask, user, data, res) === true) {
      return;
    }
    return res.status(200).json(temptask);
  } catch (error) {
    console.error(error);
    return res.status(505).json({ result: "failure", error: "서버 오류" });
  }
};
