const Task = require("../models/task");

// Create one task
exports.createTask = async (req, res) => {
    const { title, description, createDate } = req.body;
    
    try {
        const task = await Task.create({ title, description, createDate });
        res.status(201).json(task);
    } catch (_) {
        res.status(500).json({
            message: "Task creation failed.",
        });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (_) {
        res.status(500).json({
            message: "Task fteching failed.",
        });
    }
};

//Update a task
exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;

    try {
        const task = await Task.findByPk(taskId);

        if (task) {
            task.title = title;
            task.description = description;

            await task.save();
            res.status(200).json(task);
        }
    } catch (_) {
        res.status(500).json({
            message: "Updating the task failed.",
        });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findByPk(taskId);

        if (task) {
            await task.destroy();
            res.status(200).json({
                message: "Deleted task successfuly.",
            });
        } else {
            res.status(404).json({
                message: "Not found.",
            });
        }
    } catch (_) {
        res.status(500).json({
            message: "Task deletion failed.",
        });
    }
};