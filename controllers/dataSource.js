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

// GET - get data sources
exports.get = {
    async handler(request, h) {

        const page = request.query.page

        return await DataSource.get(page)
    }
}

// GET - get data source by ID
exports.getById = {
    async handler(request, h) {

        const id = request.params.id

        return await DataSource.getById(id)
    }
}