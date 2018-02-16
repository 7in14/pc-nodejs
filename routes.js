'use strict'

const PingController = require('./controllers/ping')
const ReadmeController = require('./controllers/readme')
const DataSourceController = require('./controllers/dataSource')
const RaleighCrimeController = require('./controllers/raleighCrime')

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
        method: 'GET',
        path: '/raleigh/crime',
        options: RaleighCrimeController.get
    })

    server.route({
        method: 'GET',
        path: '/allData',
        options: DataSourceController.getAllData
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
    server.route({
        method: 'GET',
        path: '/dataSource/{id}',
        options: DataSourceController.getById
    })
    server.route({
        method: 'DELETE',
        path: '/dataSource/{id}',
        options: DataSourceController.deleteById
    })
}

module.exports = register