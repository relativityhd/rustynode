pub fn pi (border: i32) -> f64 {
  let mut pi:f64 = 0.0;
  for x in 1..border {
    if (x-1)%2 == 0 {
      pi += if (x-1)%4 == 0 { 4.0/(x as f64) } else { -4.0/(x as f64) }; 
    }
  };
  pi
}

pub fn pi_opt (border: i32) -> f64 {
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
