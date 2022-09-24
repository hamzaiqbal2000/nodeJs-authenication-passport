const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const passport = require('passport')
const { loginCheck } = require('./auth/passport')
loginCheck(passport)

// mongodb connection
const database = process.env.MONGOLAB_URI
mongoose
  .connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('database connect'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs')

//bodyParsing
app.use(express.urlencoded({extended: false}))

app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/', require('./routes/login'))


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Server start for port:' + PORT))


