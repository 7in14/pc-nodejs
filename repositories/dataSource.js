'use strict'

const Model = require('../models/dataSource')
const pageSize = 5

const repository = {
    async create(dataSource) {
        try {
            const newDataSource = await Model.create(dataSource)

            return { 
                message: "New data source created", 
                new_id: newDataSource.id 
            }
        }
        catch (err) {
            return { error: err }
        }
    },
    async get(page = 1) {
        const dataSources = await Model.find({})
                                       .skip((page - 1) * pageSize)
                                       .limit(pageSize)

        return { dataSources: dataSources }
    },
    async getById(id) {
        const dataSource = await Model.findById(id)

        return dataSource
    }
}

module.exports = repository