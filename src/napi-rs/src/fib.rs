pub fn fib(n: i32) -> i32 {
  if n == 0 || n == 1 {
    return n
  }
  fib(n-1)+fib(n-2)
}

pub fn fib_opt(x: i32) -> i32 {
  if x == 0 || x == 1 {
    return x
  }
  if x & 0x1 == 0 {
    let n = x/2;
    let mem = fib_opt(n);
    return (2 * fib_opt(n-1) + mem) * mem
  } else {
    let n = (x+1)/2;
    fib_opt(n-1).pow(2) + fib_opt(n).pow(2)
  }
}

pub fn fib_it(n: i64) -> i64 {
  if n == 0 || n == 1 {
      return n
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
