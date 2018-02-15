'use strict'

const Lab = require('lab')
const Sinon = require('sinon')
const { expect } = require('code')

const Repository = require('../../repositories/raleighCrime')

const lab = exports.lab = Lab.script()

lab.experiment('Raleigh crime repository', () => {
    lab.test('get - valid query - should return results from raleigh crime API', async () => {
        // given
        const query = "district=SOUTHWEST"

        // when
        const result = await Repository.get(query)

        // then
        expect(result).to.not.be.empty()
    })
})
