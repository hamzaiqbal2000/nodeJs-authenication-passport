const User = require('../models/User')
const passport = require("passport");
const bcrypt = require('bcryptjs')

//post request that handles register
const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body
  if(!name || !email || !password || !confirm ) {
    console.log('fill empty fields')
  }
  //confirm the passwords
  if(password !== confirm) {
    console.log('Password must match')
  } else {
    // Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log('email exists')
        res.render('register', {
          name, email, password, confirm
        })
      } else {
        const newUser = new User({
          name, email, location, password
        })
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(res.redirect('/login'))
              .catch((err) => console.log(err))
          })  )
      }
    })
  }
}

//for Register Page
const registerView = (req, res) => {
  res.render('register', {})
}

const loginView = (req, res) => {
  res.render('login', {})
}

const loginUser = (req, res) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
}

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser
}
