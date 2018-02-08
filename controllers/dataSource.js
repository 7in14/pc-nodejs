'use strict'

const DataSource = require('../models/dataSource') 

// PUT - create a new data source
exports.create = { 
    async handler(request, h) {
        console.info(request.payload)
        
        const dataSource = {
            name: request.payload.name,
            url: request.payload.url
        }

        try {
            const newDataSource = await DataSource.create(dataSource)
            return { 
                message: "New data source created", 
                dataSource: newDataSource 
            }
        }
        catch (err) {
            return { error: err }
        }
    }
}
