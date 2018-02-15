'use strict'

const DataSource = require('../repositories/raleighCrime')

// GET - get crime information from Raleigh gov
exports.get = {
    async handler(request, h) {

        const query = request.query.query

        return await DataSource.get(query)
    }
}