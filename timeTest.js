
const fl = "t.txt";

const fs = require("fs");
const readline = require("readline");


const path = 't.txt'


function testfoo(lines){
  const start= new Date().getTime();
  function readLinesFromFile(path , lines){
    fs.readFile(path, async (err, data) => {
    if (err) throw err;
    data = data.toString().split(/\r?\n/)
    const end = data.length
    const start = end - lines
    data.slice(start , end)
    console.log('data.slice(start , end)')
    const en = new Date().getTime();
    console.log(`firtway: ${en - start}ms`);
    });
    
    }
    readLinesFromFile(path , lines)
    
}








const linesCounter = async (fileName , lines) => {
  start = new Date().getTime();
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
async function foo(lines){
  
  let  start= new Date().getTime();
  const data = await linesCounter(fl , lines)
  console.log('data')
  const end = new Date().getTime();
console.log(`SecondWay: ${end - start}ms`);
}
foo(50000)
testfoo(50000)


