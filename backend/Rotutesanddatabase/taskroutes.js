const express = require("express");
const userschema = require("../Schema/userschema");
const router = express.Router();

router.post("/createtask", async (req, res) => {
  try {
    const { Email, task, date } = req.body;
    console.log(Email, task);

    const userexist = await userschema.findOne({ Email: Email });
    if (userexist) {
      if (task.length > 0) {
        const taskexist = userexist.Usertasks.some(
          (taskdata) => taskdata.task === task
        );
        if (!taskexist) {
          try {
            userexist.Usertasks.push({
              task: task,
              date: date,
            });
            await userexist.save();
            res.status(200).json({
              success: true,
              message: "The Task is Added Successfully",
            });
          } catch (error) {
            res.status(401).json({
              message: "problem in finding task",
            });
          }
        } else {
          res.status(401).json({
            success: false,
            message: "task already exist",
          });
        }
      } else {
        res.status(401).json({
          message: "task should not be empty",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Technical error",
    });
  }
});

router.post("/gettask", async (req, res) => {
  try {
    const { Email } = req.body;
    const userexist = await userschema.findOne({ Email: Email });
    if (userexist) {
      try {
        const taskdata = userexist.Usertasks;
        res.status(200).json({
          success: true,
          taskdata: taskdata,
        });
      } catch (error) {
        res.status(401).json({
          message: "problem in finding task",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Technical error",
    });
  }
});

router.post("/updatetask", async (req, res) => {
  try {
    const { Email, task, date, index } = req.body;

    const userexist = await userschema.findOne({ Email: Email });
    if (userexist) {
      try {
        userexist.Usertasks.splice(index, 1, {
          task: task,
          date: date,
        });
        await userexist.save();
        res.status(200).json({
          success: true,
          message: "The Task is updated Successfully",
        });
      } catch (error) {
        res.status(401).json({
          message: "problem in updating task",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "user dosent exist",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Technical error",
    });
  }
});

router.post("/deletetask", async (req, res) => {
  try {
    const { Email, index } = req.body;

    const userexist = await userschema.findOne({ Email: Email });
    if (userexist) {
      try {
        userexist.Usertasks.splice(index, 1);
        await userexist.save();
        res.status(200).json({
          success: true,
          message: "The Task is deleted Successfully",
        });
      } catch (error) {
        res.status(401).json({
          message: "problem in deleting task",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "user dosent exist",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Technical error",
    });
  }
});

module.exports = router;
