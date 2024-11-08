// controllers/api/homeroutes.js

const router = require("express").Router();

const { Category, Product, Tag } = require("../models");
const User = require("../models/user");
// const User = require('../models/User');
const withAuth = require("../utils/auth"); // Middleware to protect certain routes

// Homepage route
router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session?.loggedIn || false,
    username: req.session?.username || null,
  });
});

// Login page route
router.get("/login", (req, res) => {
  console.log("Login route hit"); // Debugging line
  if (req.session?.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Signup page route
router.get("/signup", (req, res) => {
  console.log("Signup route hit"); // Debugging line
  if (req.session?.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});


// GET all categories, products, and tags for inventory display
router.get("/inventory", async (req, res) => {
  try {
    const categories = await Category.findAll();
    const products = await Product.findAll();
    const tags = await Tag.findAll();

    res.render("project", {
      categories: categories.map((category) => category.get({ plain: true })),
      products: products.map((prod) => prod.get({ plain: true })),
      tags: tags.map((tag) => tag.get({ plain: true })),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/add-category", async (req, res) => {
  try {
    res.render("category", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/add-product", async (req, res) => {
  try {
    res.render("product", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route to render the form for adding a new tag
router.get('/add-tag', (req, res) => {
  res.render('tag', { loggedIn: req.session.loggedIn });
});

// Profile page route (protected by authentication middleware)
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: ["username", "email"],
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userData.get({ plain: true });


    res.render("profile", {
      loggedIn: req.session.loggedIn,
      username: user.username,
      email: user.email,
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

module.exports = router;
