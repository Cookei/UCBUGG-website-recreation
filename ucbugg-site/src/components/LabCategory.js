import React from "react";
import styles from "../styles/Lab.module.css";

const LabCategory = (props) => {
  const { title, selectCallback, lineDirection } = props;
  if (title == undefined) return <div />;

  return (
    <div className={styles.categoryWrapper}>
      {lineDirection
        ? lineDirection.map((e) => {
            return <div className={styles[e]} />;
          })
        : null}
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
    </div>
  );
};

export default LabCategory;
