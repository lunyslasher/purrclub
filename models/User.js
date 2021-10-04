const { STRING, NUMBER, INTEGER, BOOLEAN } = require(`sequelize`);
const { sequelize } = require("../connection");

const User = sequelize.define(`user`, {
    username: { type: STRING, allowNull: false, unique: true },
    email: { type: STRING, allowNull: false, unique: true },
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    password: { type: STRING, allowNull: false },
    confirmHash: { type: STRING },
    active: { type: BOOLEAN, defaultValue: false },
});

module.exports = User;
