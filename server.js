'use strict'
  
const Hapi = require('hapi')

const PingController = require('./controllers/ping')
const ReadmeController = require('./controllers/readme')

const setupServer = () => {
    const server = new Hapi.Server({
        port: 5000,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/ping',
        options: PingController.pong
    })

    server.route({
        method: 'GET',
        path: '/file',
        options: ReadmeController.get
    })

    return server
}

module.exports = setupServer