const express = require('express')
const getConnection = require('./db')
const mongoose = require("mongoose");
const cors = require('cors')
const app = express()
const port = 5000
getConnection()
app.use(express.json());
app.use(cors())


app.use('/api/auth', require('./routes/user'))
app.use('/api/note', require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})