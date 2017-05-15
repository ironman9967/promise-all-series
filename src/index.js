
export const PromiseAllSeries = promises => (calls, results) => {
    if (!results) results = []
    if (promises.length > 0) {
        const p = promises.shift()
        let args = []
        if (calls) {
            const call = calls.shift()
            if (Array.isArray(call)) {
                args = call
            }
            else if (call !== void 0) {
                args.push(call)
            }
        }
        return Promise.resolve(p.apply(p, args).then((res) => {
            results.push(res)
            return PromiseAllSeries(promises)(calls, results)
        }))
    }
    else {
        return results
    }
}
