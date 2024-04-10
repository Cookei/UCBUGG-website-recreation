import React, { useEffect, useState } from "react";

import styles from "../styles/DaLab.module.css";
import { MarkdownNavbar } from "markdown-navbar";
import CustomMarkdownComponent from "./CustomMarkdownComponent";
import data from "../pages/labExport.js";

const LabMarkdown = (props) => {
  const { path } = props;
  const [markdown, setMarkdown] = useState();
  const [images, setImages] = useState();

  useEffect(() => {
    const splitPath = path.split("/");
    let obj = data;
    for (let i in splitPath) {
      let val = splitPath[i];
      if (i != splitPath.length - 1) {
        val = val.charAt(0).toUpperCase() + val.slice(1);
      }
      obj = obj[val];
    }

    fetch(obj.markdown[0])
      .then((res) => res.text())
      .then((text) => setMarkdown(text));

    setImages(obj.images);
  }, []);

  return (
    <section id={styles.daLab}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MarkdownNavbar source={markdown} ordered={false} />
        <CustomMarkdownComponent images={images} child={markdown} />
      </div>
    </section>
  );
};

export default LabMarkdown;
