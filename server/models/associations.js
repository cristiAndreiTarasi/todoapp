const Task = require("./task");
const User = require("./user");

// One user has many tasks
User.hasMany(Task, {
    foreignKey: "userId",
    as: "tasks",
});

// One task belongs to only one user
Task.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});