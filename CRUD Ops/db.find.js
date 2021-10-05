db.collection("users").findOne({ age: 23 }, (error, user) => {
  if (error) return console.log("Unable to fetch");
  console.log(user);
});

db.collection("users")
  .find({ name: "Usman" })
  .toArray((error, users) => {
    if (error) return console.log(error);
    console.log(users);
  });

db.collection("users")
  .find({ name: "Usman" })
  .count((error, count) => {
    if (error) return console.log(error);
    console.log(count);
  });

db.collection("tasks")
  .find({ completed: false })
  .toArray((error, tasks) => {
    if (error) return console.log(error);
    else console.log(tasks);
  });
