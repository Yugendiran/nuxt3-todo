import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: "db-golspoh-do-user-14533212-0.b.db.ondigitalocean.com",
  port: 25060,
  user: "common_user",
  password: "AVNS_Hkki34EfCUhNaY3QMuR",
  database: "test_db",
  sslmode: "REQUIRED",
});

export const promisePool = connection.promise();
