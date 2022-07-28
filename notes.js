const fs = require("fs");
const chalk = require("chalk");
const { title } = require("process");

const getNote = () => {
  console.log("Your note got returned safe and sound without getting spoiled");
};
//Add Note function
const addNote = (title, body) => {
  const notes = loadNote();
  //checking if title already exist in the note using the array filter method
  // const duplicateNote = notes.filter((note) => note.title === title);
  const duplicateNotes = notes.find((note) => note.title === title);

  // if (duplicateNotes.length === 0) this is for the filter() method
  if (!duplicateNotes) {
    //you can also use if (duplicateNotes === undefined)
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen("Note Added"));
  } else {
    console.log(chalk.bgRed("Note title taken"));
  }
};

//Save Notes
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

//Load Notes
const loadNote = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

//Remove Note
const removeNote = (title) => {
  const deleteNote = loadNote();
  const remNote = deleteNote.filter((note) => note.title !== title);
  if (deleteNote.length > remNote.length) {
    saveNotes(remNote);
    console.log(chalk.bgGreen("Note removed!"));
  } else {
    console.log(chalk.bgRed("No note found!"));
  }
};

//List Note
const listNote = () => {
  const notes = loadNote();
  console.log(chalk.bgYellow("Your Note Title"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

//Read Note
const readNote = (title) => {
  const notes = loadNote();
  const readingNote = notes.find((note) => note.title === title);

  if (readingNote) {
    console.log(chalk.inverse(readingNote.title));
    console.log(readingNote.body);
  } else {
    console.log(chalk.bgRed("No note found"));
  }
};

module.exports = {
  getNote,
  addNote,
  removeNote,
  listNote,
  readNote,
};
