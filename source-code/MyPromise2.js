const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";

function resolvePromise(promise, x, resolve, reject) {
  console.log("MyPromise2");
}

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulFilledCallBack = [];
    this.onRejectedCallBack = [];

    // 每个执行器都有自己的resolve, reject,所以定义在构造器中，每次实例化的时候都会声明
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        // 发布
        this.onFulFilledCallBack.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        // 发布
        this.onRejectedCallBack.forEach((fn) => fn());
      }
    };

    // new Promise， 执行器立即执行
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  // x 普通值 或 promise
  // 必须去判断x是什么值
  // onFullFilled 和 onRejected 异步的，可以用宏任务或微任务实现异步，源码是用微任务
  then(onFullFilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFullFilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 还要处理 PENDING 状态 发布订阅模式
      if (this.status === PENDING) {
        // pending 状态不用 setTimeout, 因为等着resolve
        // 收集/订阅 onFulFilled\onRejected
        this.onFulFilledCallBack.push(() => {
          try {
            let x = onFullFilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallBack.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });

    return promise2;
  }
}

module.exports = MyPromise;
