import { promisePool as conn } from "../config/index.js";

export const getAllTasks = (req, res) => {
  conn.query("SELECT * FROM tasks").then((result) => {
    let tasks = result[0];

    res.json({
      success: true,
      tasks,
    });
  });
};

export const createTask = (req, res) => {
  let newTask = req.body.newTask;

  conn
    .query("INSERT INTO tasks (taskName, status) VALUES (?, 'incomplete')", [
      newTask,
    ])
    .then((result) => {
      res.json({
        success: true,
        message: "Task inserted successfully.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTask = (req, res) => {
  let status = req.body.status;
  let taskId = req.body.taskId;

  conn
    .query("UPDATE tasks SET status = ? WHERE taskId = ?", [status, taskId])
    .then((result) => {
      res.json({
        success: true,
        message: "Task updated successfully.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTask = (req, res) => {
  let taskId = req.query.taskId;

  conn
    .query("DELETE FROM tasks WHERE taskId = ?", [taskId])
    .then((result) => {
      res.json({
        success: true,
        message: "Task deleted successfully.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
