#!/usr/bin/env node
//https://github.com/oscadev/react-import-folder/blob/master/index.js
// Slightly modified ^

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
let headTatoeData = "";
let normalTatoeData = "";
let pastTatoeData = "";
let dataOBJ = {};
let forbidden = ["-", " ", "", ".", "&"];

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

        validVarName = validVarNameMaker(validVarName);
        validVarName += ext;
        validPathKeyName = validVarNameMaker(pth);

        let relativePath = relPath
          .relative(outputPath, pth)
          .replace(/\\+/g, "/");

        imports += `import ${validVarName} from '${relativePath}/${file}'\n`;

        if (relativePath.match(/head tatoes/)) {
          headTatoeData += `{img: ${validVarName},\n name: "${filenameWithoutExt}", folder: "${relativePath}"},\n`;
        } else if (relativePath.match(/normal tatoes/)) {
          normalTatoeData += `{img: ${validVarName},\n name: "${filenameWithoutExt}", folder: "${relativePath}"},\n`;
        } else if (relativePath.match(/past tatoes/)) {
          pastTatoeData += `{img: ${validVarName},\n name: "${filenameWithoutExt}", folder: "${relativePath}"},\n`;
        }
      }
    }
  });

  data = `{\n`;
  data += `"head_tatoes": [\n${headTatoeData}\n],\n`;
  data += `"normal_tatoes": [\n${normalTatoeData}\n],\n`;
  data += `"past_tatoes": [\n${pastTatoeData}\n]\n`;
  data += `}`;
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

output += `${imports}\n\nconst data = ${data}\n\nexport default data;`;

fs.writeFile(`${outputPath}/TatoeImgImports.js`, output, function (err) {
  if (err) return console.log(err);
  console.log("TatoeImgImports.js has been created.");
});
