'use strict'

const Mongoose = require('mongoose');

const Config = require('./config')
const SetupServer = require('./server')
const Server = SetupServer()

const init = async () => {
    console.log(`Starting server...`);

    try {
        await Server.start()

        console.log(Config.CosmosDBUrl)
        console.log(`Connecting to Cosmos DB...`);
        await Mongoose.connect(Config.CosmosDBUrl, { 
            auth: {
                user: Config.CosmosDBUsername,
                password: Config.CosmosDBPassword
            }
        })

        console.log(`Server running on ${Server.info.uri}`)
        return Server
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

init()