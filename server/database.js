const { Sequelize } = require("sequelize");

const sqlDb = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
});

module.exports = sqlDb;