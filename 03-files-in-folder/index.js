

const fs = require('fs');
const path = require('path');
const testFolder = path.join(__dirname, "secret-folder");

fs.readdir(testFolder,{withFileTypes:true}, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if(file.isFile()){
      const nameFile = file.name;
      const extFile = path.extname(file.name);
     
      const stat = fs.stat(path.join(testFolder, file.name),(err, el) => {
        if (err) throw err;
        const fileSize = el.size / 1024 ;
        console.log(nameFile.substr(0,nameFile.length - extFile.length) + " - " + extFile.substr(1,extFile.length) + " - " + fileSize + "kb");
      })
    }
  });
})


// const {
//   promises: { stat, readdir },
// } = require("fs");
// const path = require("path");

// const testFolder = path.join(__dirname, "secret-folder");

// async function doSomething() {
//   const dirEntries = await readdir(testFolder, { withFileTypes: true });
//   const files = dirEntries.filter((entry) => entry.isFile());

//   files.forEach(async (file) => {
//     const nameFile = file.name;
//     const extFile = path.extname(nameFile);

//     const el = await stat(path.join(testFolder, nameFile));
//     console.log(
//       [
//         nameFile.substr(0, nameFile.length - extFile.length),
//         extFile.substr(1),
//         `${el.size / 1024}kb`,
//       ].join(" - ")
//     );
//   });
// }

// doSomething();