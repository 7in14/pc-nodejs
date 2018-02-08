'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const dataSourceModel = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
})

module.exports = Mongoose.model('DataSource', dataSourceModel, 'dataSources')