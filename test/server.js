'use strict'

const Lab = require('lab')
const Sinon = require('sinon')
const Init = require('../server')
const DataSource = require('../models/dataSource') 
const { expect } = require('code')

const lab = exports.lab = Lab.script()

let server

lab.before(() => {
    server = Init()
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
    lab.test('PUT should call create method on data source', async() => {
        // given
        Sinon.stub(DataSource, 'create')
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
})