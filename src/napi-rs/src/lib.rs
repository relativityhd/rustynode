#[macro_use]
extern crate napi;
#[macro_use]
extern crate napi_derive;

use std::convert::TryInto;

use napi::{CallContext, JsNumber, Module, Result};

mod pi;

#[cfg(all(unix, not(target_env = "musl")))]
#[global_allocator]
static ALLOC: jemallocator::Jemalloc = jemallocator::Jemalloc;

#[cfg(windows)]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

register_module!(example, init);

fn init(module: &mut Module) -> Result<()> {
  module.create_named_method("pi", pi)?;
  module.create_named_method("pi_opt", pi_opt)?;
  Ok(())
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