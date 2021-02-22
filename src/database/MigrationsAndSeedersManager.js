const path = require("path");
const Umzug = require("umzug");
const models = require("../app/models");

const sharedMigrationsPath = path.resolve(
  "node_modules",
  "@brydge-ecosystem",
  "shared-files",
  "database",
  "migrations"
);
const sharedSeedersPath = path.resolve(
  "node_modules",
  "@brydge-ecosystem",
  "shared-files",
  "database",
  "seeders"
);

const microservicesMigrationsPath = path.resolve(__dirname, "migrations");
const microservicesSeedersPath = path.resolve(__dirname, "seeders");

const migrationsSharedFilesConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize,
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor,
    ],
    path: sharedMigrationsPath,
    pattern: /\.js$/,
  },
};

const migrationsMicroserviceConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize,
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor,
    ],
    path: microservicesMigrationsPath,
    pattern: /\.js$/,
  },
};

const seedsSharedFilesConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize,
    modelName: "SequelizeData",
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor,
    ],
    path: sharedSeedersPath,
    pattern: /\.js$/,
  },
};

const seedsMicroserviceConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize,
    modelName: "SequelizeData",
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor,
    ],
    path: microservicesSeedersPath,
    pattern: /\.js$/,
  },
};

const migratorSharedFiles = new Umzug(migrationsSharedFilesConfig);
const seederSharedFiles = new Umzug(seedsSharedFilesConfig);
const migratorMicroservice = new Umzug(migrationsMicroserviceConfig);
const seederMicroservice = new Umzug(seedsMicroserviceConfig);

module.exports = {
  up: () =>
    migratorSharedFiles
      .up()
      .then(() => migratorMicroservice.up())
      .then(() => seederSharedFiles.up())
      .then(() => seederMicroservice.up()),
  down: () =>
    seederMicroservice
      .down()
      .then(() => seederSharedFiles.down())
      .then(() => migratorMicroservice.down())
      .then(() => migratorSharedFiles.down()),
};
