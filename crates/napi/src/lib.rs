use nodejs_sys::{
  napi_callback_info, napi_create_function, napi_get_cb_info, napi_env,
  napi_set_named_property, napi_value, napi_create_double, napi_get_value_int32, napi_create_int32, napi_create_int64
};
use std::ffi::CString;
mod pi;
mod fib;

pub unsafe extern "C" fn c_overhead(env: napi_env, info: napi_callback_info) -> napi_value {
  let mut buffer: [napi_value; 1] = std::mem::MaybeUninit::zeroed().assume_init();
  let mut argc = 1 as usize;
  napi_get_cb_info(env, info, &mut argc, buffer.as_mut_ptr(), std::ptr::null_mut(), std::ptr::null_mut());
  let mut n = 0 as i32;
  napi_get_value_int32(env, buffer[0], &mut n);
  let results = n+n;
  let mut local: napi_value = std::mem::zeroed();
  napi_create_int32(env, results, &mut local);
  local
}

pub unsafe extern "C" fn c_pi(env: napi_env, info: napi_callback_info) -> napi_value {
  let mut buffer: [napi_value; 1] = std::mem::MaybeUninit::zeroed().assume_init();
  let mut argc = 1 as usize;
  napi_get_cb_info(env, info, &mut argc, buffer.as_mut_ptr(), std::ptr::null_mut(), std::ptr::null_mut());
  let mut n = 0 as i32;
  napi_get_value_int32(env, buffer[0], &mut n);
  let results = pi::pi(n);
  let mut local: napi_value = std::mem::zeroed();
  napi_create_double(env, results, &mut local);
  local
}

pub unsafe extern "C" fn c_pi_opt(env: napi_env, info: napi_callback_info) -> napi_value {
  let mut buffer: [napi_value; 1] = std::mem::MaybeUninit::zeroed().assume_init();
  let mut argc = 1 as usize;
  napi_get_cb_info(env, info, &mut argc, buffer.as_mut_ptr(), std::ptr::null_mut(), std::ptr::null_mut());
  let mut n = 0 as i32;
  napi_get_value_int32(env, buffer[0], &mut n);
  let results = pi::pi_opt(n);
  let mut local: napi_value = std::mem::zeroed();
  napi_create_double(env, results, &mut local);
  local
}

pub unsafe extern "C" fn c_fib(env: napi_env, info: napi_callback_info) -> napi_value {
  let mut buffer: [napi_value; 1] = std::mem::MaybeUninit::zeroed().assume_init();
  let mut argc = 1 as usize;
  napi_get_cb_info(env, info, &mut argc, buffer.as_mut_ptr(), std::ptr::null_mut(), std::ptr::null_mut());
  let mut n = 0 as i32;
  napi_get_value_int32(env, buffer[0], &mut n);
  let results = fib::fib(n);
  let mut local: napi_value = std::mem::zeroed();
  napi_create_int64(env, results, &mut local);
  local
}

pub unsafe extern "C" fn c_fib_opt(env: napi_env, info: napi_callback_info) -> napi_value {
  let mut buffer: [napi_value; 1] = std::mem::MaybeUninit::zeroed().assume_init();
  let mut argc = 1 as usize;
  napi_get_cb_info(env, info, &mut argc, buffer.as_mut_ptr(), std::ptr::null_mut(), std::ptr::null_mut());
  let mut n = 0 as i32;
  napi_get_value_int32(env, buffer[0], &mut n);
  let results = fib::fib_opt(n);
  let mut local: napi_value = std::mem::zeroed();
  napi_create_int64(env, results, &mut local);
  local
}

pub unsafe extern "C" fn c_fib_it(env: napi_env, info: napi_callback_info) -> napi_value {
  let mut buffer: [napi_value; 1] = std::mem::MaybeUninit::zeroed().assume_init();
  let mut argc = 1 as usize;
  napi_get_cb_info(env, info, &mut argc, buffer.as_mut_ptr(), std::ptr::null_mut(), std::ptr::null_mut());
  let mut n = 0 as i32;
  napi_get_value_int32(env, buffer[0], &mut n);
  let results = fib::fib_it(n);
  let mut local: napi_value = std::mem::zeroed();
  napi_create_int64(env, results, &mut local);
  local
}

unsafe fn reg_function(env: napi_env, exports: napi_value, fname: &str, f: unsafe extern "C" fn(env: napi_env, info: napi_callback_info) -> napi_value) {
  let p = CString::new(fname).expect("CString::new failed");
  let mut local: napi_value = std::mem::zeroed();
  napi_create_function(env, p.as_ptr(), fname.len(), Some(f), std::ptr::null_mut(), &mut local);
  napi_set_named_property(env, exports, p.as_ptr(), local);
}

#[no_mangle]
pub unsafe extern "C" fn napi_register_module_v1(
  env: napi_env,
  exports: napi_value,
) -> nodejs_sys::napi_value {
  reg_function(env, exports, "overhead", c_overhead);
  reg_function(env, exports, "pi", c_pi);
  reg_function(env, exports, "pi_opt", c_pi_opt);
  reg_function(env, exports, "fib", c_fib);
  reg_function(env, exports, "fib_opt", c_fib_opt);
  reg_function(env, exports, "fib_it", c_fib_it);
  exports
}
