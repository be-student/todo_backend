import Sequelize from "sequelize";
import Task from "./tasks.js";

import Hashtag from "./hashtags.js";
import User from "./user.js";
const env = process.env.NODE_ENV || "development";
// import * as con from "../config/config.json";
// const config = con.env;
import * as con from "../config/config.js";
console.log("123412341234\n\n\n");
console.dir(con.default);
console.log(env);
const config = con.default[env];
console.dir(config);
const db = {};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

db.Hashtag = Hashtag;
db.Task = Task;
db.User = User;

User.init(sequelize);
Hashtag.init(sequelize);
Task.init(sequelize);

User.associate(db);
Hashtag.assciate(db);
Task.associate(db);

export default db;
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
