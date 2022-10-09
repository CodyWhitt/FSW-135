// prereq
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js')

// routes
userRouter
  // get-http://localhost:9000/user/
  .get("/", (req, res, next) => {
    User.find((err, user) => {
        if (err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
  }) // read all
   
  .post('/', (req, res, next) => {
    const newItem = new User(req.body)
    newItem.save((err, savedItem) => {
      if (err){
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedItem)
  })
  }) // create item

  // delete-http://localhost:9000/user/:_id
  .delete("/:itemId", (req, res, next) => {
    User.findOneAndDelete(
      {_id: req.params.itemId}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
      }
    )
  })//delete item

  .put("/:itemId", (req, res, next) => {
    User.findOneAndUpdate(
      { _id: req.params.itemId},
      req.body,
      {new: true},
      (err, updatedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedItem)
      }
    )  
  }) //update item

  .get("/:itemId", (req, res, next) => {
    User.findOne(
      { _id: req.params.itemId},
      (err, item) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(item)
      }
    )  
  })

;

//modularization 
module.exports = userRouter 