// prereq
const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/issue.js')

// routes
issueRouter
  // get-http://localhost:9000/issue/
  .get("/", (req, res, next) => {
    Issue.find((err, issue) => {
        if (err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })
  }) // read all
   
  .post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newItem = new Issue(req.body)
    newItem.save((err, savedItem) => {
      if (err){
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedItem)
  })
  }) // create item

  // delete-http://localhost:9000/issue/:_id
  .delete("/:itemId", (req, res, next) => {
    Issue.findOneAndDelete(
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
    Issue.findOneAndUpdate(
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

  // Get issues by user id
  .get("/user", (req, res, next) => {
    console.log('love')
    // Issue.find({ user: req.user._id }, (err, issues) => {
    //   if(err){
    //     res.status(500)
    //     return next(err)
    //   }
    //   return res.status(200).send(issues)
    // })
  })

;

//modularization 
module.exports = issueRouter 