import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { isNotLoggedIn, isLoggedIn, verifyToken } from "./middlewares.js";
import User from "../models/user.js";

const router = express.Router();
router.get("/", verifyToken);
// router.post("/join", isNotLoggedIn, async (req, res, next) => {
//   const { email, nick, password } = req.body;
//   try {
//     const exUser = await User.findOne({ where: { email } });
//     if (exUser) {
//       return res.json({ result: "failure", error: "already exists" });
//     }
//     const hash = await bcrypt.hash(password, 12);
//     await User.create({
//       email,
//       nick,
//       password: hash,
//     });
//     return res.json({ result: "success" });
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// });
// router.post("/login", isNotLoggedIn, async (req, res, next) => {
//   passport.authenticate("local", (authError, user, info) => {
//     if (authError) {
//       console.error(authError);
//       return next(authError);
//     }
//     if (!user) {
//       return res.json({ result: "failure", error: info.message });
//     }
//     return req.login(user, (loginError) => {
//       if (loginError) {
//         console.error(loginError);
//         return next(loginError);
//       }
//       return res.json({ result: "success", data: req.user });
//     });
//   })(req, res, next);
// });

// router.get("/logout", isLoggedIn, (req, res) => {
//   console.log(req.user);
//   req.logout();
//   req.session.destroy();
//   res.redirect("/");
// });

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

export default router;
