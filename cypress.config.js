const { defineConfig } = require("cypress");
const mysql = require("mysql");

module.exports = defineConfig({
  projectId: "q4b2t8",
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: query => {
          return queryTestDb(query, config);
        }
      });
      // implement node event listeners here
    },
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'spec, mochawesome',
      mochawesomeReporterOptions:{
        reportDir: "cypress/reports/mochawesome",
        overwrite: false,
        html: false,
        json: true
      }
    },
    retries: {
      runMode: 2,     // Retries for failed tests in Jenkins (run mode)
      openMode: 0     // No retries in Cypress GUI
    },
    trashAssetsBeforeRuns: false,
    "env":{
      "db": {
          "user": "root",
          "host": "127.0.0.1",
          "database": "cypress_testing",
          "password": "root",
          "port": 3306
      }
    },
    baseUrl: "https://automationteststore.com/index.php?rt=account/login",
  }
});

function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console.log(results)
        return resolve(results);
      }
    });
  });
}
