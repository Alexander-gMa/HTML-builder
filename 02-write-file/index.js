isTrue = true;
const fs = require('fs')
// Процесс это глобальный объект
const process = require('process');
const readline = require('readline');
let base = '' ;
// Создаю пустой файл , который потом наполняется текстом - файл каждый раз появляется пустым

fs.writeFile('02-write-file/text.txt', base, (err) => {
    if (err) {
        console.error(err)
        return
  }
});
// Создаём rl

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a promise based version of rl.question so we can use it in async functions
const question = (e) => new Promise(resolve => rl.question(e, resolve));

// Список всех шагов программы
const steps = {
  start: async () => {
    return steps.correctText();
  },
  correctText: async () => {
    const correctText = await question("Введите текст:");
    if (correctText !== 'exit') {
        content = correctText;
        steps.write();
        return steps.correctText(); 
    }
    if (correctText === 'exit') { return steps.unCorrectText(); }
    
  },
  unCorrectText: async () => {
    console.log(`Ввод закончен!`);
    return steps.end();
  },
  end: async () => {
    rl.close();
  },
//   write перезаписывает append добавляет
  write: async () => {
    fs.appendFile('02-write-file/text.txt', content, (err) => {
        if (err) {
            console.error(err)
            return
      }
      //файл записан успешно
    });
  }
};

// Start the program by running the first step.
steps.start();

// весло через C + ctrl , не получается через process.on(exit) 
process.stdin.on("keypress", function(e, key) {
  if(key && key.name === "c" && key.ctrl) {
    console.log("Ввод закончен! Вы нажали ctrl + c")
    steps.end();
  }
});
