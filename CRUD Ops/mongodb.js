// CRUD(Create, Read, Update, Delete) Operations

const chalk = require("chalk");
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;
const { MongoClient, ObjectId } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
  },
  (error, client) => {
    if (error) {
      return console.log(chalk.redBright.inverse("Unable to connect database"));
    }
    const db = client.db(databaseName);
  }
);
