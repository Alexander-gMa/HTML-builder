const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, "files");
const dest = path.join(__dirname, "files-copy");

fs.mkdir(dest, { recursive: true }, (err, files) => {
    if (err) throw err;
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            if (file.isFile()) {
                fs.copyFile(path.join(src,file.name), path.join(dest,file.name), (err,files) => {
                    if (err) throw err;
                })
            }
        })
    });
});

