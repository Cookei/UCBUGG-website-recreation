#!/usr/bin/env node
const fs = require("fs");

String.prototype.replaceAtIndex = function (_index, _newValue) {
  return (
    this.substr(0, _index) + _newValue + this.substr(_index + _newValue.length)
  );
};

let outputPath = process.argv[2];

if (outputPath[outputPath.length - 1] === "/") {
  outputPath = outputPath.slice(0, outputPath.length - 1);
}

let file = fs.readFileSync("./src/assets/Syllabus/Course Schedule.json", {
  encoding: "utf8",
});

let jsonFile = JSON.parse(file);
let basicOutputString =
  "| Date | Topics Covered | > | Assignments (Due before next class unless specified otherwise) |\n";
basicOutputString += "| - | - | - | - |\n";

let advancedOutputString = basicOutputString;

for (let obj of jsonFile) {
  if (obj.location != undefined) {
    let string = `| ${obj.date[0]} | ${obj.topics[0]} | > | <br>${obj.location}<br><br>`;
    basicOutputString += string;
    advancedOutputString += string;
    continue;
  }
  let date = "";
  let first = obj.date[0].split(" ");
  let month = first[0];
  date += month + " ";
  for (let i = 0; i < obj.date.length; i++) {
    let split = obj.date[i].split(" ");
    if (split[0] != month) {
      date = obj.date.join("<br>");
      break;
    }
    date += split[1];
    if (i != obj.date.length - 1) {
      date += " / ";
    }
  }

  let topic = obj.topics.join("<br>");

  const generateAssignments = (section) => {
    let sectionObj = obj.assignments[section];
    if (sectionObj == undefined || Object.keys(sectionObj).length == 0)
      return "";
    let returnArr = ["<ul>", "<ul>"];
    if (sectionObj.individual.length == 0) {
      returnArr[0] = "";
    } else {
      returnArr[0] += liIfy(sectionObj.individual);
      returnArr[0] += "</ul>";
    }

    if (sectionObj.group.length == 0) {
      returnArr[1] = "";
    } else {
      returnArr[1] += liIfy(sectionObj.group);
      returnArr[1] += "</ul>";
    }
    return returnArr;
  };

  let basicAssignments = generateAssignments("basic");
  let advancedAssignments = generateAssignments("advanced");

  basicOutputString += `| ${date} | ${topic} | Individual | Group |\n`;
  basicOutputString += `| ^ | ^ | ${basicAssignments[0]} | ${basicAssignments[1]} |\n`;
  advancedOutputString += `| ${date} | ${topic} | Individual | Group |\n`;
  advancedOutputString += `| ^ | ^ | ${advancedAssignments[0]} | ${advancedAssignments[1]} |\n`;
}

fs.writeFile(
  `${outputPath}/basicSchedule.md`,
  basicOutputString,
  function (err) {
    if (err) return console.log(err);
    console.log("basicSchedule.md has been created.");
  }
);

fs.writeFile(
  `${outputPath}/advancedSchedule.md`,
  advancedOutputString,
  function (err) {
    if (err) return console.log(err);
    console.log("advancedSchedule.md has been created.");
  }
);

function liIfy(arr) {
  let returnStr = "";
  for (let e of arr) {
    returnStr += "<li>";
    returnStr += e;
    returnStr += "</li>";
  }
  return returnStr;
}
