'use strict'

const tape = require('tape')
const {fetchWithTestApi} = require('./util')
const {allStations} = require('../lib/vbb-stations')

tape.test('/stops works', async (t) => {
	const someStationId = allStations[0].id
	console.error({someStationId})

	{
		const {headers, data} = await fetchWithTestApi({}, '/stops', {
			headers: {
				'accept': 'application/json',
			},
		})
		t.equal(headers['content-type'], 'application/json; charset=utf-8')
		t.ok(Array.isArray(data))
		t.ok(data.find(({id}) => id === someStationId))
		t.equal(data.length, Object.keys(allStations).length)
	}
})

tape.test('/stops?query=hauptbah works', async (t) => {
	const BERLIN_HBF = '900000003201'

	{
		const {headers, data} = await fetchWithTestApi({}, '/stops?query=hauptbah', {
			headers: {
				'accept': 'application/json',
			},
		})
		t.equal(headers['content-type'], 'application/json; charset=utf-8')
		t.ok(Array.isArray(data))
		t.ok(data.find(({id}) => id === BERLIN_HBF))
	}
})
