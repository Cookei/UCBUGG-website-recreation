import React, { useState } from "react";
import styles from "../styles/Bladerunner.module.css";

const Bladerunner = () => {
  const [command, setCommand] = useState("placeholder");

  let generateCommand = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    let frameStart = formData.get("frameStart");
    let frameEnd = formData.get("frameEnd");
    const kickDirectory = formData.get("kickDirectory");
    const shaderDirectory = formData.get("shaderDirectory");
    let inputDirectory = formData.get("inputDirectory");
    if (inputDirectory[inputDirectory.length - 1] != "/") inputDirectory += "/";
    const baseName = formData.get("baseName");
    let outputDirectory = formData.get("outputDirectory");
    if (outputDirectory[outputDirectory.length - 1] != "/")
      outputDirectory += "/";

    let format_text = /[ `!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~]/;
    let format_directory = /[ `!@#$%^&*()+=\[\]{};':"\\|,.<>?~]/;
    let prohibited_text = "`!@#$%^&* ()+=[]{};':\"\\|,.<>/?~";
    let prohibited_directory = "`!@#$%^&* ()+=[]{};':\"\\|,.<>?~";
    if (format_text.test(title)) {
      alert(
        `Please remove any special characters in Job Title\nList of prohibited characters:\n${prohibited_text}`
      );
      setCommand("error");
      return;
    } else if (format_directory.test(inputDirectory)) {
      alert(
        `Please remove any special characters in Input Directory\nList of prohibited characters:\n${prohibited_directory}`
      );
      setCommand("error");
      return;
    } else if (format_directory.test(outputDirectory)) {
      alert(
        `Please remove any special characters in Output Directory\nList of prohibited characters:\n${prohibited_directory}`
      );
      setCommand("error");
      return;
    } else if (format_text.test(baseName)) {
      alert(
        `Please remove any special characters in File Base Name\nList of prohibited characters:\n${prohibited_text}`
      );
      setCommand("error");
      return;
    }

    frameStart = parseInt(frameStart);
    frameEnd = parseInt(frameEnd);

    if (frameStart == NaN) {
      alert("Frame start must be a valid number");
      setCommand("error");
      return;
    } else if (frameEnd == NaN) {
      alert("Frame end must be a valid number");
      setCommand("error");
      return;
    }

    if (frameEnd < frameStart) {
      alert("Frame end must be greater than frame start");
      setCommand("error");
      return;
    }

    let commandOutput = `tractor-spool --title="${title}" --range ${frameStart}-${frameEnd} -c "${kickDirectory} -i ${inputDirectory}${baseName}{RANGE:0>4}.ass -l ${shaderDirectory} -dp -dw -o ${outputDirectory}${baseName}_{RANGE:0>4}.exr"`;
    setCommand(commandOutput);
  };

  return (
    <div id={styles.bladerunner}>
      <div id={styles.left}>
        <h1>Bladerunner</h1>
        <p>
          MtoA v5.3.4.1
          <br />
          Arnold Core v7.2.4.1
        </p>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={generateCommand}
        >
          <label>Enter Job Title</label>
          <input
            type="text"
            placeholder="groupName_scene1_shot1"
            name="title"
            required
          />
          <div id={styles.frameRange}>
            <div>
              <label>Frame Start</label>
              <input
                type="number"
                placeholder="1"
                min={1}
                pattern="\d+"
                name="frameStart"
                required
              />
            </div>
            <div>
              <label>Frame End</label>
              <input
                type="number"
                placeholder="500"
                min={1}
                pattern="\d+"
                name="frameEnd"
                required
              />
            </div>
          </div>
          <label>Input Directory</label>
          <div className={styles.directoryInput}>
            <code>/home/render/Fall_2025/</code>
            <input
              type="text"
              placeholder={"Test/Scene1/Shot1/"}
              name="inputDirectory"
              required
            />
          </div>
          <label>Output directory</label>
          <div className={styles.directoryInput}>
            <code>/home/render/Fall_2025/</code>
            <input
              type="text"
              placeholder={"Test/Output/Scene1/Shot1/"}
              name="outputDirectory"
              required
            />
          </div>
          <label>File base name</label>
          <input
            type="text"
            placeholder={"WF_cliff_scene_shot1"}
            name="baseName"
            required
          />

          <label>kick directory</label>
          <input
            type="text"
            value={"/usr/autodesk/arnold/maya2024/bin/kick"}
            name="kickDirectory"
            readOnly
            required
          />
          <label>Shaders directory</label>
          <input
            type="text"
            value={"/usr/autodesk/arnold/maya2024/shaders/"}
            name="shaderDirectory"
            readOnly
            required
          />
          <button type="submit">Generate Command</button>
        </form>
      </div>
      <div id={styles.right}>
        <h1>Command</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <code>{command}</code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(command);
              alert(`Copied « ${command} » to clipboard`);
            }}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bladerunner;
