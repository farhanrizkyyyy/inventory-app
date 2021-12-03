const mongoose = require('mongoose')

const Inventory = mongoose.model('Inventory', {
  name: {
    type: String,
    required: true
  },
  qty: {
    type: String,
    required: true
  }
})

module.exports = Inventory