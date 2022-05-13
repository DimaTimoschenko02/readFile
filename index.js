
const fl = "somefile.txt";

const fs = require("fs");
const readline = require("readline");

const linesCounter = async (fileName , lines) => {
  let cStream = fs.createReadStream(fileName);
  const arr = []


  const linesCount = await new Promise((resolve, reject) => {

    let rl = readline.createInterface(cStream);
    let count = 0;
    rl.on("line", function () {
      count++;
    });
    rl.on("error", reject);
    rl.on("close", function () {
      resolve(count);
    });
  });


  let resStream = fs.createReadStream(fileName);
  
  return await new Promise((resolve, reject) => {
    let rl_1 = readline.createInterface(resStream);
    let start = 0;

    rl_1.on("line", function (line) {
      start++;
      if (start > linesCount - lines) {
        arr.push(line);
      }
    });
    rl_1.on("close", function () {
      resolve(arr);
    });
  });
  
};

linesCounter(fl , 5).then(data => console.log(data))



