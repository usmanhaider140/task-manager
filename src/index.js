const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const { urlencoded, json } = require("body-parser");

const app = express();
const port = process.env.PORT;
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.get("/", (req, res) => {
  res.status(200).send("up");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
