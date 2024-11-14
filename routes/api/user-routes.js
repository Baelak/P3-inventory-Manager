const User = require('../../models/User');
const router = require('express').Router();

// get ALL USERS
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll(
      {attributes: { exclude: ["password"] } 
    });
    res.status(200).json(users);
  }catch (err) {
    res.status(500).json({message:'Uh oh! That did not work 😅', error: err});
  }
});

// get user for login
// router.post('/login', async (req, res) => {
//     const { email, password} = req.body;
//     try {
//       const user = await User.findOne({ where: {email}});

//       if(!user || user.password != password) {
//         return res.status(401).json({message: "Invalid credentials"});
//       }
//       res.status(200).json(user);
//     }catch (err) {
//       res.status(500).json({message:'Uh oh! That did not work 😅', error: err});
//     }
//   });

router.post('/login', async (req, res) => {
  console.log("hello")
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password 😅, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password 😅, please try again' });
      return;
    }
    console.log(userData)
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in! 😄' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//get ONE USER BY ID
router.get('/:id', async (req, res) => {
  try {
    const user =await User.findByPk(
      req.params.id, {exclude: ["password"]});
      if (!user){
        res.status(404).json({message: "No tag found with this id 🤭"});
        return
      }
      res.status(200).json(user);
  } catch (err) {
    res.status(500).json({message: 'Uh oh! That did not work 😅', error: err});
  }
});

// post CREATE A NEW USER
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({message: 'User has been Created 😄', user});
  } catch (err) {
    res.status(500).json({message: 'Uh oh! That did not work 😅', error:err});
  }
});

  // put UPDATE A USER BY ID

  router.put('/:id', async (req, res) => {
    try {
      const updated = await User.update(req.body, { where: { id: req.params.id } });
      if (!updated[0]) {
        return res.status(404).json({ message: 'No User found with this id 🤭' });
      }
      res.status(200).json({ message: 'Tag has been updated 😄'});
    } catch (err) {
      res.status(500).json({ message: 'Uh oh! That did not work 😅', error: err });
    }
  });

  // delete A TAG BY ID

  router.delete('/:id', async (req, res) => {
    try {
     const user = await User.findByPk(req.params.id);
  
      res.status(200).json({ message: 'Tag Deleted ☠️' });
    } catch (err) {
      res.status(500).json({ message: 'Uh oh! That did not work 😅', error: err });
    }
  });
    
module.exports = router;
