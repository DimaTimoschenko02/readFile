const fs = require("mz/fs");




// Some parts of code i borrowed




function readLinesFromFile(path, maxLineCount) {

  const NEW_LINE_CHARACTERS = ["\n"];

  const readPreviousChar = function( stat, file, currentCharacterCount) {
    return fs.read(file, Buffer.alloc(1), 0, 1, stat.size - 1 - currentCharacterCount)
      .then((bytesReadAndBuffer) => {
        return String.fromCharCode(bytesReadAndBuffer[1][0]);
      });
  };

  return new Promise((resolve, reject) => {
    let self = {
      stat: null,
      file: null,
    };

    fs.exists(path).then(() => {
        let promises = [];

        promises.push(
          fs.stat(path)
            .then(stat => self.stat = stat));

        promises.push(
          fs.open(path, "r")
            .then(file => self.file = file));

        return Promise.all(promises);
      }).then(() => {
        let chars = 0;
        let lineCount = 0;
        let lines = "";

        const do_while_loop = function() {
          if (lines.length > self.stat.size) {
            lines = lines.substring(lines.length - self.stat.size);
          }

          if (lines.length >= self.stat.size || lineCount >= maxLineCount) {
            if (NEW_LINE_CHARACTERS.includes(lines.substring(0, 1))) {
              lines = lines.substring(1);
            }
            fs.close(self.file);
          
            return resolve(Buffer.from(lines, "binary").toString('utf-8'));
          }

          return readPreviousChar(self.stat, self.file, chars)
            .then((nextCharacter) => {
              lines = nextCharacter + lines;
              if (NEW_LINE_CHARACTERS.includes(nextCharacter) && lines.length > 1) {
                lineCount++;
              }
              chars++;
            })
            .then(do_while_loop);
        };
        return do_while_loop();

      })
  });
}
async function timeTest(){
  let st =  new Date().getTime();
  const res = await readLinesFromFile('t.txt' , 50000)
  console.log('get res')
  let fn =  new Date().getTime();
  console.log(`ThirdWay: ${fn - st}ms`)
}
//readLinesFromFile('somefile.txt' , 5).then(res => console.log(res))
timeTest()