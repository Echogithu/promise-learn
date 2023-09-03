// 链式调用
let promise = new Promise((resolve, reject) => {
  resolve("First resolve");
});

//————————————————————————————————————————————————————
// 通过 return 传递结果
// promise
//   .then((res) => {
//     console.log("1", res); // 1 First resolve
//     return res; // 传递普通值
//   })
//   .then((res) => {
//     console.log("2", res); // 2 First resolve
//   });

//————————————————————————————————————————————————————
// 通过新的 promise resolve 的结果
// promise
//   .then((value) => {
//     console.log("1", value); // 1 First resolve
//     return value; // 传递普通值
//   })
//   .then((value) => {
//     console.log("2", value); // 2 First resolve
//     return new Promise((resolve, reject) => {
//       resolve(value);
//       // setTimeout(() => resolve(value), 2000);
//     });
//   })
//   .then((value) => {
//     console.log("3", value); // 3 First resolve
//   });

//————————————————————————————————————————————————————
// 通过新的 promise reject 的原因
// promise
//   .then((value) => {
//     console.log("1", value); // 1 First resolve
//     return value; // 传递普通值
//   })
//   .then((value) => {
//     console.log("2", value); // 2 First resolve
//     return new Promise((resolve, reject) => {
//       // reject("Error");
//       setTimeout(() => reject("Error"), 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log("3", value); // 3 First resolve
//     },
//     (reason) => {
//       console.log("rejected", reason); // rejected Error
//     }
//   );

//————————————————————————————————————————————————————
// then 走了失败的回调函数后，再走then
// promise
//   .then((value) => {
//     console.log("1", value); // 1 First resolve
//     return value; // 传递普通值
//   })
//   .then((value) => {
//     console.log("2", value); // 2 First resolve
//     return new Promise((resolve, reject) => {
//       // reject("Error");
//       setTimeout(() => reject("Error"), 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log("3", value); // 3 First resolve
//     },
//     (reason) => {
//       console.log("rejected1", reason); // rejected1, Error
//       // 默认 return undefined
//     }
//   )
//   .then(
//     (value) => {
//       console.log("4", value); // 4 undefined
//     },
//     (reason) => {
//       console.log("rejected2", reason);
//     }
//   );

// //————————————————————————————————————————————————————
// // then 中使用 throw new Error
// promise
//   .then((value) => {
//     console.log("1", value); // 1 First resolve
//     return value; // 传递普通值
//   })
//   .then((value) => {
//     console.log("2", value); // 2 First resolve
//     return new Promise((resolve, reject) => {
//       // reject("Error");
//       setTimeout(() => reject("Error"), 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log("3", value); // 3 First resolve
//     },
//     (reason) => {
//       console.log("rejected1", reason); // rejected1, Error
//       // 默认 return undefined
//     }
//   )
//   .then((value) => {
//     console.log("4", value); // 4 undefined
//     throw new Error("Throw Error");
//   })
//   .then(
//     (value) => {
//       console.log("5", value); //
//     },
//     (reason) => {
//       console.log("Exertion:" + reason); //Exertion:Error: Throw Error
//     }
//   );

//————————————————————————————————————————————————————
// catch 捕获异常
// promise
//   .then((value) => {
//     console.log("1", value); // 1 First resolve
//     return value; // 传递普通值
//   })
//   .then((value) => {
//     console.log("2", value); // 2 First resolve
//     return new Promise((resolve, reject) => {
//       // reject("Error");
//       setTimeout(() => reject("Error"), 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log("3", value); // 3 First resolve
//     },
//     (reason) => {
//       console.log("rejected1", reason); // rejected1, Error
//       // 默认 return undefined
//     }
//   )
//   .then((value) => {
//     console.log("4", value); // 4 undefined
//     throw new Error("Throw Error");
//   })
//   .then((value) => {
//     console.log("5", value); //
//   })
//   .catch((err) => {
//     console.log("catch", err); // catch Error: Throw Error
//     return "Catch Error";
//   })
//   .then((value) => {
//     console.log("6", value); // 6 Catch Error
//   });

// catch 在 Promise 的源码层面上就是一个 then, Catch 也是遵循 then 的运行原则

// 成功的条件
// then return 普通的JavaScript  value
// then return 新的promise成功态的结果 value

// 失败的条件
// then return 新的promise失败态的原因 reason
// then 抛出了异常 throw new Error

// promise 链式调用
// javascript JQuery return this
// then 不具备 this
// return new Promise
// promise.then(() => {}) // return new Promise().then
// .then()

// 有区别
// let promise2 = promise
//   .then((value) => {
//     console.log("1");
//     return 1;
//     // return 第一次返回的结果
//   })
//   .then((value) => {
//     console.log("2", value);
//     // return 第二次返回的结果
//   });

let promise2 = promise.then((value) => {
  console.log("1");
  return 1;
  // return 第一次返回的结果
});

// promise2 =  第一次then返回的结果
promise2.then((value) => {
  console.log("2", value);
});
