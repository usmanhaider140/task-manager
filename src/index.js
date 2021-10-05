const express = require("express");
require("./db/mongoose");
const chalk = require("chalk");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Example Middleware
// app.use((req, res, next) => {
//   console.log(chalk.greenBright.inverse("MiddleWare"), req.method, req.path);
//   if (req.method === "GET") {
//     res.send("Get requests are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("maintenance error");
// });

app.use(userRouter);
app.use(taskRouter);
app.get("/", (req, res) => {
  res.status(200).send("up");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

// Comment:: Without middleware new request --> run route handler

// Comment:: With middleware new request --> do something --> run router handler

// jwt.sign({_id: 123}, "key", {expiresIn: '20 seconds'})

// const pet = {
//   name: "billi",
// };

// pet.toJSON = function () {
//   return {};
// };
// console.log(JSON.stringify(pet));
