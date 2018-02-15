'use strict'

const Hapi = require('hapi')
const Mongoose = require('mongoose');

const Config = require('./config')
const RegisterRoutes = require('./routes')

const init = async () => {
    console.log(`Starting server...`);

    const server = new Hapi.Server({    
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 8080
    })

    RegisterRoutes(server)

    try {
        await server.start()

        // console.log(Config.CosmosDBUrl)
        // console.log(`Connecting to Cosmos DB...`);
        // await Mongoose.connect(Config.CosmosDBUrl, { 
        //     auth: {
        //         user: Config.CosmosDBUsername,
        //         password: Config.CosmosDBPassword
        //     }
        // })

        console.log(Config.LocalDBUrl)
        console.log(`Connecting to Local Mongo DB...`);
        await Mongoose.connect(Config.LocalDBUrl)

        console.log(`Server running on ${server.info.uri}`)
        return server
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

init()