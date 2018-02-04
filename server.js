'use strict'

const Hapi = require('hapi')
const Pinger = require('./utils/pinger')
const JsonReader = require('./utils/jsonReader')

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
        handler: async function (request, reply) {
            const json = JsonReader.read('./README.md')
            reply(json)
        },
        config: {
            description: 'Returns README.MD as JSON'
        }
    })

    return server
}

module.exports = setupServer