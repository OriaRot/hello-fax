const fs = require("fs");

function createFolder(folderName) {
  if (!findIllegalSymbols(folderName)) return "folder name illegal";
  try {
    if (!fs.existsSync(`./root/${folderName}`)) {
      fs.mkdirSync(`./root/${folderName}`);
      return true;
    }
  } catch (err) {
    return false;
  }
}
function createFile(folderName, fileName, fileData, encoding = "utf8") {
  console.log("im in");
  try {
    if (!fs.existsSync(`./root/${folderName}/${fileName}`)) {
      fs.writeFileSync(`./root/${folderName}/${fileName}`, fileData, {
        encoding,
      });
      console.log("jojokokok");
      return true;
    }
  } catch {
    console.log("lololo");
    return false;
  }
}

function readFile(foldername, fileName, encoding = "utf8") {
  return fs.readFileSync(`./root/${foldername}/${fileName}`, { encoding });
}

function readFolder(foldername, encoding = "utf8") {
  try {
    if (foldername) {
      if (fs.existsSync(`./root/${foldername}`)) {
        return fs.readdirSync(`./root/${foldername}`, { encoding });
      } else throw "file dont exists";
    } else {
      return fs.readdirSync(`./root/`, { encoding });
    }
  } catch (err) {
    return err;
  }
}

function rename(folderName, fileName, newName) {
  console.log(111111,'foldername: ',folderName,"filename: ",fileName,"new: ", newName);
  try {
    fileName
      ? fs.renameSync(
          `./root/${folderName}/${fileName}`,
          `./root/${folderName}/${newName}`
        )
      : fs.renameSync(`./root/${folderName}/`, `./root/${newName}/`);
    return true;
  } catch {
    return false;
  }
}

function removeFolder(folderName) {
  fs.rmdirSync(`./root/${folderName}`);
  return "deleted";
}

function removeFile(folderName, fileName) {
  fs.unlinkSync(`./root/${folderName}/${fileName}`);
}

function findIllegalSymbols(fileName = "") {
  const symbols = [
    "#",
    "%",
    "&",
    "{",
    "}",
    "<",
    ">",
    "*",
    "?",
    "/",
    "\\",
    " ",
    "$",
    "!",
    "'",
    '"',
    ":",
    "@",
    "+",
    "`",
    "|",
    "=",
  ];
  return symbols.find((char) => fileName.includes(char)) ? false : true;
}





module.exports = {
  createFile,
  createFolder,
  readFolder,
  readFile,
  rename,
  removeFolder,
  removeFile,
  findIllegalSymbols,
};
