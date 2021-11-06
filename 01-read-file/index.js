const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "text.txt");

let readableStream = fs.createReadStream(folder, "utf8");
// Для создания потока для чтения используется метод fs.createReadStream(), в который также передается название файла.
// В качестве опционального параметра здесь передается кодировка, что позволит сразу при чтении кодировать считанные данные в строку в указанной кодировке.
// Сам поток разбивается на ряд кусков или чанков (chunk). И при считывании каждого такого куска, возникает событие data.
// С помощью метода on() мы можем подписаться на это событие и вывести каждый кусок данных на консоль:
readableStream.on("data", function(chunk){ 
    console.log(chunk);
});
