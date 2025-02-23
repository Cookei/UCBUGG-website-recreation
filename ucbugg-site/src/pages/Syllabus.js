import React, { useEffect, useState } from "react";
import MarkdownNavbar from "markdown-navbar";
import syllabusDocument from "../assets/Syllabus/Syllabus.md";
import basicSchedule from "../assets/Syllabus/basicSchedule.md";
import advancedSchedule from "../assets/Syllabus/advancedSchedule.md";
import styles from "../styles/Syllabus.module.css";
import CustomMarkdownComponent from "../components/CustomMarkdownComponent";
import markdownStyles from "../styles/Markdown.module.css";
import rebeccafox from "../assets/Syllabus/rebeccafox.png";
import BottomBanner from "../assets/homePageIcon/stupidbottombannerhillsblahugh.svg";

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
          <div id={styles.navbarContainer}>
            <MarkdownNavbar
              source={markdown}
              ordered={false}
              className={markdownStyles.unset}
            />
            <img
              src={rebeccafox}
              id={styles.rebeccafox}
              alt="Mel-chan 3d graphic"
            />
          </div>

          <div id={styles.content}>
            <CustomMarkdownComponent child={markdown} />
            <div
              id={styles.scheduleToggleButtonDiv}
              className={markdownStyles.markdown}
            >
              <button
                onClick={() => {
                  setSelectedSection("Basic");
                }}
                className={
                  selectedSection === "Basic" ? `${styles.borderBottom}` : ""
                }
              >
                Basic Section
              </button>
              <button
                onClick={() => {
                  setSelectedSection("Advanced");
                }}
                className={
                  selectedSection === "Advanced" ? `${styles.borderBottom}` : ""
                }
              >
                Advanced Section
              </button>
            </div>
            <CustomMarkdownComponent
              child={
                selectedSection === "Basic"
                  ? basicScheduleMarkdown
                  : advancedScheduleMarkdown
              }
            />
          </div>
        </div>
        <img
          src={BottomBanner}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
          alt="Cool graphic"
        />
      </section>
    </div>
  );
};

export default Syllabus;
