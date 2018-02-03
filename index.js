'use strict'

const Hapi = require('hapi')
const Pinger = require('./utils/pinger')

const server = new Hapi.Server()
server.connection({ port: 6000, host: 'localhost' })

server.route({
    method: 'GET',
    path: '/ping',
    handler: function (request, reply) {
        const pong = Pinger.sayPong()
        reply(`ping-${pong}`)
    }
})

server.start((err) => {
    if (err) {
        throw err
    }

    console.log(`Server running at: ${server.info.uri}`)
})