const fs = require('fs');
const path = require('path');

const base = '';
const src = path.join(__dirname, "styles");

fs.mkdir(path.join("06-build-page/project-dist"), err => {
    if (err) return
});

let readableHTML = fs.createReadStream("06-build-page/template.html", "utf8");

let writeableHTML = fs.createWriteStream("06-build-page/project-dist/index.html");

readableHTML.pipe(writeableHTML);

fs.readFile("06-build-page/project-dist/index.html", "utf8", (err, contentMain) => {
    if (err) throw err;
    fs.readFile("06-build-page/components/header.html", "utf8", (err, contentCopy) => {
        contentMain = contentMain.replace(" {{header}}", contentCopy);
        fs.writeFile("06-build-page/project-dist/index.html", contentMain, 'utf8', (err, contentMain) => {
            if (err) throw err;
        });
    }
    )
    fs.readFile("06-build-page/components/articles.html", "utf8", (err, contentCopy) => {
        contentMain = contentMain.replace(" {{articles}}", contentCopy);
        fs.writeFile("06-build-page/project-dist/index.html", contentMain, 'utf8', (err, contentMain) => {
            if (err) throw err;
        });
    }
    )
    fs.readFile("06-build-page/components/footer.html", "utf8", (err, contentCopy) => {
        contentMain = contentMain.replace(" {{footer}}", contentCopy);
        fs.writeFile("06-build-page/project-dist/index.html", contentMain, 'utf8', (err, contentMain) => {
            if (err) throw err;
        });
    }
    )
});

/////////////////////////////////////////////////////////////////
fs.writeFile(`06-build-page/project-dist/style.css`, base, (err) => {
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
                    fs.appendFile("06-build-page/project-dist/style.css", content, (err, files) => {
                        if (err) throw err;
                    })
                })

            }
        }
    })
});

///////////////////////////////////////////////////////////////

const assetsMain = path.join(__dirname, "assets");
fs.mkdir("06-build-page/project-dist/assets", { recursive: true }, (err, files) => {
    if (err) throw err;
    fs.readdir(assetsMain, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            const assetsCopy = path.join(__dirname, "project-dist/assets");
            fs.mkdir(path.join(assetsCopy, file.name), { recursive: true }, (err, elements) => {
                if (err) throw err;
            })
            fs.readdir(path.join(assetsMain, file.name), { withFileTypes: true }, (err, content) => {
                if (err) throw err;
                content.forEach((content) => {
                    if (content.isFile()) {
                        const copyWeg = path.join(__dirname, `${file.name}/${content.name}`);
                        const mainWeg = path.join(assetsMain, `${file.name}/${content.name}`);
                        fs.writeFile(copyWeg, base, (err, data) => {
                            if (err) throw err;
                        })
                        fs.copyFile(mainWeg, copyWeg, (err, files) => {
                            if (err) throw err;
                        })
                    }
                })
            })
        })
    });
});
