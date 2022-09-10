const mongoose = require('mongoose')
const Schema = mongoose.Schema

// inventory schema 
const inventorySchema = new Schema ({
    title: {
        type: String,
        required: true
    }, 
    genre: {
        type: String,
        required: true
    },
    release_year: {
        type: String,
        required: true,
        min: 1874
    }
})

module.exports = mongoose.model('Inventory', inventorySchema)