const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../authMiddleware");

router.use(authMiddleware);

// routes for the task controller
router.post("/create", taskController.createTask);
router.get("/getAll", taskController.getAllTasks);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;


