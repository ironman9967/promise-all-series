# [promise-all-series](https://github.com/ironman9967/promise-all-series)

Runs an array of Promises in series

### [Installing](https://www.npmjs.com/package/promise-series-all)
```
npm i promise-all-series -S
```

### Running the tests
```
npm run test
```

### Usage
```javascript
import { PromiseAllSeries } from 'promise-all-series'

// pass in an array of functions that return Promises
const myPromiseSeries = PromiseAllSeries([

    // note the delay of 1000ms
    x => new Promise(resolve => 
        setTimeout(() => resolve(x), 1000)),
    
    // the delay here is only 500ms, but this Promise will still 
    //  resolve after the first because they are run in series
    (a, b) => new Promise(resolve => 
        setTimeout(() => resolve(a + b), 500)),
    
    // no delay here, but this Promise will resolve last
    () => Promise.resolve(2)
    
])

// PromiseAllSeries returns a function that accepts an optional 
//  array of parameter arrays to pass in to each Promise function, 
//  if omitted, the Promise functions will be called with no 
//  parameters. Whether you are supplying parameters or not, this 
//  function MUST be called
myPromiseSeries([
    0,          // sent to the first Promise: x == 0, if there is
                //  only one parameter it does not need to be wrapped
                //  in an array
    [ 2, -1 ],  // sent to the second Promise: a == 2, b == -1
    []          // no parameters will be sent to the third Promise, 
                //  can be undefined, but it must be passed
])

// this function returns a Promise that resolves an array of 
//  results from each Promise function
.then(([
    x,
    aPlusB,
    hardcoded2
]) => {
    console.log(x)          // 0
    console.log(aPlusB)     // 1
    console.log(hardcoded2) // 2
})
```

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

