const mongoose = require('mongoose')

const url = 'mongodb+srv://farhanrizky:farhanrizkyyyy@inventory-app.4hgzw.mongodb.net/inventory-app?retryWrites=true&w=majority'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})