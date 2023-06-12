import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes/tasks.js";

const APP = express();
const PORT = 5000;

APP.use(cors());

APP.use(bodyParser.json());

APP.use("/tasks", router);

APP.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

APP.listen(PORT, () => {
  console.log("SERVER IS RUNNING");
});
