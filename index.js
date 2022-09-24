const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.set('view engine', 'ejs')
//routes
app.use('/', require('./routes/login'))

// mongodb connection
const database = process.env.MONGOLAB_URI
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('database connect'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Server start for port:' + PORT))


