'use strict'

const Hapi = require('hapi')
const Lab = require('lab')
const Sinon = require('sinon')
const { expect } = require('code')

const RegisterRoutes = require('../routes')
const DataSource = require('../repositories/dataSource') 
const CrimeService = require('../services/raleighCrime')
const DataService = require('../services/allData')

const lab = exports.lab = Lab.script()

let server
let sandbox

lab.before(() => {

    server = new Hapi.Server({
        port: 5000,
        host: 'localhost'
    })

    RegisterRoutes(server)

    try {
        server.start()
        console.log(`Server running on ${server.info.uri}`)
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
})

lab.beforeEach(() => {
    sandbox = Sinon.sandbox.create()
})

lab.afterEach(() => {
    sandbox.restore()
})

lab.experiment('Endpoints', () => {
    lab.test('GET /ping should return "ping-pong"', async () => {
        // given
        const pingRequest = {
            method: 'GET', 
            url: '/ping'
        }

        // when
        const response = await server.inject(pingRequest)

        // then
        expect(response.statusCode).to.equal(200)
        expect(response.result).to.equal("pong")
    })
    lab.test('GET /file should return README.md content as JSON', async () => {
        // given
        const fileRequest = {
            method: 'GET', 
            url: '/file'
        }
        
        // when
        const response = await server.inject(fileRequest)

        // then
        expect(response.statusCode).to.equal(200)
        expect(response.result).to.contain("data")
    })
    lab.test('GET /raleigh/crime?query=<q> should return results from data.raleighnc.gov', async () => {
        // given
        sandbox.stub(CrimeService, 'getCrimeData').resolves('ok')
        const crimeRequest = {
            method: 'GET',
            url: '/raleigh/crime?query=test=value'
        }

        // when
        const response = await server.inject(crimeRequest)

        // then
        Sinon.assert.calledWith(CrimeService.getCrimeData, "test=value")
    })
    lab.test('GET /allData should call getAllData method on data source repository', async () => {
        // given
        sandbox.stub(DataService, 'getAllData').resolves('ok')
        const allRequest = {
            method: 'GET',
            url: '/allData'
        }

        // when
        const response = await server.inject(allRequest)

        // then
        Sinon.assert.calledWith(DataService.getAllData)
    })
    lab.test('PUT /dataSource should call create method on data source repository', async () => {
        // given
        sandbox.stub(DataSource, 'create').resolves('ok')
        const createRequest = {
            method: 'PUT', 
            url: '/dataSource',
            payload: { 
                name: "name",
                url: "url"
            }
        }

        // when
        const response = await server.inject(createRequest)

        // then
        Sinon.assert.calledWith(DataSource.create, createRequest.payload)
    })
    lab.test('GET /dataSource?page={n} should call get method on data source repository', async () => {
        // given 
        sandbox.stub(DataSource, 'get').resolves('ok')
        const getRequest = {
            method: 'GET',
            url: '/dataSources?page=2',
        }

        // when
        const response = await server.inject(getRequest)

        // then
        Sinon.assert.calledWith(DataSource.get, "2")
    })
    lab.test('GET /dataSource/{id} should call getById method on data source repository', async () => {
        // given
        sandbox.stub(DataSource, 'getById').resolves('ok')
        const getRequest = {
            method: 'GET',
            url: '/dataSource/1234'
        }

        // when
        const response = await server.inject(getRequest)

        // then
        Sinon.assert.calledWith(DataSource.getById, "1234")
    })
    lab.test('DELETE /dataSource/{id} should call deleteById method on data source repository', async () => {
        // given
        sandbox.stub(DataSource, 'deleteById').resolves('ok')
        const deleteRequest = {
            method: 'DELETE',
            url: '/dataSource/1234'
        }

        // when
        const response = await server.inject(deleteRequest)

        // then
        Sinon.assert.calledWith(DataSource.deleteById, "1234")
    })
})