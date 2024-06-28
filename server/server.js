const express = require("express");
const app = express();

app.use(express.json());

const chalk = require("chalk");
const PORT = 5000;

//Initialize Sequelize
const db = require("./models");

// Test the connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log(chalk.green("Connection has been established successfully."));
  })
  .catch((err) => {
    console.error(`Unable to connect to the database: ${chalk.red(err)}`);
  });

// Sync models
db.sequelize
  .sync()
  .then(() => {
    console.log(chalk.green("Models synchronized successfully."));
  })
  .catch((err) => {
    console.error(`Error synchronizing models: ${chalk.red(err)}`);
  });

//Import Routes
const booksRouter = require("./routes/Books");
const authorsRouter = require("./routes/Authors");
const genresRouter = require("./routes/Genres");

app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${chalk.green(PORT)}`);
});
