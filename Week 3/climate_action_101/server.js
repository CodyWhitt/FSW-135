const express = require("express")
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

//middleware
app.use(express.json())
app.use(morgan('dev'))

//connect to DB
main().catch(err => console.log(err));
  async function main() {
      await mongoose.connect('mongodb://localhost:27017/commentdb');
      console.log("Connected to the DB")
}

//routes
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({ secret: process.env.SECRET })) // req.user
app.use("/comment", require("./routes/commentRouter.js"))
app.use("/issue", require("./routes/issueRouter.js"))
app.use("/user", require("./routes/userRouter.js"))

//error handling
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

//Server Listen
app.listen(9000, () => {
    console.log("The server is running on port 9000")
}) 