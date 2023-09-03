const MyPromise = require("./MyPromise");

let promise = new MyPromise((resolve, reject) => {
  // 非异步
  // resolve("success");
  // reject("Error");
  // throw new Error("Exception: Error");

  setTimeout(() => { // 异步程序 还在 pending 状态
    resolve("success1");
  },2000)
});

promise.then(
  (value) => {
    console.log("1", value);
  },
  (reason) => {
    console.log("11", reason);
  }
);

promise.then(
  (value) => {
    console.log("2", value);
  },
  (reason) => {
    console.log("22", reason);
  }
);
