import React from "react";
import styles from "../styles/Lab.module.css";

const LabCategory = (props) => {
  const { title, selectCallback } = props;
  if (title == undefined) return <div />;
  return (
    <div
      className={styles.category}
      onClick={() => {
        if (selectCallback != undefined) {
          selectCallback(title);
        }
      }}
    >
      {title}
    </div>
  );
};

export default LabCategory;
