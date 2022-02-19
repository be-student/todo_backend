import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

export default {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "todo_backend",
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    timezone: "+9:00",
    timestamps: false,
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "database_test",
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    timezone: "+9:00",
    timestamps: false,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "todo_backend",
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    timezone: "+9:00",
    timestamps: false,
    logging: false,
  },
};
