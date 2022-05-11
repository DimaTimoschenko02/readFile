const fs = require("fs");
const path = process.env.FILENAME || "somefile.txt";
const lines = 3;

function readLinesFromFile(path, lines) {
   try{
    fs.readFile(path, (err, data) => {
    data = data.toString().split(/\r?\n/);
    const end = data.length;
    const start = end - lines;
    console.log(data.slice(start, end));
  });
   }catch(err){
        throw err
   }
    
}


readLinesFromFile(path, lines);
process.on('uncaughtException', function (err) {
    console.error(err.message)
    process.exit(1)
})



