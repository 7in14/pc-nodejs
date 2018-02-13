'use strict'

const DataSource = require('../repositories/dataSource') 

// PUT - create a new data source
exports.create = { 
    async handler(request, h) {        
        const payload = {
            name: request.payload.name,
            url: request.payload.url
        }

        return await DataSource.create(payload)
    }
}
