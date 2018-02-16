'use strict'

const DataSource = require('../repositories/dataSource') 
const AllDataService = require('../services/allData')

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

// DELETE - delete data source by ID
exports.deleteById = {
    async handler(request, h) {

        const id = request.params.id
        const result = await DataSource.deleteById(id)

        if (result.n == 1) {
            const remaining = await DataSource.get()
            return h.response(remaining).code(202)
        }
        else {
            return h.response('Data source not found').code(404)
        }
    }
}

// GET - get all data from available data sources
exports.getAllData = {
    async handler(request, h) {

        return await AllDataService.getAllData()
    }
}