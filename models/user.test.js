// import Sequelize from "sequelize";
// import User from "./user";
// import * as con from "../config/config.js";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const config = require("../config/config.js")["test"];
// import Sequelize from "sequelize";
// import User, { init, associate } from "./user";
// const config = require("../config/config.js")["test"];
// beforeAll(() => {
//   console.log(con);
// });

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );
// describe("user model", () => {
//   test("static init", () => {
//     expect(init(sequelize)).toBe(User);
//   });
//   test("static association", () => {
//     const db = {
//       User: {
//         hasMany: jest.fn(),
//       },
//     };
//     associate(db);
//     expect(db.User.hasMany).toHaveBeenCalledTimes(2);
//     expect(db.User.hasMany).toHaveBeenCalledWith(db.Task);
//     expect(db.User.hasMany).toHaveBeenCalledWith(db.Hashtag);
//   });
// });
