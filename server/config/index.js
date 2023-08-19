import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool(process.env.DB_URL);

export const promisePool = connection.promise();
