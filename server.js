'use strict'

const Hapi = require('hapi')
const fs = require('fs') 
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
        handler: async function (request, reply) {
            let file = fs.readFileSync('./README.md').toString()
            let json = {
                data: file
            }

            reply(json)
        },
        config: {
            description: 'Returns README.MD as JSON'
        }
    })

    server.route({
        method: 'GET',
        path: '/fileAsync',
        handler: async function (request, reply) {
            await fs.readFile('./README.md', (err, data) => {  
                if (err) {
                    throw err;
                }

                let json = {
                    text: data.toString()
                }

                reply(json)
            });
        },
        config: {
            description: 'Returns README.MD as JSON'
        }
    })

    return server
}

module.exports = setupServer