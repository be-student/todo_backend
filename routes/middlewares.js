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
export const verifyToken = (req, res, next) => {
  try {
    console.log(req.headers);
    //req.decoded = Jwt.verify(req.headers.authorization, JWT_SECRET);
    res.json({ result: "asdf" });
  } catch (error) {
    console.error(error);
    return res.json({ result: "failure", error: "token has error" });
  }
};
