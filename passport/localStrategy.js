import passport from "passport";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const LocalStrategy = require("passport-local").Strategy;
import bcrypt from "bcrypt";

import User from "../models/user.js";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", //front 에서 보낸 req.body.email을 참조하라는 의미.
        passwordField: "password",
      },
      async (email, password, done) => {
        console.log("test1");
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, {
                message: "incorrect password or invalid user.",
              });
            }
          } else {
            done(null, false, {
              message: "incorrect password or invalid user.",
            });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
