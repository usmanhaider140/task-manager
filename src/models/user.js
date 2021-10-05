const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: [7, "Password at least 8 characters"],
    validate(value) {
      isContainPassword = /password/i.test(value);
      if (isContainPassword)
        throw new Error("Password should not contain password word");
      if (!validator.isLength(value, { min: 7 }))
        throw new Error(
          "Password length is less than or equal to six which is incorrect"
        );
    },
  },

  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Tip Statics Methods are accessible on modal and sometime called model method
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to Login");
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// Tip Statics Methods are accessible on instances and called instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "shikkimikki");

  user.tokens = user.tokens.concat({
    token,
  });

  await user.save();

  return token;
};

// Hash the plain text password before saving

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = model("User", userSchema);

// Example To show how to use User model
// const newUser = new User({
//   name: " Shan Haider  ",
//   email: "mike@gmail.com",
//   password: " 12345678 ",
// });

// newUser
//   .save()
//   .then((user) => console.log(user))
//   .catch((err) => console.log("Error", err));

module.exports = User;
