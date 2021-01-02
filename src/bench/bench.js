const napi = require('../../crates/napi')
const napirs = require('../../crates/napi-rs')
const neon = require('../../crates/neon')
const node = require('../node')
const wasm = require('../../crates/wasm')
const { runBenchmark, getBenchmark, extractFunctions } = require('./utils')
exports.getBenchmark = getBenchmark

const modules = {
  'N-Api': napi,
  'Napi-rs': napirs,
  'Neon': neon,
  'Node': node,
  'Wasm-pack': wasm
}

runBenchmark(
  'Overhead',
  extractFunctions(modules, 'overhead'),
  [1],
  false
)

runBenchmark(
  'Pi-Optimized',
  extractFunctions(modules, 'pi_opt'),
  [1, 100, 100000, 10000000],
  false
)

runBenchmark(
  'Pi',
  extractFunctions(modules, 'pi'),
  [1, 100, 100000, 10000000],
  false
)

runBenchmark(
  'Fibonacci-Optimized',
  extractFunctions(modules, 'fib_opt'),
  [1, 3, 4, 5, 30, 50, 90],
  false
)

runBenchmark(
  'Fibonacci',
  extractFunctions(modules, 'fib'),
  [1, 4, 16, 32],
  false
)

runBenchmark(
  'Fibonacci-Iterative',
  extractFunctions(modules, 'fib_it'),
  [1, 30, 50, 90, 250, 10000, 1000000000],
  false
)
