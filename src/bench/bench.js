const napi = require('../napi/napi.node')
const napirs = require('../napi-rs/napirs.node')
const native = require('../native')
const wasm = require('../wasm/pkg/wasm')
const { runBenchmark, getBenchmark } = require('./utils')
exports.getBenchmark = getBenchmark

runBenchmark(
  'Pi-Optimized', {
    Napi: napi.pi_opt,
    NapiRs: napirs.pi_opt,
    Native: native.pi_opt,
    Wasm: wasm.pi_opt
  }, Array.from({ length: 10 }).map((_, i) => 10 ** i), false
)

runBenchmark(
  'Pi', {
    Napi: napi.pi,
    NapiRs: napirs.pi,
    Native: native.pi,
    Wasm: wasm.pi
  }, Array.from({ length: 10 }).map((_, i) => 10 ** i), false
)

runBenchmark(
  'Fibonacci-Optimized', {
    Napi: napi.fib_opt,
    NapiRs: napirs.fib_opt,
    Native: native.fib_opt,
    Wasm: wasm.fib_opt
  }, Array.from({ length: 10 }).map((_, i) => 2 * i), false
)

runBenchmark(
  'Fibonacci', {
    Napi: napi.fib,
    NapiRs: napirs.fib,
    Native: native.fib,
    Wasm: wasm.fib
  }, Array.from({ length: 10 }).map((_, i) => 2 * i), false
)

runBenchmark(
  'Fibonacci-Iterative', {
    Napi: napi.fib_it,
    NapiRs: napirs.fib_it,
    Native: native.fib_it,
    Wasm: wasm.fib_it
  }, Array.from({ length: 8 }).map((_, i) => 2 ** i), false
)
