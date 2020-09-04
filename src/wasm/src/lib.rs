extern crate serde_json;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

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
