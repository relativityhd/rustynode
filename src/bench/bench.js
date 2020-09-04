const Benchmark = require('benchmark')
const microtime = require('microtime')
const napi = require('../napi/napi.node')
const napirs = require('../napi-rs/napirs.node')
const native = require('../native')
const wasm = require('../wasm/pkg/wasm')

const border = 100
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
  .add('Pi#Napi', () => {
    napi.pi(border)
  })
  .add('Pi#Napi#opt', () => {
    napi.pi_opt(border)
  })
  .add('Pi#Napi-rs', () => {
    napirs.pi(border)
  })
  .add('Pi#Napi-rs#opt', () => {
    napirs.pi_opt(border)
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
  console.log('single napi:      #', bench(napi.pi_opt, 1, 1000000000))
  console.log('single napirs:    #', bench(napirs.pi_opt, 1, 1000000000))
  console.log('single js:        #', bench(native.pi_opt, 1, 1000000000))
  console.log('single wasm:      #', bench(wasm.pi_opt, 1, 1000000000))
  console.log('multi pi:         #', bench(wasm.pi, 10000, 10000)[1])
  console.log('multi pi_opt:     #', bench(wasm.pi_opt, 10000, 10000)[1])
  console.log('multi pi_js:      #', bench(native.pi, 10000, 10000)[1])
  console.log('multi pi_js_opt:  #', bench(native.pi_opt, 10000, 10000)[1])
}

testStandards()
