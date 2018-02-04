'use strict'

const Hapi = require('hapi')
const Inert = require('inert')
const Lout = require('lout')
const Vision = require('vision')
const SetupServer = require('./server')
const server = SetupServer()

server.register([Vision, Inert, Lout], (err) => {
    if (err) {
        console.error('Loading plugins failed.')
        process.exit(1)
    }
    
    server.start((err) => {
        if (err) {
            throw err
        }

        console.log(`Server running at: ${server.info.uri}`)
    })
})