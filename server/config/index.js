import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: "pmya.canary.lmesacademy.net",
  port: 25060,
  user: "yugi",
  password: "dhwiOCh4epPn8tUf",
  database: "06_yugi",
});

export const promisePool = connection.promise();
