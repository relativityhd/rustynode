const napi = require('../../crates/napi')
const napirs = require('../../crates/napi-rs')
const node = require('../node')
const wasm = require('../../crates/wasm')
const { runBenchmark, getBenchmark } = require('./utils')
exports.getBenchmark = getBenchmark

runBenchmark(
  'Pi-Optimized', {
    Napi: napi.pi_opt,
    NapiRs: napirs.pi_opt,
    Node: node.pi_opt,
    Wasm: wasm.pi_opt
  }, Array.from({ length: 10 }).map((_, i) => 10 ** i), false
)

runBenchmark(
  'Pi', {
    Napi: napi.pi,
    NapiRs: napirs.pi,
    Node: node.pi,
    Wasm: wasm.pi
  }, Array.from({ length: 10 }).map((_, i) => 10 ** i), false
)

runBenchmark(
  'Fibonacci-Optimized', {
    Napi: napi.fib_opt,
    NapiRs: napirs.fib_opt,
    Node: node.fib_opt,
    Wasm: wasm.fib_opt
  }, Array.from({ length: 10 }).map((_, i) => 2 * i), false
)

runBenchmark(
  'Fibonacci', {
    Napi: napi.fib,
    NapiRs: napirs.fib,
    Node: node.fib,
    Wasm: wasm.fib
  }, Array.from({ length: 10 }).map((_, i) => 2 * i), false
)

runBenchmark(
  'Fibonacci-Iterative', {
    Napi: napi.fib_it,
    NapiRs: napirs.fib_it,
    Node: node.fib_it,
    Wasm: wasm.fib_it
  }, Array.from({ length: 8 }).map((_, i) => 2 ** i), false
)
