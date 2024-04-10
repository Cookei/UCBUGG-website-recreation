#!/usr/bin/env node
//https://github.com/oscadev/react-import-folder/blob/master/index.js
// Modified ^

const fs = require("fs");
const relPath = require("path");

String.prototype.replaceAtIndex = function (_index, _newValue) {
  return (
    this.substr(0, _index) + _newValue + this.substr(_index + _newValue.length)
  );
};

let path = process.argv[2] || null;
let recursive = false;
if (process.argv[4] == "all") {
  recursive = true;
}

//strip potential ending forward slash
if (path[path.length - 1] === "/") {
  path = path.slice(0, path.length - 1);
}

let outputPath = process.argv[3] || null;
if (outputPath[outputPath.length - 1] === "/") {
  outputPath = outputPath.slice(0, outputPath.length - 1);
}

//files to import
const importThese = [
  "md",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "tiff",
  "psd",
  "raw",
  "bmp",
  "heif",
  "indd",
  "svg",
  "ai",
  "eps",
  "pdf",
  "zip",
  "ma",
  "mb",
];

if (!path) {
  console.log(
    "You didnt add a path. Try again and add the relative path to the folder with the images. For example: react-import-folder ./src/assets/img\nadd 'all' to look in subdirectories too. For example: react-import-folder ./src/assets/img all"
  );
  process.exit();
}

let output = "";
let imports = "";
let data = "";
let dataOBJ = {};
let forbidden = ["-", " ", "", ".", "&", "(", ")", "/", "\\"];

function main(pth) {
  console.log(pth);
  console.log(pth.split("/"));
  files = fs.readdirSync(pth);
  // fs.readdir(pth, function (err, files) {
  //handling error
  // if (err) {
  //   return console.log("Unable to scan directory: " + err);
  // }
  //listing all files using forEach
  files.forEach(function (file) {
    //check if file is a folder and that they want recursion
    if (fs.lstatSync(pth + "/" + file).isDirectory() && recursive) {
      main(pth + "/" + file);
    } else {
      //check if valid file extension
      let lastPeriodPosition = file.lastIndexOf(".");
      let ext = file.slice(lastPeriodPosition + 1).toLocaleLowerCase();
      //only include if valid extension
      if (importThese.includes(ext)) {
        //create key for folder in data object

        let len = file.length;
        // Convert name to var
        let validVarName, validPathKeyName, filenameWithoutExt;

        //find extension and remove

        validVarName = file.slice(0, len - (len - lastPeriodPosition));
        filenameWithoutExt = validVarName;

        validVarName = validVarNameMaker(validVarName + "" + pth);
        validPathKeyName = validVarNameMaker(pth);
        validVarName += ext;

        let relativePath = relPath
          .relative(outputPath, pth)
          .replace(/\\+/g, "/");

        imports += `import ${validVarName} from '${relativePath}/${file}'\n`;

        if (ext == "md") {
          data += `{"type": "${ext}",\n "file": "${validVarName}",\n "name": "${filenameWithoutExt}", "folder": "${
            pth.match(/(?<=labs\/).*/g)[0]
          }"},\n`;
        } else {
          data += `{"type": "${ext}",\n "file": "${validVarName}",\n "name": "${
            filenameWithoutExt + "." + ext
          }", "folder": "${pth.match(/(?<=labs\/).*/g)[0]}"},\n`;
        }
      }
    }
  });

  // });
}

main(path);

function validVarNameMaker(str) {
  //replace forbidden chars with underscore
  for (let i = 0; i < str.length; i++) {
    if (forbidden.includes(str[i])) {
      str = str.replaceAtIndex(i, "_");
    }
  }
  str = "_" + str;
  return str;
}
let jsonObj = `[\n${data}\n]`;
jsonObj = eval(jsonObj);
let newObj = {};
for (e of jsonObj) {
  let parsedFilePath = e["folder"].split("/");
  parsedFilePath.pop();
  let routePath = e["folder"].replace(/ /g, "_");
  parsedFilePath = parsedFilePath.join("/").replace(/ /g, "_");
  nestedAdd(parsedFilePath, {}, newObj);
  if (e["type"] == "md") {
    nestedAdd(routePath + "/markdown", [e.file, routePath], newObj);
  } else {
    nestedAdd(routePath + "/images/" + e.name, e["file"], newObj);
  }
}
newObj = JSON.stringify(newObj, null, 2);
// data = `[\n${data}\n]`;
newObj = newObj.replace(
  /(?<=: *.*)["'](?=.*\n)|(?<=\[\n\s*)['"]|(?<=(?<=\[\n\s*)['"].*)['"]/gm,
  ""
);
// output += `${imports}\n\nconst data = ${data}\nexport default data;`;
output += `${imports}\n\nconst data = ${newObj}\nexport default data;`;
// output += `${imports}\n\nconst data = ${newObj}\nexport default data;`;

fs.writeFile(`${outputPath}/labExport.js`, output, function (err) {
  if (err) return console.log(err);
  console.log("labExport.js has been created.");
});

function nestedAdd(path, value, obj) {
  var schema = obj; // a moving reference to internal objects within obj
  var pList = path.split("/");
  var len = pList.length;
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }
  if (schema[pList[len - 1]] == undefined) {
    schema[pList[len - 1]] = value;
  }
}

function nestedPush(path, value, obj) {
  var schema = obj; // a moving reference to internal objects within obj
  var pList = path.split("/");
  var len = pList.length;
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }

  schema[pList[len - 1]].push(value);
}
