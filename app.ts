import express from "express";
import path from "path";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import Settings from "./types/Settings";
import RequestError from "./types/RequestError";
import usersRouter from "./routes/users";
import indexRouter from "./routes/index";

const app: express.Application = express();

// Set up dotenv
dotenv.config();

require("./startup-scripts")().then((settings: Settings) => {
  //Set up mongoose as database_driver
  const connection_string = settings.database_connection_string;
  mongoose.connect(connection_string);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  // view engine setup
  app.set("views", "views");
  app.set("view engine", "jade");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/health-check", (req: express.Request, res: express.Response) => {
    res.send(200);
  });

  // catch 404 and forward to error handler
  app.use(function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    next(createError(404));
  });

  // error handler
  app.use(function (
    err: RequestError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
});

module.exports = app;
