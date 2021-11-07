const { promises: fs } = require ('fs')
const path = require('path');

const base = '';
const sccStyles = path.join(__dirname, "styles");
const mkDir = path.join(__dirname, "project-dist");

const mainIndex = path.join(mkDir, "index.html");


const removeDir = async (src) => {
    try {
        await fs.rm(src, { recursive: true });
    }
    catch (err) { }
    await createDir(src);
};

function createDir(src) {
    return fs.mkdir(src, { recursive: true });
}

function readFile(src) {
    return fs.readFile(src, "utf-8");
}

///////////////////////////////////////////////////////////////////////////////////

const components = path.join(__dirname, "components");

const createHtmlFile = async () => {
    const compContent = await fs.readdir(components);
    const compFilesinIndex = await compContent.reduce(async (result, el) => {
        const extTitleName = path.extname(el);
        const titleName = el.substr(0, el.length - extTitleName.length)
        const tileOfContent = await readFile(path.join(components, el));
        const newResult = await result;
        return newResult.replace(`{{${titleName}}}`, tileOfContent);
    },
        await readFile(mainIndex));
    await fs.writeFile(mainIndex, compFilesinIndex, 'utf8');
};
/////////////////////////////////////////////////////////////////

const createCSSBundle = async () => {
    await fs.writeFile(path.join(mkDir, 'style.css'), base);
    const files = await fs.readdir(sccStyles, { withFileTypes: true });
    files
        .filter((file) => {
            return file.isFile() && path.extname(file.name) === '.css';
        })
        .forEach(async (file) => {
            let content = await readFile(`${sccStyles}/${file.name}`);
            await fs.appendFile(`${mkDir}/style.css`, content);
        });
};

// // ///////////////////////////////////////////////////////////////

const assetsMain = path.join(__dirname, "assets");
const assetsCopy = path.join(mkDir, "assets");

async function copyAssets() {
    await fs.mkdir(assetsCopy, { recursive: true })
    const assetsContent = await fs.readdir(assetsMain, { withFileTypes: true });
    assetsContent.forEach(async (file) => {
        await fs.mkdir(path.join(assetsCopy, file.name), { recursive: true });
        const content = await fs.readdir(path.join(assetsMain, file.name), { withFileTypes: true });
        content
            .filter((file) => {
                return file.isFile();
            })
            .forEach(async (content) => {
                const mainWeg = path.join(assetsMain, `${file.name}/${content.name}`);
                const copyWeg = path.join(assetsCopy, `${file.name}/${content.name}`);
                await fs.copyFile(mainWeg, copyWeg);
            });
    });
}

async function init() {
    await removeDir(mkDir);
    await fs.copyFile(path.join(__dirname, 'template.html'), mainIndex);
    await createHtmlFile();
    await createCSSBundle();
    await copyAssets();
}

init();


