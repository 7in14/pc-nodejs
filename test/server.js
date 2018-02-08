'use strict'

const Lab = require('lab')
const Init = require('../server')
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
})