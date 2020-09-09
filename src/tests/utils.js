function printFailedTest (fncall, res, ex) {
  console.log(`\x1b[31m Test failed for ${fncall}; returned: ${res} (${typeof res}), expected: ${ex} (${typeof ex})\x1b[0m`)
}
function printCon (failed, fname) {
  console.log(failed > 0 ? `\x1b[31m Failed ${failed} test${failed === 1 ? '' : 's'} for ${fname}.\x1b[0m` : `\x1b[32m Passed all tests for ${fname}.\x1b[0m`)
  console.log('\n')
}

exports.testOverhead = (modules) => {
  let failed = 0
  for (const [mname, module] of Object.entries(modules)) {
    const res = module.overhead(1)
    if (res !== 2) {
      printFailedTest(`${mname}.overhead(1)`, res, 2)
        failed++
    }
  }
  printCon(failed, 'overhead')
}

exports.testFibonacci = (modules, fname, bigInts=true) => {
  const fibonacciSeries = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
  let failed = 0
  for (const [mname, module] of Object.entries(modules)) {
    for (let n in fibonacciSeries) {
      n = parseInt(n)
      const res = module[fname](n)
      if (res !== BigInt(fibonacciSeries[n]) && res !== fibonacciSeries[n]) {
        printFailedTest(`${mname}.${fname}(${n})`, res, BigInt(fibonacciSeries[n]))
        failed++
      }
    }
    if (bigInts) {
      for (let [n, exp] of [
        [30, 832040n],
        [50, 12586269025n],
        [90, 2880067194370816120n]
        // Following will overflow because most interfaces only support i64
        /* [150, 9969216677189303386214405760200n],
        [200, 280571172992510140037611932413038677189525n],
        [250, 7896325826131730509282738943634332893686268675876375n] */
      ]) {
        const res = module[fname](n)
        if (res !== exp && res !== parseInt(exp)) {
          printFailedTest(`${mname}.${fname}(${n})`, res, exp)
          failed++
        }
      }
    }
  }
  printCon(failed, fname)
}

exports.testPi = (modules, fname) => {
  let failed = 0
  for (let n of Array.from({ length: 8 }).map((_, i) => 10 ** i)) {
    let lastResult
    for (const [mname, module] of Object.entries(modules)) {
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
