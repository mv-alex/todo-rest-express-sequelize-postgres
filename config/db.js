const { Sequelize } = require("sequelize");

const UserDB = process.env.DB_USERNAME || "admin";
const PasswordDB = process.env.DB_PASSWORD || "admin";
const NameDB = process.env.DB_NAME || "todo";
const HostDB = process.env.DB_HOST || "postgres";
const PortDB = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(NameDB, UserDB, PasswordDB, {
  host: HostDB,
  dialect: "postgres",
  port: PortDB,
});

module.exports = sequelize;
