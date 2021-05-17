const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const { initializeDBConnection } = require("./dbConfig");
const cors = require("cors");
const PORT = process.env.PORT || 3002
const app = express();

app.use(bodyParser.json());
app.use(cors());
initializeDBConnection();

const books = require("./routes/books.router");
const users  = require("./routes/users.router")
const usersActivity = require("./routes/usersActivity.router")
const address = require("./routes/address.router")
// const usersActivity = require("./routes/usersActivity.router")

// // called before any route handler

app.use("/books",books);
app.use("/users",users)
app.use("/userActivity",usersActivity)
app.use("/address",address)


app.get("/", (request, response) => {
  // response.json({ hello: "Welcome to Startup Reads" });
  response.sendFile(__dirname+"/welcome.html");
});

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: "route not found on server, please check",
    });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: "error occurred, see the errMessage key for more details",
      errorMessage: err.message,
    });
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
