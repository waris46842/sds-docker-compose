const mongoose = require('mongoose')

const Schema = mongoose.Schema
const dataSchema = new Schema({
  name: String,
  cmd: String,
})
const dataModel = mongoose.model('Form', dataSchema)
module.exports = dataModel