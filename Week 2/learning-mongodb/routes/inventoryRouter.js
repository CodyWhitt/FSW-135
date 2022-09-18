// prereq
const express = require('express');
const inventoryRouter = express.Router();
const Inventory = require('../models/inventory.js')

// routes
inventoryRouter
  // get-http://localhost:9000/inventory/
  .get("/", (req, res, next) => {
    Inventory.find((err, inventory) => {
        if (err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
  }) // read all
   
  .post('/', (req, res, next) => {
    const newItem = new Inventory(req.body)
    newItem.save((err, savedItem) => {
      if (err){
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedItem)
  })
  }) // create item

  // delete-http://localhost:9000/recycled/:_id
  .delete("/:itemId", (req, res, next) => {
    Inventory.findOneAndDelete(
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
    Inventory.findOneAndUpdate(
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
    Inventory.findOne(
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
module.exports = inventoryRouter 