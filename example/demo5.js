// Promise.race
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

Promise.race([
  readFile('./data/user.json'),
  readFile('./data/userCourse.json'),
  readFile('./data/course.json', true)
]).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log("catcher error: " + err);
})

// 谁先完成就返回那个 Promise 的结果，无论是成功还是失败的结果
// 测试资源或接口的响应速度

// Promise.race([
//   getImg(),
//   timeout()
// ])