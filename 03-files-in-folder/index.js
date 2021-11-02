

const fs = require('fs');
const path = require('path');
const testFolder = path.join(__dirname, "secret-folder");
let nameFile;
let extFile;
let abc ;
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    nameFile = file;
    extFile = path.extname(file);
    nameOhneExt = nameFile.length - extFile.length;
    console.log(nameFile.substr(0,nameOhneExt) + " - " + extFile.substr(1,extFile.length) + abc);
  });
})



var stats = fs.stat("03-files-in-folder/secret-folder/data.csv", (err, files) => {
    if (err) {
        console.log(err);
        return;
      }
    abc = files.size;
      // else show size from stats object
      console.log("File Size is: ", abc / 1024 , "kb");
      return abc
});

