const { Model, DataTypes } = require("sequelize");
const sqlDb = require("../database");

class Task extends Model {}

Task.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING
    },
    createDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: sqlDb,
    modelName: "Task",
});

module.exports = Task;