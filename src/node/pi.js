exports.pi_opt = (border) => {
  let pi = 0
  let x = 1
  while (x < border) {
    pi += 4 / x
    x += 2
    pi -= 4 / x
    x += 2
  }
  return pi
}

exports.pi = (border) => {
  let pi = 0
  for (let x = 1; x < border; x++) {
    if ((x - 1) % 2 === 0) {
      pi += (x - 1) % 4 === 0 ? 4 / x : -4 / x
    }
  }
  return pi
}
