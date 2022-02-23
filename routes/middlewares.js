import Jwt from "jsonwebtoken";
export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(404).json({ result: "failure", error: "already loggedIn" });
  }
};
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(404).json({ result: "failure", error: "not loggedIn" });
  }
};
