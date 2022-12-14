const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

//middleware
app.use(express.json())
app.use(morgan('dev'))

//connect to DB
main().catch(err => console.log(err));
  async function main() {
      await mongoose.connect('mongodb://localhost:27017/inventorydb');
      console.log("Connected to the DB")
  }

//routes
app.use("/inventory", require("./routes/inventoryRouter.js"))


//error handling
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

//Server Listen
app.listen(9000, () => {
    console.log("The server is running on port 9000")
}) 