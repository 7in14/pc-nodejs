'use strict'

const Mongoose = require('mongoose')
const Lab = require('lab')
const Sinon = require('sinon')
const { expect } = require('code')

const Config = require('../config')
const Repository = require('../../repositories/dataSource')

const lab = exports.lab = Lab.script()

let createDataSources = async (n) => {
    for (var i = 0; i < n; i++) {
        const dataSource = {
            name: `name_${i}`,
            url: 'url'
        }

        await Repository.create(dataSource)
    }
}

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

lab.experiment('Data Source repository', () => {
    lab.test('create - valid payload - should create data source', async () => {
        // given
        const dataSource = {
            name: "sample DS",
            url: "sample URL"
        }

        // when
        const result = await Repository.create(dataSource)

        // then
        expect(result.message).to.equal("New data source created")
        expect(result.new_id).to.not.be.empty()
    })
    lab.test('create - invalid payload - should return error ', async () => {
        // given
        const dataSource = {
            invalid: 'invalid field'
        }

        // when
        const result = await Repository.create(dataSource)

        // then
        expect(result.error).to.not.be.empty()
    })
    lab.test('get - returns first page of data sources', async () => {
        // given 
        await createDataSources(8)

        // when 
        const result = await Repository.get()

        // then
        expect(result.dataSources.length).to.equal(5)
    })
    lab.test('get - page provided - returns data sources from given page', async () => {
        // given 
        await createDataSources(8)

        // when 
        const result = await Repository.get("2")

        // then
        expect(result.dataSources.length).to.equal(3)
    })
})