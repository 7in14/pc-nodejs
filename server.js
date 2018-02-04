'use strict'

const Hapi = require('hapi')
const Pinger = require('./utils/pinger')

const setupServer = () => {
    const server = new Hapi.Server()

    server.connection({
        port: 5000,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/ping',
        handler: function (request, reply) {
            const pong = Pinger.sayPong()
            reply(`ping-${pong}`)
        },
        config: {
            description: 'Simple ping'
        }
    })

    server.route({
        method: 'GET',
        path: '/file',
        handler: function (request, reply) {
            reply('file')
        },
        config: {
            description: 'Returns README.MD as JSON'
        }
    })

    return server
}

module.exports = setupServer