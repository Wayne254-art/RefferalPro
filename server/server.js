const app = require(`./app`);
const { checkDbConnection } = require("./Database/database");
const {
  deleteUnverifiedUser,
} = require("./middleware/actionScheduler.middleware");
const logger = require("./utils/logger");
const path = require('path');

// Handle Uncaught Exception
process.on(`uncaughtException`, (error) => {
  console.error(`ERROR: ${error.message}`);
  // console.error(error.stack); 
  console.error(`Shutting down the server due to an uncaught exception`);

  logger.error(`ERROR: ${error.message}`);
  logger.error(`Shutting down the server due to an uncaught exception`);
  process.exit(1); // Safely exit after logging
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: path.join(__dirname, "config/.env"), // Safely join the directory and file path
  });
}

const port = process.env.PORT || 3000; // Default to port 3000 if not in the env

// Deleting unverified User
deleteUnverifiedUser.start();

// Create server
const server = app.listen(port, () => {
  logger.debug(`Server is running on http://localhost:${port}`);
  console.log(`Server is running on http://localhost:${port}`);
});

// Middleware to check database connection
app.use((req, res, next) => {
  checkDbConnection(req);
  next();
});

// Unhandled Promise Rejection
process.on(`unhandledRejection`, (error) => {
  console.error(`Error: ${error.message}`);
  console.error(`Shutting down the server due to unhandled promise rejection`);

  logger.error(`Error: ${error.message}`);
  logger.error(`Shutting down the server due to unhandled promise rejection`);

  // Close the server and exit process
  server.close(() => {
    process.exit(1); // Exit after closing the server
  });
});
