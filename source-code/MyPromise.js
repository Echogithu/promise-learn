const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";

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

  then(onFullFilled, onRejected) {
    if (this.status === FULFILLED) {
      onFullFilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }

    // 还要处理 PENDING 状态 发布订阅模式
    if (this.status === PENDING) {
      // 收集/订阅 onFulFilled\onRejected
      this.onFulFilledCallBack.push(() => {
        onFullFilled(this.value);
      });
      this.onRejectedCallBack.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = MyPromise;
