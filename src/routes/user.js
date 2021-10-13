const express = require("express");
const router = new express.Router();
const { auth } = require("../middleware/auth");
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/account");
const uploadAvatar = multer({
  // dest: "images/avatar",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Please Upload an image with .jpg .jpeg or png extension")
      );
    }
    cb(undefined, true);
    // cb(new Error("Please Upload an Image"));
    // cb(undefined, true);
    // cb(undefined, false);
  },
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
  // user
  //   .save()
  //   .then((user) => {
  //     res.status(201).send(user);
  //   })
  //   .catch((err)  => res.status(400).send(err));
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("Logout successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logout/all", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logout from all devices successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize(300, 300)
      .png()
      .toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send("Avatar Deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  // User.find()
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((err) => res.status(500).send(err));
  // try {
  //   const users = await User.find();
  //   res.send(users);
  // } catch (error) {
  //   res.status(500).send(error);
  // }
  res.send(req.user);
});

router.get("/users/:id", auth, async (req, res) => {
  const _id = req.params.id;
  // User.findById(req.params.id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send("Not Found");
  //     }
  //     res.send(user);
  //   })
  //   .catch((e) => res.status(500).send(e));

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send("Not Found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    const user = await req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    // Note: This is done due to the issue with pre middle ware of mongoose
    // user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // })
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).send("Not Found");
    }
    await req.user.remove();
    sendCancellationEmail(user.email, user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
