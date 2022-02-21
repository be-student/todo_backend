import Jwt from "jsonwebtoken";
export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("test");
    next();
  } else {
    res.json({ result: "failure", error: "already loggedIn" });
  }
};
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.json({ result: "failure", error: "not loggedIn" });
  }
};
