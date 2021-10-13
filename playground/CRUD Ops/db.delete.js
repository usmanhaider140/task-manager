db.collection("users")
  .deleteOne({
    age: 22,
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

db.collection("tasks")
  .deleteMany({
    completed: true,
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
