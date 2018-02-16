'use strict'

const Mongoose = require('mongoose')
const Lab = require('lab')
const { expect } = require('code')

const Config = require('../config')
const Repository = require('../../repositories/dataSource')
const Service = require('../../services/allData')

const lab = exports.lab = Lab.script()

lab.before(() => {
    Mongoose.connect(Config.TestDBUrl)

    const db = Mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
       console.log('We are connected to test database!')
    })
})

lab.after(() => {
    Mongoose.connection.db.dropDatabase(() => {
        Mongoose.connection.close()
    })
})

lab.afterEach(() => {
    Mongoose.connection.db.collection('dataSources').deleteMany({})
})

lab.experiment('All data service', { timeout: 5000 }, () => {
    lab.test('get - should return aggregated results from all available data sources', async () => {
        // given
        const id_1 = await Repository.create({ name: "name_1", url: "http://www.google.com" })
        const id_2 = await Repository.create({ name: "name_2", url: "http://www.google.com" })

        // when
        const result = await Service.getAllData()

        // then
        expect(result).to.not.be.empty()
    })
})