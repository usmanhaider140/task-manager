const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.auth = async (req, res, next) => {
  try {
    console.log("Auth Run");
    const token = await req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "shikkimikki");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticated" });
  }
};
