#[macro_use]
extern crate napi;
#[macro_use]
extern crate napi_derive;

use std::convert::TryInto;

use napi::{CallContext, JsNumber, Module, Result};

mod pi;
mod fib;

register_module!(example, init);

fn init(module: &mut Module) -> Result<()> {
  module.create_named_method("overhead", overhead)?;
  module.create_named_method("pi", pi)?;
  module.create_named_method("pi_opt", pi_opt)?;
  module.create_named_method("fib", fib)?;
  module.create_named_method("fib_opt", fib_opt)?;
  module.create_named_method("fib_it", fib_it)?;
  Ok(())
}

fn ov(n: i32) -> i32 {n+n}
#[js_function(1)] // ------> arguments length, omit for zero
fn overhead(ctx: CallContext) -> Result<JsNumber> {
  let n = ctx.get::<JsNumber>(0)?.try_into()?;
  ctx.env.create_int32(ov(n))
}

#[js_function(1)] // ------> arguments length, omit for zero
fn pi(ctx: CallContext) -> Result<JsNumber> {
  let n = ctx.get::<JsNumber>(0)?.try_into()?;
  ctx.env.create_double(pi::pi(n))
}

#[js_function(1)] // ------> arguments length, omit for zero
fn pi_opt(ctx: CallContext) -> Result<JsNumber> {
  let n = ctx.get::<JsNumber>(0)?.try_into()?;
  ctx.env.create_double(pi::pi_opt(n))
}

#[js_function(1)] // ------> arguments length, omit for zero
fn fib(ctx: CallContext) -> Result<JsNumber> {
  let n = ctx.get::<JsNumber>(0)?.try_into()?;
  ctx.env.create_int64(fib::fib(n))
}

#[js_function(1)] // ------> arguments length, omit for zero
fn fib_opt(ctx: CallContext) -> Result<JsNumber> {
  let n = ctx.get::<JsNumber>(0)?.try_into()?;
  ctx.env.create_int64(fib::fib_opt(n))
}

#[js_function(1)] // ------> arguments length, omit for zero
fn fib_it(ctx: CallContext) -> Result<JsNumber> {
  let n = ctx.get::<JsNumber>(0)?.try_into()?;
  ctx.env.create_int64(fib::fib_it(n))
}
