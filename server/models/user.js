const { DataTypes, Model } = require("sequelize");
const sqlDb = require("../database");

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sqlDb,
    modelName: "User",
});

module.exports = User;