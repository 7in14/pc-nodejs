'use strict'

const Lab = require('lab')
const { expect } = require('code')

const Service = require('../../services/raleighCrime')

const lab = exports.lab = Lab.script()

lab.experiment('Raleigh crime service', () => {
    lab.test('get - valid query - should return results from raleigh crime API', async () => {
        // given
        const query = "district=SOUTHWEST"

        // when
        const result = await Service.getCrimeData(query)

        // then
        expect(result).to.not.be.empty()
    })
})
