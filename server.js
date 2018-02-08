'use strict'
  
const Hapi = require('hapi')

const PingController = require('./controllers/ping')
const ReadmeController = require('./controllers/readme')
const DataSourceController = require('./controllers/dataSource')

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

    server.route({
        method: 'PUT',
        path: '/dataSource',
        options: DataSourceController.create
    })

    return server
}

module.exports = setupServer