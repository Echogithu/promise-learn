// Promise.all
const fs = require('fs');

function readFile(path, isSetError) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err || isSetError) {
        reject("失败");
      }

      const resData = JSON.parse(data);

      resolve(resData);
    })
  })
}

// readFile('./data/user.json').then((res) => {
//   console.log(res);
// })

// readFile('./data/userCourse.json').then((res) => {
//   console.log(res);
// })

// readFile('./data/course.json').then((res) => {
//   console.log(res);
// })

// 合并三个文件内部的内容为一个数组，并且按照顺序排列，如果一个读取失败，返回 rejected

// iterable（可迭代） 类型的数据 -> Array Set Map
Promise.all([
  readFile('./data/user.json'),
  readFile('./data/userCourse.json', true),
  readFile('./data/course.json')
  // 0,'123', true
]).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log("catcher error: " + err);
})

// 用多个异步任务并发运行，他的结果创建承诺之后使用，等待所有任务结果的完成
// iterable 内部元素传递的是 promise 对象集合，如果不是 promise 直接resolve Promise.resolve(0 || '123' || true)
// iterable 内部没有元素，返回空数组
// 有一个 promise 是 rejected 实例回调 rejected
// 失败的原因是第一个失败的 promise 结果

// return Promise.resolve("成功了") 
// 等效于 new Promise(resolve => {resolve("成功了")})