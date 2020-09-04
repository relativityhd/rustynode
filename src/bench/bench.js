const Benchmark = require('benchmark')
const microtime = require('microtime')
const native = require('../native')
const wasm = require('../wasm/pkg/wasm')

const border = 1000000000
const suite = new Benchmark.Suite()
suite
  .add('Pi#JS', () => {
    native.pi(border)
  })
  .add('Pi#JS#opt', () => {
    native.pi_opt(border)
  })
  .add('Pi#WASM', () => {
    wasm.pi(border)
  })
  .add('Pi#WASM#opt', () => {
    wasm.pi_opt(border)
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run(/* { async: true } */)

function bench (f, n, m) {
  const start = microtime.now()
  let proof = 0
  for (let i = 0; i < n; i++) {
    proof += f(m)
  }
  return [proof, microtime.now() - start]
}

function testStandards () {
  console.log('single pi:        #', bench(wasm.pi, 1, 1000000000)[1])
  console.log('single pi_opt:    #', bench(wasm.pi_opt, 1, 1000000000)[1])
  console.log('single pi_js:     #', bench(native.pi, 1, 1000000000)[1])
  console.log('single pi_js_opt: #', bench(native.pi_opt, 1, 1000000000)[1])
  console.log('multi pi:         #', bench(wasm.pi, 10000, 10000)[1])
  console.log('multi pi_opt:     #', bench(wasm.pi_opt, 10000, 10000)[1])
  console.log('multi pi_js:      #', bench(native.pi, 10000, 10000)[1])
  console.log('multi pi_js_opt:  #', bench(native.pi_opt, 10000, 10000)[1])
}

testStandards()
