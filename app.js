const note = require("./notes");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const { argv } = require("process");

/*fs.writeFileSync("note.txt", "This file was created by node js. ");
fs.appendFileSync("note.txt", " File appending successful");

const name = "Nkasi";
console.log(name);
console.log(validator.isEmail("nkasi@gmail.com"));
console.log(chalk.green("Success"));
console.log(chalk.red("danger"));
console.log(yargs.argv);

const command = process.argv[2];
if (command === "add") {
  console.log("Adding values");
} else if (command === "remove") {
  console.log("Value removed");
}
console.log(process.argv);*/

//Creating Add command
yargs.command({
  command: "add",
  description: "Man that made the gods",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, //Making it a required option
      type: "string", //Making it a string
    },
    body: {
      describe: "The body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    note.addNote(argv.title, argv.body);
  },
});

//remove comand
yargs.command({
  command: "remove",
  description: "Remove a node",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    note.removeNote(argv.title);
  },
});

//Creating list command
yargs.command({
  command: "list",
  description: "List a note",
  handler() {
    note.listNote();
  },
});

//Creating read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Read title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    note.readNote(argv.title);
  },
});

yargs.parse();
// const $come = yargs.argv;
// console.log($come);
