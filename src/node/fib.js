const fib = (n) => {
  if (n === 0 || n === 1) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}
exports.fib = fib

const fibOpt = (x) => {
  if (x === 0 || x === 1) {
    return x
  }
  if (x % 2 === 0) {
    const n = Math.floor(x / 2)
    const mem = fibOpt(n)
    return (2 * fibOpt(n - 1) + mem) * mem
  } else {
    const n = Math.floor((x + 1) / 2)
    return fibOpt(n - 1) ** 2 + fibOpt(n) ** 2
  }
}
exports.fib_opt = fibOpt

const fibIt = (n) => {
  if (n === 0 || n === 1) {
    return n
  }
  let fOfNMinusTwo = 0
  let fOfNMinusOne = 1
  for (let _ = 2; _ < n; _++) {
    const temp = fOfNMinusOne
    fOfNMinusOne += fOfNMinusTwo
    fOfNMinusTwo = temp
  }
  return fOfNMinusTwo + fOfNMinusOne
}
exports.fib_it = fibIt
