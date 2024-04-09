import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";
import MarkdownNavbar from "markdown-navbar";
import syllabusDocument from "../assets/Syllabus/Syllabus.md";
import basicSchedule from "../assets/Syllabus/basicSchedule.md";
import advancedSchedule from "../assets/Syllabus/advancedSchedule.md";
import styles from "../styles/Syllabus.module.css";
import CustomMarkdownComponent from "../components/CustomMarkdownComponent";

const Syllabus = () => {
  const [markdown, setMarkdown] = useState("");
  const [basicScheduleMarkdown, setBasicScheduleMarkdown] = useState("");
  const [advancedScheduleMarkdown, setAdvancedScheduleMarkdown] = useState("");
  const [selectedSection, setSelectedSection] = useState("Basic");

  useEffect(() => {
    fetch(syllabusDocument)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));

    fetch(basicSchedule)
      .then((res) => res.text())
      .then((text) => setBasicScheduleMarkdown(text));

    fetch(advancedSchedule)
      .then((res) => res.text())
      .then((text) => setAdvancedScheduleMarkdown(text));
  }, []);

  return (
    <div>
      <section id={styles.syllabusSection}>
        <div id={styles.container}>
          <MarkdownNavbar source={markdown} ordered={false} />
          <div id={styles.content}>
            <CustomMarkdownComponent child={markdown} />
            <div id={styles.scheduleToggleButtonDiv}>
              <button
                onClick={() => {
                  setSelectedSection("Basic");
                }}
                className={
                  selectedSection == "Basic" ? `${styles.borderBottom}` : ""
                }
              >
                Basic Section
              </button>
              <button
                onClick={() => {
                  setSelectedSection("Advanced");
                }}
                className={
                  selectedSection == "Advanced" ? `${styles.borderBottom}` : ""
                }
              >
                Advanced Section
              </button>
            </div>
            <CustomMarkdownComponent
              child={
                selectedSection == "Basic"
                  ? basicScheduleMarkdown
                  : advancedScheduleMarkdown
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Syllabus;
