
import { expect } from 'chai'

import { PromiseAllSeries } from './index'

describe('promise-series-all', () => {
    it('should take an array of promises and produce an array of results', () =>
        PromiseAllSeries([
            x => Promise.resolve(x),
            (x, y) => Promise.resolve(x + y),
            () => Promise.resolve(2)
        ])([
            0,
            [ 2, -1 ],
            void 0
        ]).then(arr => {
            expect(arr).to.be.an('array')
            expect(arr.length).to.be.equal(3)
            expect(arr[0]).to.be.equal(0)
            expect(arr[1]).to.be.equal(1)
            expect(arr[2]).to.be.equal(2)
        })
    )


	it('should promises in series', () => {
		let haveIBeenCalledAlready = false

		const slowestPromise = () => 
		    new Promise((resolve, reject) => 
		        setTimeout(() => {
				    if (haveIBeenCalledAlready) {
					    reject(new Error(`Didn't run in series`))
				    }
				    else {
				        resolve('good')
				    }
			    }, 250)
		    )

		const slowPromise = () => 
		    new Promise((resolve, reject) =>
			    setTimeout(() => {
				    haveIBeenCalledAlready = true
				    resolve('good2')
			    }, 125)
	    	)

		return PromiseAllSeries([
		    slowestPromise,
		    slowPromise
		])()
		.then(([slowest, slow]) => {
		    expect(slowest).to.be.equal('good')
		    expect(slow).to.be.equal('good2')
		})
	})
})
