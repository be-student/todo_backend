import passport from "passport";
import local from "./localStrategy.js";
import kakao from "./kakaoStrategy.js";
import User from "../models/user.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    //여기에서 req.user가 나옴.
    User.findOne({
      where: { id },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
