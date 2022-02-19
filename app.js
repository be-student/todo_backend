import express, { json, urlencoded } from "express";
import path from "path";
import morgan from "morgan";
import { sequelize } from "./models/index.js";
import taskRouter from "./routes/tasks.js";
import hashtagRouter from "./routes/hashtags.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

config();

import sanitizeHtml from "sanitize-html";
//import csurf from "csurf";
//const csurfProtection = csurf({ cookie: true });
import logger from "./logger.js";
import helmet from "helmet";
import hpp from "hpp";
const __dirname = path.resolve();
const app = express();

app.use(cors());
app.set("port", process.env.PORT || 80);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://apis.google.com"
  );
  return next();
});
//app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/", express.static(path.join(__dirname, "/build")));
app.use("/", express.static(path.join(__dirname, "/build/static")));
app.use("/tasks", taskRouter);
app.use("/hashtags", hashtagRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} no router.`);
  logger.info("hello");
  logger.error(error.message);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port is ready");
});
