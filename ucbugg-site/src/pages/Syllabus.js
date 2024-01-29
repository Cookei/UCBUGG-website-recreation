import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import MarkdownNavbar from "markdown-navbar";
import syllabusDocument from "../assets/Syllabus.md";
import styles from "../styles/Syllabus.module.css";

const Syllabus = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(syllabusDocument)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div>
      <section id={styles.syllabusSection}>
        <div id={styles.container}>
          <div>
            <MarkdownNavbar source={markdown} ordered={false} />
          </div>
          <div>
            <Markdown>{markdown}</Markdown>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Syllabus;
