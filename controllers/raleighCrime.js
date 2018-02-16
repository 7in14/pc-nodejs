'use strict'

const Service = require('../services/raleighCrime')

// GET - get crime information from Raleigh gov
exports.get = {
    async handler(request, h) {

        const query = request.query.query

        return await Service.getCrimeData(query)
    }
}