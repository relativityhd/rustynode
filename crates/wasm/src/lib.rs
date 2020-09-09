extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

/// Calculating Pi with the Gregory-Leibniz Series
#[wasm_bindgen]
pub fn overhead(n: i32) -> i32 {
  n+n
}

/// Calculating Pi with the Gregory-Leibniz Series
#[wasm_bindgen]
pub fn pi(border: i32) -> f64 {
  let mut pi:f64 = 0.0;
  for x in 1..border {
    if (x-1)%2 == 0 {
      pi += if (x-1)%4 == 0 { 4.0/(x as f64) } else { -4.0/(x as f64) }; 
    }
  };
  pi
}

/// Calculating Pi with the Gregory-Leibniz Series, optimized
#[wasm_bindgen]
pub fn pi_opt(border: i32) -> f64 {
  let mut pi:f64 = 0.0;
  let mut x: f64 = 1.0;
  while (x as i32) < border {
    pi += 4.0 / x;
    x += 2.0;
    pi -= 4.0 / x;
    x +=2.0;
  }
  pi
}

/// Calculating intuitively the n-th number of the fibonacci series
#[wasm_bindgen]
pub fn fib(n: i32) -> i64 {
  if n == 0 || n == 1 {
    return n as i64
  }
  fib(n-1)+fib(n-2)
}

/// Calculating the n-th number of the fibonacci series based on Dijkstra Method
#[wasm_bindgen]
pub fn fib_opt(x: i32) -> i64 {
  if x == 0 || x == 1 {
    return x as i64
  }
  if x & 0x1 == 0 {
    let n = x/2;
    let mem = fib_opt(n);
    return (2 * fib_opt(n-1) + mem) * mem
  } else {
    let n = (x+1)/2;
    let mem = fib_opt(n);
    let mem1 = fib_opt(n-1);
    mem1 * mem1 + mem * mem
  }
}

/// Calculating the n-th number of the fibonacci series in an iterative way
#[wasm_bindgen]
pub fn fib_it(n: i32) -> i64 {
  if n == 0 || n == 1 {
      return n as i64
  }
  let mut f_of_n_minus_two = 0;
  let mut f_of_n_minus_one = 1;
  for _ in 2..n {
      let temp = f_of_n_minus_one;
      f_of_n_minus_one += f_of_n_minus_two;
      f_of_n_minus_two = temp;
  }
  f_of_n_minus_two + f_of_n_minus_one
}
