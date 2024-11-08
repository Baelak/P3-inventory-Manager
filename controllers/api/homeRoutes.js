// controllers/api/homeroutes.js

const router = require('express').Router();

const User = require('../../models/user');
const withAuth = require('../../utils/auth'); // Middleware to protect certain routes

// Homepage route
router.get('/', (req, res) => {
  res.render('homepage', { loggedIn: req.session?.loggedIn || false });
});

// Login page route
router.get('/login', (req, res) => {
  console.log('Login route hit'); // Debugging line
  if (req.session?.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup page route
router.get('/signup', (req, res) => {
  console.log('Signup route hit'); // Debugging line
  if (req.session?.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// POST route for signing up
router.post('/api/users/signup', async (req, res) => {
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

      res.status(201).json({ user: newUser, message: 'You have successfully signed up! 🎉' });
    });
  } catch (err) {
    console.error(err); // Debugging line
    res.status(400).json({ message: 'Failed to sign up, please try again.' });
  }
});

// Profile page route (protected by authentication middleware)
router.get('/profile', withAuth, (req, res) => {
  res.render('profile', { loggedIn: req.session?.loggedIn });
});

module.exports = router;
