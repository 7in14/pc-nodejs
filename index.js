'use strict'

const SetupServer = require('./server')
const server = SetupServer()

const init = async () => {
    console.log(`Starting server...`);

    try {
        await server.start()
        return server
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
    
    console.log(`Server running on ${server.info.uri}`)
}

init()