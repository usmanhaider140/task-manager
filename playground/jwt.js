//  Example: on how to use jwt
const jwt = require("jsonwebtoken");
const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "shikkimikki", {
    expiresIn: "2 seconds",
  });

  await setTimeout(() => {
    const data = jwt.verify(token, "shikkimikki");
    console.log(data);
  }, 2000);
};

myFunction();
