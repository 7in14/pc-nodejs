'use strict'

const PingController = require('./controllers/ping')
const ReadmeController = require('./controllers/readme')
const DataSourceController = require('./controllers/dataSource')

const register = (server) => {

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
    server.route({
        method: 'GET',
        path: '/dataSources',
        options: DataSourceController.get
    })
}

module.exports = register