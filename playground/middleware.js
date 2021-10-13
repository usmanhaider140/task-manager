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
