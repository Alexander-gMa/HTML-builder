const fs = require('fs');
const path = require('path');

const base = '';
const sccFolder = path.join(__dirname, "project-dist");
const src = path.join(__dirname, "styles");

fs.writeFile(`${sccFolder}/bundle.css`, base, (err) => {
    if (err) {
        console.error(err)
    }
});

fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
        if (file.isFile()) {
            if (path.extname(file.name) === ".css") {
                fs.readFile(`${src}/${file.name}`, "utf8", (err, content) => {
                    if (err) throw err;
                    const trueWay = path.join(sccFolder, 'bundle.css');
                    fs.appendFile(trueWay, content, (err, files) => {
                        if (err) throw err;
                    })
                })

            }
        }
    })
});
