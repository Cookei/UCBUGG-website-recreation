import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";
import MarkdownNavbar from "markdown-navbar";
import syllabusDocument from "../assets/Syllabus/Syllabus.md";
import styles from "../styles/Syllabus.module.css";
import CustomMarkdownComponent from "../components/CustomMarkdownComponent";

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
          <div id={styles.navbar}>
            <MarkdownNavbar source={markdown} ordered={false} />
          </div>
          <div id={styles.content}>
            <CustomMarkdownComponent child={markdown} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Syllabus;
