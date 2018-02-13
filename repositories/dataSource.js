'use strict'

const Model = require('../models/dataSource')

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
    }
}

module.exports = repository