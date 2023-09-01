const fetch = require('node-fetch');

// function getData() {
//   return new Promise(function (resolve, reject) {
//     fetch('http://study.jsplusplus.com/xiaomi/getXiaomiDatas?phone=true') // fetch执行以后也是一个 promise
//       .then(res => {
//         return res.json();
//       })
//       .then(res => resolve(res))
//       .catch(err => reject(err))
//   })
// }

function getData() {
  return fetch('http://study.jsplusplus.com/xiaomi/getXiaomiDatas?phone=true')
    .then(res => {
      return res.json();
    })
    .then(res => res)
    .catch(err => err)

}

// getData().then(res => {
//   console.log(res);
// })

// async 意思是当前这个异步函数与同一作用域下的程序是异步的关系
async function logData() {
  const res = await getData();

  // const p1 = await getData();
  // const p2 = await getData(p1);
  // const p3 = await getData(p2);
  // const p4 = await getData(p3);

  console.log(res);
}

logData();
// console.log('logData(): ', logData()); // 返回结果： Promise{<pending>}

console.log('Global'); // 先打印

// await 是一个操作符
// 等待一个 Promise 对象产出结果的操作手段
// 功能是暂停 async 函数的执行，等待 Promise 处理后的结果
// 假如 Promise 处理后的结果是rejected, 抛出异常
// async 函数是通过一个隐式的 Promise 返回的 pending 状态
