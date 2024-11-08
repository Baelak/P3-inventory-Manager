const User = require("../../models/user");

const router = require("express").Router();

// User login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password 😅, please try again" });
      return;
    }

    if (req.body.password != userData.password) {
      res
        .status(400)
        .json({ message: "Incorrect password 😅, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      req.session.username = userData.username;
      res.redirect("/profile");
      // res.json({ user: userData, message: 'You are now logged in! 😄' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User signup
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.name, // Assuming you have a field for name
      email: req.body.email,
      password: req.body.password,
    });

    // Save user ID and loggedIn state in session
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;
      req.session.username = newUser.username;
      res.redirect("/");
      // res.status(201).json({ user: newUser, message: 'You have successfully signed up! 🎉' });
    });
  } catch (err) {
    console.error(err); // Debugging line
    res.status(400).json({ message: "Failed to sign up, please try again." });
  }
});

// User logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;