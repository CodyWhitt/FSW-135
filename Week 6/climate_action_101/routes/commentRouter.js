// prereq
const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/comment.js')

// routes
commentRouter
  // get-http://localhost:9000/Comment/
  .get("/", (req, res, next) => {
    Comment.find((err, comment) => {
        if (err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
  }) // read all
   
  .post('/', (req, res, next) => {
    req.body.user = req._id
    const newItem = new Comment(req.body)
    newItem.save((err, savedItem) => {
      if (err){
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedItem)
  })
  }) // create item

  // delete-http://localhost:9000/comment/:_id
  .delete("/:itemId", (req, res, next) => {
    Comment.findOneAndDelete(
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
    Comment.findOneAndUpdate(
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
    Comment.findOne(
      { _id: req.params.itemId},
      (err, item) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(item)
      }
    )  
  }) // GET one

;

//modularization 
module.exports = commentRouter 