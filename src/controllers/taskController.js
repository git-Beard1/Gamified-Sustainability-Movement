/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: taskController.js

    Last Modified: 21/01/2023
*/

// Section A: Task

const taskModel = require("../models/taskModel");

// Universal task_id Validation Controller (for params)
module.exports.checkTaskValidationParams = (req, res, next) => {
  const { task_id } = req.params;
  const data = {
    task_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkTaskValidationParams",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    // Checks task_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid task_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.task_id = results[0]; // store task_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkTaskValidationParams", res.locals.task_id);
      next();
    }
  };
  taskModel.checkTask(data, callback);
};

// Universal task_id Validation Controller (for body)
module.exports.checkTaskValidationBody = (req, res, next) => {
  const { task_id } = req.body;
  const data = {
    task_id: parseInt(task_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkTaskValidationBody",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 400
    else if (!task_id) {
      res.status(400).json({
        message: "Missing Required Data",
      });
      return;
    }

    // Status 404
    // Checks task_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid task_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.task_id = results[0]; // store task_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkTaskValidationBody", res.locals.task_id);
      next();
    }
  };
  taskModel.checkTask(data, callback);
};

// Endpoint 8: GET /tasks/{task_id}
module.exports.selectTaskById = (req, res, next) => {
  const { task_id } = req.params;
  const data = {
    task_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectTaskById",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(results[0]);
    }
  };
  taskModel.selectTask(data, callback);
};

// Endpoint 7 GET /tasks
module.exports.readAllTasks = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllTasks",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "No Records Found",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(results);
    }
  };
  taskModel.readTasks(callback);
};

// Endpoint 6 POST /tasks
module.exports.createNewTask = (req, res, next) => {
  const { title, description, points } = req.body;
  const data = {
    task_id: null,
    title,
    description,
    points: parseInt(points),
  };

  // Status 400
  if ((!title, !description, !points)) {
    res.status(400).json({
      message: "Missing Required Data",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "createNewTask",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 201
    else {
      data.task_id = results.insertId;
      res.status(201).json(data);
    }
  };
  taskModel.createTask(data, callback);
};

// Endpoint 9: PUT /tasks/{task_id}
module.exports.updateTaskById = (req, res, next) => {
  const { task_id } = req.params;
  const { title, description, points } = req.body;
  const data = {
    task_id: parseInt(task_id),
    title,
    description,
    points: parseInt(points),
  };

  // Status 400
  if (!title || !description || !points) {
    res.status(400).json({
      message: "Missing Required Data",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updateTaskById",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(data);
    }
  };
  taskModel.updateTask(data, callback);
};

// Endpoint 10: DELETE /tasks/{task_id}
module.exports.deleteTaskById = (req, res, next) => {
  const { task_id } = req.params;
  const data = {
    task_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteTaskByID",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }

    // Status 204
    else {
      res.status(204).send();
    }
  };
  taskModel.deleteTask(data, callback);
};
