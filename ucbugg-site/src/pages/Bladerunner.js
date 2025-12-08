import React, { useRef, useState } from "react";
import styles from "../styles/Bladerunner.module.css";

const Bladerunner = () => {
  const [command, setCommand] = useState("placeholder");
  const flagsRef = useRef(null);
  const [fileDownload, setFileDownload] = useState();
  const [groupName, setGroupName] = useState("");
  const [sceneNum, setSceneNum] = useState("");
  const [shotNum, setShotNum] = useState("");
  const [frameStart, setFrameStart] = useState("");
  const [frameEnd, setFrameEnd] = useState("");

  let generateCommand = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
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
    let flagsList = flagsRef.current.querySelectorAll(
      `input[type=checkbox]:checked`
    );
    const service = formData.get("service");

    let format_text = /[ `!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~]/;
    let format_directory = /[ `!@#$%^&*()+=\[\]{};':"\\|,.<>?~]/;
    let prohibited_text = "`!@#$%^&* ()+=[]{};':\"\\|,.<>/?~";
    let prohibited_directory = "`!@#$%^&* ()+=[]{};':\"\\|,.<>?~";
    if (format_text.test(groupName)) {
      alert(
        `Please remove any special characters in the Group Name\nList of prohibited characters:\n${prohibited_text}`
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

    let title = `${groupName}_${sceneNum}_${shotNum}`;

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

    let flags = "";
    flagsList.forEach((cb) => {
      flags += cb.value + " ";
    });

    let content = `Job -title {${title}} -subtasks {
  Iterate frame -from ${frameStart} -to ${frameEnd} -by 1 -template {
    Task {Frame_$frame} -cmds {
      RemoteCmd {
        /bin/bash -lc "
          F=$(printf "%04d" $frame)
          export ADSKFLEX_LICENSE_FILE=7111@128.32.42.211;
          ${kickDirectory} \\
            -i ${inputDirectory}${baseName}\${F}.ass \\
            -l ${shaderDirectory} \\
            ${flags}\\
            -o ${outputDirectory}${baseName}_\${F}.exr
        "
      } -service {${service}}
    }
  }
}
`;

    const file = new File([content], `${title}.alf`, {
      type: "text/plain",
    });
    setFileDownload(file);

    let commandOutput = `tractor-spool --projects=${groupName} ${title}.alf`;
    setCommand(commandOutput);
  };

  let downloadFile = () => {
    if (!fileDownload) {
      alert("Please fill out the option boxes");
      return;
    }
    const link = document.createElement("a");
    const url = URL.createObjectURL(fileDownload);

    link.href = url;
    link.download = fileDownload.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
          <div id={styles.initialInfo}>
            <div>
              <label>Group Name</label>
              <input
                type="text"
                placeholder="WeirdFishes"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label>Scene #</label>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="1"
                value={sceneNum}
                onChange={(e) => {
                  if (/^\d+$/.test(e.target.value)) {
                    setSceneNum(e.target.value);
                  }
                }}
                required
              />
            </div>
            <div>
              <label>Shot #</label>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="1"
                onChange={(e) => {
                  if (/^\d+$/.test(e.target.value)) {
                    setShotNum(e.target.value);
                  }
                }}
                required
              />
            </div>
          </div>
          <div id={styles.frameRange}>
            <div>
              <label>Frame Start</label>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="1"
                min={1}
                name="frameStart"
                value={frameStart}
                onChange={(e) => {
                  if (/^\d+$/.test(e.target.value)) {
                    setFrameStart(e.target.value);
                  }
                }}
                required
              />
            </div>
            <div>
              <label>Frame End</label>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="500"
                min={1}
                name="frameEnd"
                value={frameEnd}
                onChange={(e) => {
                  if (/^\d+$/.test(e.target.value)) {
                    setFrameEnd(e.target.value);
                  }
                }}
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

          <label>File base name</label>
          <div className={styles.baseNameInput}>
            <input
              type="text"
              placeholder={"WF_cliff_scene_shot1"}
              name="baseName"
              required
            />
            <code>{`{RANGE:0>4}.ass`}</code>
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
          <label>Flags</label>
          <div id={styles.flagsInput} ref={flagsRef}>
            <div>
              <label>-dw</label>
              <input type="checkbox" value="-dw" checked readOnly />
            </div>
            <div>
              <label>-dp</label>
              <input type="checkbox" value="-dp" checked readOnly />
            </div>
          </div>
          <label>Service</label>
          <input
            type="text"
            value={"PixarRender"}
            name="service"
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
          <button
            onClick={() => {
              downloadFile();
            }}
          >
            Download File
          </button>
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
