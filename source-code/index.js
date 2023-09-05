const MyPromise = require("./MyPromise2");

// let promise = new MyPromise((resolve, reject) => {
//   // 非异步
//   // resolve("success");
//   // reject("Error");
//   // throw new Error("Exception: Error");

//   setTimeout(() => { // 异步程序 还在 pending 状态
//     resolve("success1");
//   },2000)
// });

// promise.then(
//   (value) => {
//     console.log("1", value);
//   },
//   (reason) => {
//     console.log("11", reason);
//   }
// );

// promise.then(
//   (value) => {
//     console.log("2", value);
//   },
//   (reason) => {
//     console.log("22", reason);
//   }
// );

let promise1 = new MyPromise((resolve, reject) => {
  resolve("promise1");
});

let promise2 = promise1
  .then((value) => {
    // 每一个then 应该返回一个新的 promise -> 才能链式调用
    return Promise.resolve(value + " -> then -> primose2");
    // return value + " -> then -> primose2";
  })
  .then((value) => {
    console.log(value);
  });
