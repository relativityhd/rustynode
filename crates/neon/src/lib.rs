use neon::prelude::*;

mod fib;
mod pi;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn overhead(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let n = cx.argument::<JsNumber>(0)?.value(&mut cx) as i32;
    Ok(cx.number(n + n))
}

fn pi(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let n = cx.argument::<JsNumber>(0)?.value(&mut cx) as i32;
    Ok(cx.number(pi::pi(n)))
}

fn pi_opt(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let n = cx.argument::<JsNumber>(0)?.value(&mut cx) as i32;
    Ok(cx.number(pi::pi_opt(n)))
}

fn fib(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let n = cx.argument::<JsNumber>(0)?.value(&mut cx) as i32;
    Ok(cx.number(fib::fib(n) as f64))
}

fn fib_opt(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let n = cx.argument::<JsNumber>(0)?.value(&mut cx) as i32;
    Ok(cx.number(fib::fib_opt(n) as f64))
}

fn fib_it(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let n = cx.argument::<JsNumber>(0)?.value(&mut cx) as i32;
    Ok(cx.number(fib::fib_it(n) as f64))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    cx.export_function("overhead", overhead)?;
    cx.export_function("pi", pi)?;
    cx.export_function("pi_opt", pi_opt)?;
    cx.export_function("fib", fib)?;
    cx.export_function("fib_opt", fib_opt)?;
    cx.export_function("fib_it", fib_it)?;
    Ok(())
}
