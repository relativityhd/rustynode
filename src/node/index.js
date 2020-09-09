const { pi, pi_opt } = require('./pi')
const { fib, fib_opt, fib_it} = require('./fib')
const overhead = n => n+n
module.exports = { overhead, pi, pi_opt, fib, fib_opt, fib_it }
