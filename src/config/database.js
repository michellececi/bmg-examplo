const path = require("path");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: path.resolve(__dirname, "..", "..", ".env." + process.env.NODE_ENV),
});

module.exports = {
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  define: {
    paranoid: false,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  },
  timezone: "-03:00",
};
