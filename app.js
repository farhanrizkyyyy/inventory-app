const express = require('express')
const bodyParser = require('body-parser')
const md5 = require('md5')
const Inventory = require('./models/Inventory.js')
const Admin = require('./models/Admin.js')

require('./configs/db')

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//set root route
app.get('/', (req, res) => {
  res.json({
    status: 'Connected',
    message: 'Hello, this is the root.'
  })
})

// START INVENTORY

//set route getAllInventory
app.get('/inventory', (req, res) => {
  Inventory.find((error, inventory) => {
    if (error) {
      res.json({
        status: 'Error',
        message: error
      })
    }

    res.json({
      status: 'Success',
      message: 'Data retrieved.',
      data: inventory
    })
  })
})

//set route getInventoryById
app.get('/inventory/view/:_id', (req, res) => {
  Inventory.findOne({
    _id: req.params._id
  }, (error, inventory) => {
    if (error) {
      return res.json({
        status: 'Error',
        message: error
      })
    }

    //validasi apakah id tersedia atau tidak
    if (inventory === null) {
      return res.json({
        status: 'Error',
        message: 'Data not found.'
      })
    }

    res.json({
      status: 'Success',
      message: 'Data found.',
      data: inventory
    })
  })
})

//set route addInventory
app.post('/inventory', (req, res) => {
  Inventory.insertMany({
    name: req.body.name,
    qty: req.body.qty
  }, (error, inventory) => {
    if (error) {
      return res.json({
        status: 'Error',
        message: error
      })
    }

    res.json({
      status: 'Success',
      message: 'New inventory has been added.',
      data: inventory
    })
  })
})

//set route updateInventory
app.put('/inventory/update/:_id', (req, res) => {
  var getInventory = Inventory.findById({
    _id: req.params._id
  }, (error) => {
    if (error) {
      return res.json({
        status: 'Error',
        message: error
      })
    }
  })

  getInventory.updateOne({
    name: req.params.name,
    qty: req.params.qty
  }, (error, inventory) => {
    if (error) {
      return res.json({
        status: 'Error',
        message: error
      })
    }

    res.json({
      status: 'Success',
      message: 'Data has been updated.',
      data: inventory
    })
  })
})

//set route deleteInventory
app.delete('/inventory/delete/:_id', (req, res) => {
  Inventory.deleteOne({
    _id: req.params._id
  }, (error, inventory) => {
    if (error) {
      return res.json({
        status: 'Error',
        message: error
      })
    }

    if (inventory.deletedCount === 0) {
      return res.json({
        status: 'Error',
        message: 'Data not found.'
      })
    }

    res.json({
      status: 'Success',
      message: 'Data deleted.',
      data: inventory
    })
  })
})

// END INVENTORY

app.get('/admin', (req, res) => {
  Admin.find((error, admin) => {
    if (error) {
      return res.json({
        status: 'Error',
        message: error
      })
    }

    res.json({
      status: 'Success',
      message: 'Data retrieved.',
      data: admin
    })
  })
})

app.post('/admin', (req, res) => {
  Admin.insertMany({
    username: req.body.username,
    password: md5(req.body.password)
  }, (error, admin) => {
    if (error) {
      return res.json({
        status: 'Error',
        message: error
      })
    }

    res.json({
      status: 'Success',
      message: 'New admin has been added.',
      data: admin
    })
  })
})

app.listen(port, () => {
  console.log(`Inventory App | Running on http://127.0.0.1:${port}`)
})