'use strict'

const Hapi = require('hapi')
const Lab = require('lab')
const Sinon = require('sinon')
const { expect } = require('code')

const RegisterRoutes = require('../routes')
const DataSource = require('../repositories/dataSource') 

const lab = exports.lab = Lab.script()

let server

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

lab.experiment('Endpoints', () => {
    lab.test('ping should return "ping-pong"', async () => {
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
    lab.test('file should return README.md content as JSON', async() => {
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
    lab.test('PUT should call create method on data source repository', async() => {
        // given
        Sinon.stub(DataSource, 'create').resolves('ok')
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
    lab.test('GET should call get method on data source repository', async() => {
        // given 
        Sinon.stub(DataSource, 'get').resolves('ok')
        const getRequest = {
            method: 'GET',
            url: '/dataSources?page=2',
        }

        // when
        const response = await server.inject(getRequest)

        // then
        Sinon.assert.calledWith(DataSource.get, "2")
    })
})