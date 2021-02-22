const MigrationsAndSeedersManager = require("./MigrationsAndSeedersManager");

MigrationsAndSeedersManager.up().then(function () {
  console.log(
    "\n\nAll migrations and seeders from @brydge-ecosystem/shared-files + Microservice were executed"
  );
  process.exit();
});
