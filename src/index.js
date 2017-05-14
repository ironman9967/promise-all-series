
export const PromiseAllSeries = promises => (calls, results) => {
    if (!results) results = []
    if (promises.length > 0) {
        const p = promises.shift()
        return Promise.resolve(p.apply(p, calls ? calls.shift() : []).then((...res) => {
            results.push(res)
            return PromiseAllSeries(promises)(calls, results)
        }))
    }
    else {
        return results
    }
}
