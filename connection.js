const { Sequelize } = require(`sequelize`);
const { db } = require("./config");
const cfg = require(`./config`);
const logger = require("./logger");
const sequelize = new Sequelize({
    host: db.host,
    password: db.password,
    username: db.username,
    database: db.database,
    dialect: db.dialect,
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        logger.log(
            `Connected to ${sequelize.config.database} at ${sequelize.config.host}:${sequelize.config.port}`
        );
    } catch (e) {
        logger.err(__filename, e);
    }
};

module.exports = { connect, sequelize };
