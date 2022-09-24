const express = require('express')
const app = express()
app.set('view engine', 'ejs')

//routes
app.use('/', require('./routes/login'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Server start for port:' + PORT))


