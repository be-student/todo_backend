import Sequelize from "sequelize";
import Task from "./tasks.js";
import { createRequire } from "module";
import Hashtag from "./hashtags.js";
const require = createRequire(import.meta.url);
const env = process.env.NODE_ENV || "development";
// import * as con from "../config/config.json";
// const config = con.env;
import * as con from "../config/config.js";
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

Hashtag.init(sequelize);
Task.init(sequelize);

Hashtag.assciate(db);
Task.associate(db);

export default db;
