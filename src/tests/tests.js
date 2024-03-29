const { testOverhead, testPi, testFibonacci } = require('./utils')
const napirs = require('../../crates/napi-rs')
const neon = require('../../crates/neon')
const node = require('../node')
const wasm = require('../../crates/wasm')
const modules = { napirs, neon, node, wasm }

testOverhead(modules)
testPi(modules, 'pi')
testPi(modules, 'pi_opt')
testFibonacci(modules, 'fib', false)
testFibonacci(modules, 'fib_opt')
testFibonacci(modules, 'fib_it')
