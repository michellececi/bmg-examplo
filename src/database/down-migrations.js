const MigrationsAndSeedersManager = require("./MigrationsAndSeedersManager");

MigrationsAndSeedersManager.down().then(function () {
  console.log(
    "\n\nAll migrations from @brydge-ecosystem/shared-files + Microservice were rolled back"
  );
  process.exit();
});
