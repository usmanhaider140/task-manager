// db.collection("users").insertOne(
//   {
//     _id: id,
//     name: "shan",
//     age: 23,
//   },
//   (error, result) => {
//     if (error) return console.log(chalk.red(error));
//     console.log(result);
//   }
// );
// console.log(
//   chalk.greenBright.inverse(
//     `mongoDB Connected on ${connectionURL} Successfully`
//   )
// );

// db.collection("users").insertMany(
//   [
//     {
//       name: "ali",
//       age: 22,
//     },
//     {
//       name: "abduallah",
//       age: 10,
//     },
//   ],
//   (error, result) => {
//     if (error) return console.log(error);
//     else console.log(result.ops);
//   }
// );

// db.collection("tasks").insertMany(
//   [
//     {
//       description: "Today I have to make schema",
//       completed: false,
//     },
//     {
//       description: "Tomorrow, I will go to the office",
//       completed: true,
//     },
//   ],
//   (error, result) => {
//     if (error) return console.log(error);
//     console.log(result);
//   }
// );
