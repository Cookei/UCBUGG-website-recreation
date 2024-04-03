import React from "react";

import styles from "../styles/DaLab.module.css";
import { MarkdownNavbar } from "markdown-navbar";
import CustomMarkdownComponent from "./CustomMarkdownComponent";

const LabMarkdown = (props) => {
  const { e, markdownReferences } = props;
  return (
    <section id={styles.daLab}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div id={styles.navbar}>
          <MarkdownNavbar source={markdownReferences[e.key]} ordered={false} />
        </div>
        <div id={styles.content}>
          <CustomMarkdownComponent e={e} child={markdownReferences[e.key]} />
        </div>
      </div>
    </section>
  );
};

export default LabMarkdown;
