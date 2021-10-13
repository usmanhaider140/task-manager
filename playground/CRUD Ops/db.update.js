db.collection("users")
  .updateOne(
    {
      _id: ObjectId("6150aec45c661fb2ada2f100"),
    },
    {
      $set: {
        name: "Sufyan",
        age: "16",
      },
    }
  )
  .then((result) => console.log("result", result))
  .catch((error) => console.log("error", error));

db.collection("tasks")
  .updateMany(
    {
      completed: false,
    },
    {
      $set: {
        completed: true,
      },
    }
  )
  .then((res) => console.log(res.modifiedCount))
  .catch((err) => console.log(err));
