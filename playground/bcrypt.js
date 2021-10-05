const bcrypt = require("bcryptjs");

const myFunction = async () => {
  const pwd = "Red12345";
  const hashedPassword = await bcrypt.hash(pwd, 8);
  console.log(pwd);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare("red12345", hashedPassword);
  console.log(isMatch);
};

myFunction();
