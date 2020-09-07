const napi = require('../napi/napi.node')
const napirs = require('../napi-rs/napirs.node')
const native = require('../native')
const wasm = require('../wasm/pkg/wasm')

function printFailedTest (fncall, res, ex) {
  console.log(`\x1b[31m Test failed for ${fncall}; returned: ${res}, expected: ${ex}\x1b[0m`)
}
function printCon (failed, fname) {
  console.log(failed > 0 ? `\x1b[31m Failed ${failed} test${failed === 1 ? '' : 's'} for ${fname}.\x1b[0m` : `\x1b[32m Passed all tests for ${fname}.\x1b[0m`)
}

exports.testFibonacci = (fname) => {
  const fibonacciSeries = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
  let failed = 0
  for (const [mname, module] of Object.entries({ napi, napirs, native, wasm })) {
    for (let n in fibonacciSeries) {
      n = parseInt(n)
      const res = module[fname](n)
      if (res !== fibonacciSeries[n]) {
        printFailedTest(`${mname}.${fname}(${n})`, res, fibonacciSeries[n])
        failed++
      }
    }
  }
  printCon(failed, fname)
}

exports.testPi = (fname) => {
  let failed = 0
  for (let n of Array.from({ length: 8 }).map((_, i) => 10 ** i)) {
    let lastResult
    for (const [mname, module] of Object.entries({ napi, napirs, native, wasm })) {
      n = parseInt(n)
      const res = module[fname](n)
      if (typeof lastResult !== 'undefined' && res !== lastResult) {
        printFailedTest(`${mname}.${fname}(${n})`, res, lastResult)
        failed++
        break
      }
      lastResult = res
    }
  }
  printCon(failed, fname)
}
