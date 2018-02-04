'use strict'

const SetupServer = require('./server')
const server = SetupServer()

server.start((err) => {
    if (err) {
        throw err
    }

    console.log(`Server running at: ${server.info.uri}`)
})