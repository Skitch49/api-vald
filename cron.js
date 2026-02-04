require("dotenv").config();
const { CronJob } = require("cron");
const https = require("https");

const job = new CronJob(
  "*/14 * * * *",
  function () {
    // Cette fonction est executer toutes les 14 min.
    console.log("Restarting server");
    console.log(process.env.URL_API_BACKEND);

    try {
      https.get(process.env.URL_API_BACKEND, (res) => {
        if (res.statusCode == 200 || res.statusCode == 201) {
          console.log("Server restarted");
        } else {
          console.error(
            `failed to restart server with status code: ${res.statusCode}`,
          );
        }
      });
    } catch (error) {
      console.error("Error during Restart:", error.message);
    }
  },
  null,
  true, // Pour démarrer job automatiquement
);

module.exports = job;
